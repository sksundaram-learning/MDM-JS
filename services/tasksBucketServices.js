var TasksBucketModel = require("./../models/TasksBucketModel");

exports.get = function(id, callback){
	TasksBucketModel.findOne({_id : id}, callback);
};

exports.getAll = function(callback){
	TasksBucketModel.find({__disabled : {$ne : true}},callback);
};

exports.create = function(values, callback){
	var instanceToSave = new TasksBucketModel(values);
	instanceToSave.save(callback);
}

exports.delete = function(id, callback){
	TasksBucketModel.remove({_id : id}, callback);
};
