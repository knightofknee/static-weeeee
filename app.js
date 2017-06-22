const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const db = require('./db');

const app = express();

app.use(volleyball);
app.use(bodyParser.json());

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { message: 'hello!' });
});

app.use((err, req, res, next) => {
  res.render('error', { err });
});

db.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('listening on 3000!');
    });
  });
