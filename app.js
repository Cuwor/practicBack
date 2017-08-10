var express = require('express');
var app = express();

app.set('view engine', 'ejs')
app.get('/', function(res, res) {
  res.send('Hello, SibDev');
})
app.listen(3000, function() {
  console.log('Example 3000 port');
})

app.get('/register', function (req, res) {
  res.send('register');
});

app.post('/register', function (req, res) {
  res.send('register');
});

app.post('/auth', function (req, res) {
  res.send('authentific');
});
app.get('/auth', function (req, res) {
  res.send('authentific');
});

app.get('/page/:page', function (req, res) {
  res.send('All articles');
});

app.get('/post/:id', function (req, res) {
  res.send('post');
});

app.get('/post/new', function (req, res) {
  res.send('new article');
});

app.get('/post/:id/edit', function (req, res) {
  res.send('edit article');
});

app.put('/post/:id', function (req, res) {
  res.send('post');
});

app.post('/post/new', function (req, res) {
  res.send('new article');
});

app.get('/author/:id', function (req, res) {
  res.send(' author');
});
