var errors = require('../errors'),
User = require('../db/models/user'),
stockInfo = require('../api/finance/stockInfo');

module.exports = function(router) {

	router.route('/auth/custodies/:id').get(function(req, res){
		User.findById(req.user.id).exec().then(function(user){
			var custody = user.getCustodyAccountById(req.params.id);
			res.json(custody.holdings);
		}, function(err){
			res.send(500).end();
		});
	});

}