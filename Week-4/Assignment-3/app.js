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

app.post('/signUp', async (req, res) => {
  console.log('@signup的req: ', req.body);
  const { email, password } = req.body;
  // 先檢查email ＆ password 是否有輸入
  if (email && password) {
    // 先檢查是否存在相同email
    const result = await database.getUser(email, password);
    if (result) {
      return res.render('homepage', {
        error: 'This email was be registered.',
      });
    }
    // 沒有相同email, createUser
    const createResult = await database.createUser(email, password);
    res.cookie('email', email);
    return res.redirect('member');
  }
  return res.render('homepage', {
    error: 'Missing email or password.',
  });
});

app.post('/signIn', async (req, res) => {
  console.log('@signIn的req: ', req.body);
  const { email, password } = req.body;
  // 檢查是登入email與password是否匹對
  const loginResult = await database.checkLogin(email, password);
  if (loginResult) {
    console.log('確認有該用戶資料且密碼正確');
    // 提供cookie給client for 進入 memeber route
    res.cookie('email', email);
    return res.redirect('/member');
    // return res.render('member', { email });
  }
  const user = await database.getUser(email, password);
  if (user) {
    console.log('確認有該用戶資料但密碼錯誤');
    return res.render('homepage', { error: 'This Password is not correct!' });
  }
  console.log('無該用戶資料');
  return res.render('homepage', { error: 'This email is not registered.' });
});

// Route End//

app.listen(port, () => {
  console.log(`The application is running on port ${port}`);
});
