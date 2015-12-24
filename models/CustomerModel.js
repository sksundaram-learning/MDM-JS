var mongoose = require('mongoose');

var urlDatabase = 'mongodb://michwii:Elyeshm1806@ds027335.mongolab.com:27335/prince';

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase);
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CustomerModel = new Schema({
    id    						: ObjectId,
    benificiary_id  			: String,
    policy_aggrement_holder_id  : String,
    subscriber_id  				: String,
    name     					: String,
    surname      				: String,
    telephone      				: String,
	address 					: String,
	__disabled					: {type: Boolean, default: false}
	
});

module.exports = mongoose.model('CustomerModel', CustomerModel);