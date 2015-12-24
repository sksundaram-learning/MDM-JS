var express = require('express');
var benificiaryRoutes = require("./routes/benificiaryRoutes");
var toolRoutes = require("./routes/toolRoutes");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.set('view engine', 'ejs');  

app.use("/benificiaries", benificiaryRoutes);
app.use("/tools", toolRoutes);

var server = app.listen(80);