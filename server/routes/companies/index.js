var fs = require('fs');
var stockInfo = require("../../api/finance/stockInfo");
var companies = JSON.parse(fs.readFileSync(__dirname+'/list.json'));
var lookup = require("../../api/finance/lookup");
var history = require("../../api/finance/stockHistory");

module.exports = function(router) {
   
router.route('/api/companies').get(function(req, res) {
	var symbols = [];
	for (var i=0; i<companies.length; i++) {
		symbols.push(companies[i].symbol);
	}

	stockInfo.forSymbols(symbols)
		.withFields(['name', 'exchange', 'changePercent', 'ask', 
			'bid', 'lastTradePrice', 'symbol'])
		.getStocks(function(data){
			res.json(data);
		} );
});

router.route('/api/companies/page/:page').get(function(req, res) {
	var page = req.params.page || 0;
	res.json(companies.slice((page-1)*10, (page-1)*10+10));
});

router.route('/api/companies/:symbol').get(function(req, res){
	stockInfo.forSymbols([req.params.symbol])
		.withFields(['name', 'exchange', 'changePercent', 'ask', 
			'bid', 'lastTradePrice','volume', 'lastTradeDate', 
			'daysLow', 'daysHigh', 'yearLow', 'yearHigh', 'yearTargetPrice'])
		.getStocks(function(data){
			res.json(data[0]);
		} );
});

router.route('/api/companies/lookup/:query').get(function(req, res){
	lookup(req.params.query, function(data){
		res.json(data);
	});
});

router.route('/api/companies/history/:symbol').get(function(req, res) {
	var startDate = new Date();
	startDate.setFullYear(startDate.getFullYear()-1);

	history.forSymbol(req.params.symbol)
		.from(startDate).to(new Date()).getHistory(function(data){
		res.json(data);
	})
});

};