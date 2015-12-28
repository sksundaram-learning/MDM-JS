var express = require('express');
var router = express.Router();
var tasksBucketServices = require("./../services/tasksBucketServices");

router.get('/', function (req, res) {
	tasksBucketServices.getAll(function(err, values){
		res.json(values);
	});
});

router.get('/:id', function (req, res) {
	tasksBucketServices.get(req.params.id, function(err, value){
		if(value == null){
			res.status(404).json(value);
		}else{
			res.json(value);
		}
	});
});

router.post('/', function(req, res){
	tasksBucketServices.create(req.body, function(err, data){
		res.json(data);
	});
});

router.put('/:id', function(req, res){
	tasksBucketServices.update(req.params.id, req.body, function(err, data){
		if(err){
			res.status(501).json(err);
		}else if(data == null){
			res.status(404).json(data);
		}else{
			res.json(data);
		}
	});
});

router.delete('/:id', function(req, res){
	tasksBucketServices.delete(req.params.id, function(err, data){
		if(data.result.n == 0){
			res.status(404).json(data);
		}else{
			res.json(data);
		}
	})
});

module.exports = router;
