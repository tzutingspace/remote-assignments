const express = require('express');
const cookieParser = require('cookie-parser');
const database = require('./database');

// call express function to create an Express application
const app = express();
const port = 3000;

// middleware for 解析 request form (body-parser)
app.use(express.urlencoded({ extended: false }));

// middleware for 解析 request cookie // load the cookie-parsing middleware
app.use(cookieParser());

// Set the view engine; tells Express which template engine to use.
// By defualt, Express will look in a folder called "views" in the root of your projects.
app.set('view engine', 'pug');

// Function //

// 處理錯誤(create error)
// 登入error status 參考：https://stackoverflow.com/questions/32752578/whats-the-appropriate-http-status-code-to-return-if-a-user-tries-logging-in-wit
function errorHandler(errMessage, errStatus) {
  const errorObject = new Error(errMessage);
  errorObject.status = errStatus;
  return errorObject;
}

// ASYNC/AWAIT with asyncHandler function (重複使用的錯誤檢測方式)
// 處理如果連線到database出錯的狀況
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next); // 因為是處理router 的事件， 所以需要包含normal route handling parameter
    } catch (err) {
      console.log(err); // 在server log 顯示的async/ await錯誤
      const errfeeedback = errorHandler('資料庫連線Error', 500); // 傳到 app 的 error 來處理
      next(errfeeedback);
    }
  };
}

// 驗證Email
function ValidateEmail(inputText) {
  // console.log(inputText);
  // reference: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
  // reference: https://www.geeksforgeeks.org/form-validation-using-html-javascript/
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  if (mailformat.test(inputText)) {
    return true;
  }
  return false;
}

// Function End //

// Route //
app.get('/', (req, res) => {
  // res.clearCookie('email'); // 測試用
  const { email } = req.cookies;
  if (email) {
    return res.redirect('/member');
  }
  return res.render('homepage');
});

app.get('/member', (req, res) => {
  const { email } = req.cookies;
  if (!email) {
    return res.redirect('/');
  }
  return res.render('member', { email });
});

app.post('/signUp', asyncHandler(async (req, res, next) => {
    console.log('@signup的req: ', req.body);
    const { email, password } = req.body;
    // 先檢查email ＆ password 是否有輸入
    if (email && password && ValidateEmail(email)) {
      // 先檢查是否存在相同email
      const result = await database.getUser(email, password);
      if (result) {
        const err = errorHandler('This email was be registered.', 401);
        return next(err);
        // return res.render('homepage', {
        //   error: 'This email was be registered.',
        // });
      }
      // 沒有相同email, createUser
      const createResult = await database.createUser(email, password);
      res.cookie('email', email);
      return res.redirect('member');
    }
    const err = errorHandler('Invalid email or password.', 401);
    return next(err);
    // return res.render('homepage', {
    //   error: 'Invalid email or password.',
    // });
  })
);

app.post('/signIn', asyncHandler(async (req, res, next) => {
    console.log('@signIn的req: ', req.body);
    const { email, password } = req.body;
    if (email && password && ValidateEmail(email)) {
      // 檢查是登入email與password是否匹對
      const loginResult = await database.checkLogin(email, password);
      if (loginResult) {
        console.log('確認有該用戶資料且密碼正確');
        // 提供cookie給client for 進入 memeber route
        res.cookie('email', email);
        return res.redirect('/member');
      }
      const user = await database.getUser(email, password);
      if (user) {
        console.log('確認有該用戶資料但密碼錯誤');
        const err = errorHandler('This Password is not correct!', 401);
        return next(err);
        // return res.render('homepage', { error: 'This Password is not correct!' });
      }
      console.log('無該用戶資料');
      const err = errorHandler('This email is not registered.', 401);
      return next(err);
      // return res.render('homepage', { error: 'This email is not registered.'});
    }
    const err = errorHandler('Invalid email', 401);
    return next(err);
  })
);

// 處理ERROR (Add an Error habdler)
// We can overwrite that behavior by putting it in our own error handler. > Send a Error Templete.
app.use((err, req, res, next) => {
  res.locals.error = err;
  // response ERROR status
  res.status(err.status);
  res.render('homepage', { error: err });
});

// Route End//

app.listen(port, () => {
  console.log(`The application is running on port ${port}`);
});
