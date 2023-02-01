const express = require('express');
const database = require('./database');

const app = express();

// middleware for 解析 request form (body-parser)
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const username = 1;
  const error = 2;
  res.render('homepage', { username });
});

app.post('/signUp', async (req, res) => {
  console.log('@signup的req', req.body);
  const { email, password } = req.body;
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
    return res.render('member', { email: createResult.email });
  }
  return res.render('homepage', {
    error: 'Missing email or password.',
  });
});

app.post('/signIn', async (req, res) => {
  console.log('@signIn的req', req.body);
  const { email, password } = req.body;
  // 檢查是登入email與password是否匹對
  const loginResult = await database.checkLogin(email, password);
  if (loginResult) {
    return res.render('member', { email });
  }
  const user = await database.getUser(email, password);
  if (user) {
    return res.render('homepage', { error: 'Password is not correct!' });
  }
  return res.render('homepage', { error: 'email is not registered.' });
});

app.listen(3000, () => {
  console.log('Server running...');
});
