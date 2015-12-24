var express = require('express');
var router = express.Router();

router.get('/merge', function (req, res) {
	res.render('merge');
});

module.exports = router;