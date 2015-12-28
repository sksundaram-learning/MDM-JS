var mongoose = require('mongoose');
var urlDatabase = 'mongodb://michwii:Elyeshm1806@ds027335.mongolab.com:27335/prince';

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase);
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Test = new Schema({
    id    													: ObjectId,
    a                               : String,
    b                               : String,
},  {strict: true});

if (!Test.options.toObject) Test.options.toObject = {};
Test.options.toObject.transform = function (doc, ret, options) {
  Object.keys(ret).forEach(function (element, index) {
    if(doc.schema.paths[element] == undefined){
      delete ret[element];
    }
  });
}


module.exports = mongoose.model('Test', Test);
