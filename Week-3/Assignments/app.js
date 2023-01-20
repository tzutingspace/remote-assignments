const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// assignment 3: server a static HTML
// For Serving static files in Express
app.use('/', express.static('public'));

// assignment 4: 處理cookie: middleware for 解析 request cookie
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, My Server!');
});

// assignment 2: 建立GET method (/data) & 處理 query string
app.get('/data', (req, res) => {
  const numberString = req.query.number;
  const number = Number(numberString);
  console.log(number);
  if (!numberString) {
    res.send('Lack of Parameter');
  } else if (!Number.isInteger(number) || number <= 0) {
    res.send('Wrong Parameter');
  } else {
    const output = ((1 + number) * number) / 2;
    res.send(`Result: ${output}`);
  }
});

// assignment 4: HTTP Cookie
app.get('/myName', (req, res) => {
  const { name } = req.cookies;
  console.log(`myName route: ${name}`);
  if (name) {
    return res.send(`<h1>Hello, ${name}</h1>`);
  }
  const usertempHTML = `
  <form action="/trackName" method="get">
    <label>
        Please enter your name: 
    </label>
    <input type="text" name="name">
    <button type="submit">Submit</button>
  </form>`;
  return res.send(usertempHTML);
});

app.get('/trackName', (req, res) => {
  console.log(req);
  const { name } = req.query;
  console.log(`trackName route: ${name}`);
  res.cookie('name', name);
  return res.redirect('/myName');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
