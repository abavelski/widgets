var jwt = require('jsonwebtoken');

module.exports = function(app) {


app.post('/api/login', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'bla' && req.body.password === 'bla')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var user = {
    name: 'Bla',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(user, 'blablabla', { expiresInMinutes: 60*5 });
  console.log('token requested');
  res.json({ token: token });
});


app.get('/auth/bla', function (req, res) {
  console.log('user ' + req.user.name + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

};