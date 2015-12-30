var express = require('express');
var customerRoutes = require("./routes/customerRoutes");
var benificiaryRoutes = require("./routes/benificiaryRoutes");
var carSubscriberRoutes = require("./routes/carSubscriberRoutes");
var habitationSubscriberRoutes = require("./routes/habitationSubscriberRoutes");
var tasksBucketRoutes = require("./routes/tasksBucketRoutes");
var toolRoutes = require("./routes/toolRoutes");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.set('view engine', 'ejs');

app.use("/customers", customerRoutes);
app.use("/benificiaries", benificiaryRoutes);
app.use("/car_subscribers", carSubscriberRoutes);
app.use("/habitation_subscribers", habitationSubscriberRoutes);
app.use("/tools/tasksBucket", tasksBucketRoutes);
app.use("/tools", toolRoutes);


app.post('/test', function(req, res){
  console.log(req.body.x);//Should only trace one value but instead execute maliscious code.
  console.log(req.body);
  res.json("ok");
});

var server = app.listen(80);
