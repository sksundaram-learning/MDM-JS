var express = require('express');
var benificiaryRoutes = require("./routes/benificiaryRoutes");
var carSubscriberRoutes = require("./routes/carSubscriberRoutes");
var Test = require("./models/test");
var toolRoutes = require("./routes/toolRoutes");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.set('view engine', 'ejs');

app.use("/benificiaries", benificiaryRoutes);
app.use("/car_subscribers", carSubscriberRoutes);
app.use("/tools", toolRoutes);


app.get('/test', function(req, res){
  Test.findOne({a:"AAAAAA"}, function(err, data){
    console.log(data);
    res.json(data.toObject({strict : true}));
  });
});

var server = app.listen(80);
