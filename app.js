const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const db = require('./db');

let activityModel=db.models.activity
let hotelModel=db.models.hotel
let restaurantModel=db.models.restaurant

////dfsadfsa

const app = express();

app.use(volleyball);
app.use(bodyParser.json());

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

app.use('/bootstrap',express.static('node_modules/bootstrap/dist'));
app.use('/jquery',express.static('node_modules/jquery/dist'));
app.use(express.static('public'))

app.get('/', (req, res) => {

  let promiseActivity= activityModel.findAll()
  let promiseHotel= hotelModel.findAll()
  let promiseRestaurant= restaurantModel.findAll()

  Promise.all([promiseActivity, promiseHotel, promiseRestaurant])
  .then((data)=>{
    let activityList= data[0]
    let hotelList= data[1]
    let restaurantList= data[2]

  res.render('index', { hotels: hotelList, activities: activityList, restaurants: restaurantList});

  })

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
