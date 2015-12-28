var CustomerModel = require("./../models/CustomerModel");

exports.get = function(id, callback){
	CustomerModel.findOne({benificiary_id : id, __disabled : {$ne : true}}, callback);
};

exports.getAllContracts = function(id, callback){
	exports.get(id, function(err, data){
		if(err || data == null){
			callback(err, null);
		}else{
			callback(err, data.contracts);
		}
	});
};

exports.getAll = function(offset, limit, callback){
	CustomerModel.find({__disabled : {$ne : true}}).limit(limit).skip(offset).exec(callback);
};

exports.update = function(id, newValues, callback){
	exports.get(id, function(err, data){

		if(err || data == null){
			callback(err, null);
		}else{
			var dataCopy = {};
			//We copy everything except the _id
			Object.keys(data._doc).forEach(function (element, index) {
				if(element != '_id'){
					dataCopy[element] = data[element];
				}
			});
			dataCopy.__disabled = true;

			var backupVersion = new CustomerModel(dataCopy);
			backupVersion.save(function(err, savedBackup){
				savedBackup.__v = dataCopy.__v;//By default the __v equals to 0 because we just created it. this is why we have to do 2 saves
				savedBackup.save();
			});

			Object.keys(newValues).forEach(function (element, index) {
				data[element] = newValues[element];
			});

			data.__v++;
			data.save(callback);
		}
	});
};

exports.getHistory = function(id, callback){
	CustomerModel.find({benificiary_id : id}, callback);
};

exports.rollback = function(id, versionNumber, callback){
	CustomerModel.findOne({benificiary_id : id, __v : versionNumber}, function(err, data){
		if(err || data == null){
			callback(err, data);
		}else{

			var newValues = {};

			Object.keys(data._doc).forEach(function (element, index) {
				newValues[element] = data[element];
			});

			delete newValues._id;
			delete newValues.__v;
			delete newValues.__disabled;

			exports.update(id, newValues, callback);
		}
	});
};

exports.create = function(values, callback){
	var instanceToSave = new CustomerModel(values);
	instanceToSave.save(callback);
}

exports.delete = function(id, callback){
	CustomerModel.remove({benificiary_id : id}, callback);
};
