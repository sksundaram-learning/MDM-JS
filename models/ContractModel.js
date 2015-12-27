var mongoose = require('mongoose');
var urlDatabase = 'mongodb://michwii:Elyeshm1806@ds027335.mongolab.com:27335/prince';

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase);
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ContractModel = new Schema({
    id    													: ObjectId,
    auto_contract_id  							: Number,
    habitation_contract_id  				: Number,
		death_insurrance_contract				: Number,
		health_protection_contract			: Number,
    address     										: String,
    zip_code      									: String,
		details													: String,
		__v															: {type: Number, default:0}
});

module.exports = mongoose.model('ContractModel', ContractModel);
