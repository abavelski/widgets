
module.exports = function(app, companies) {
   

app.get('/api/companies', function(req, res) {
    res.json(companies);
});

app.get('/api/companies/page/:page', function(req, res) {
	var page = req.params.page || 0;
	res.json(companies.slice((page-1)*10, (page-1)*10+10));
});


};