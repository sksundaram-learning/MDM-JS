var mongoose = require('mongoose');

var urlDatabase = 'mongodb://michwii:Elyeshm1806@ds027335.mongolab.com:27335/prince';

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase);
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TasksBucketModel = new Schema({
    id    											: ObjectId,
    habitation_subscribers_id  	: [Number],
		car_subscribers_id  				: [Number],
		benificiary_id  						: [Number]
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
if (!TasksBucketModel.options.toObject){
	TasksBucketModel.options.toObject = {};
}
if (!TasksBucketModel.options.toJSON){
	TasksBucketModel.options.toJSON = {};
}
TasksBucketModel.options.toObject.transform = filter;
TasksBucketModel.options.toJSON.transform = filter;

module.exports = mongoose.model('TasksBucketModel', TasksBucketModel);
