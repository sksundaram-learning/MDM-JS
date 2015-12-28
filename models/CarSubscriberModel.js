var mongoose = require('mongoose');
var ContractModel = require('./ContractModel');

var urlDatabase = 'mongodb://michwii:Elyeshm1806@ds027335.mongolab.com:27335/prince';

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase);
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CarSubscriberModel = new Schema({
    id    											: ObjectId,
    car_subscriber_id  					: Number,
    name     										: String,
    surname      								: String,
    telephone      							: String,
		address 										: String,
		zip_code 										: String,
		email 											: String,
		gender											: String,
		contracts										: [ContractModel.schema],
		__v													: {type: Number, default:0},
		__disabled									: {type: Boolean, default: false}
}, {strict: true});

/*below we define a custom behaviour.
We want that each time a physical document is retrived from MongoDB we delete the properties from the instance returned to the client
*/
var filter = function (doc, ret, options) {
  Object.keys(ret).forEach(function (element, index) {
    if(doc.schema.paths[element] == undefined){
      delete ret[element];
    }
  });
}
if (!CarSubscriberModel.options.toObject){
	CarSubscriberModel.options.toObject = {};
}
if (!CarSubscriberModel.options.toJSON){
	CarSubscriberModel.options.toJSON = {};
}
CarSubscriberModel.options.toObject.transform = filter;
CarSubscriberModel.options.toJSON.transform = filter;

module.exports = mongoose.model('CarSubscriberModel', CarSubscriberModel, 'customermodels');
