var  myConfig = require('./config');

module.exports = function(router) {
  
  router.route('/').get(function(req, res) {
    res.render('index', {
      config : myConfig
    });
  });

};