var fs = require('fs');
var stockInfo = require("../../api/finance/stockInfo");
var companies = JSON.parse(fs.readFileSync(__dirname+'/list.json'));
var lookup = require("../../api/finance/lookup");
var history = require("../../api/finance/stockHistory");

module.exports = function(app) {
   
app.get('/api/companies', function(req, res) {
    res.json(companies);
});

app.get('/api/companies/page/:page', function(req, res) {
	var page = req.params.page || 0;
	res.json(companies.slice((page-1)*10, (page-1)*10+10));
});

app.get('/api/companies/:symbol', function(req, res){
	stockInfo.forSymbols([req.params.symbol])
		.withFields(['name', 'exchange', 'marketCap', 'ask', 
			'bid', 'lastTradePrice','volume', 'lastTradeDate', 
			'daysLow', 'daysHigh', 'yearLow', 'yearHigh', 'yearTargetPrice'])
		.getStocks(function(data){
			res.json(data[0]);
		} );
});

app.get('/api/companies/lookup/:query', function(req, res){
	lookup(req.params.query, function(data){
		res.json(data);
	});
});

app.get('/api/companies/history/:symbol', function(req, res) {
	var startDate = new Date();
	startDate.setFullYear(startDate.getFullYear()-1);

	history.forSymbol(req.params.symbol)
		.from(startDate).to(new Date()).getHistory(function(data){
		res.json(data);
	})
});

};