var jwt = require('jsonwebtoken'),
  config = require('../../config'),
  errors = require('../../errors'),
  User = require('../../db/models/user');

module.exports = function(router) {

//login
router.route('/api/login').post(function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json(401, {error: errors.loginFailed });
    return;
  }

  User.findOne({'login': req.body.username}).exec().then(function(user){
      if (user && user.password === req.body.password) {
        var token = jwt.sign(user, config.secret, { expiresInMinutes: 60*5 });
        res.json({ token: token, user: {login : user.login} });
      } else {
        res.json(401,{error: errors.loginFailed });
      }      
  },  function(err) {
      res.json(401,{error: errors.loginFailed });
  });
});

//register new user
router.route('/api/register').post(function(req, res){
  console.log(req.body);
  var user = new User({
    login : req.body.email,
    password : req.body.password
  });
  user.save(function(err){
    if (err) {
      res.json(500, {error: errors.saveUserFailed});
    } else {      
      var newUser = { login: req.body.email, password: req.body.password };
      var token = jwt.sign(newUser, config.secret, { expiresInMinutes: 60*5 });
      res.json({ token: token, user: newUser });
    }
  });

});


router.route('/auth/bla').get( function (req, res) {
  console.log('user ' + req.user.login + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

};