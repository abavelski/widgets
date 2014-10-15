var express = require('express'),
http = require('http'),
config = require('./config'),
fs = require('fs'),
companies = require('./routes/companies'),
users = require('./routes/users'),
app = express(),
expressJwt = require('express-jwt');



app.set('views', __dirname + '/views')
app.set('view engine', 'jade');
app.use(express.logger())
.use(express.static(config.server.staticFolder))
.use(express.cookieParser())
.use(express.bodyParser())
.use('/auth', expressJwt({secret: 'blablabla'}))
.use(express.json())
.use(express.urlencoded());

var server = http.createServer(app);
server.listen(process.env.PORT || 8000);
console.log('Express server started.');

var myConfig = JSON.parse(fs.readFileSync('./config.json'));

app.get('/', function(req, res) {
  res.render('index', {
    config : myConfig
  });
});

users(app);
companies(app);



