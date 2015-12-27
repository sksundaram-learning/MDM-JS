var mongoose = require('mongoose');
var ContractModel = require('./ContractModel');

var urlDatabase = 'mongodb://michwii:Elyeshm1806@ds027335.mongolab.com:27335/prince';

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase);
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CustomerModel = new Schema({
    id    											: ObjectId,
    benificiary_id  						: Number,
    policy_aggrement_holder_id  : String,
    subscriber_id  							: String,
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
});

module.exports = mongoose.model('CustomerModel', CustomerModel);
