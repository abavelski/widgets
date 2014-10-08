var express = require('express'),
http = require('http'),
config = require('./config'),
fs = require('fs'),
companies = require('./companies'),
app = express();



app.set('views', __dirname + '/views')
app.set('view engine', 'jade');
app.use(express.logger())
.use(express.static(config.server.staticFolder))
.use(express.cookieParser())
.use(express.bodyParser());

var server = http.createServer(app);
server.listen(8000);
console.log('Express server started.');

var myConfig = JSON.parse(fs.readFileSync('./config.json'));

app.get('/', function(req, res) {
  res.render('index', {
    config : myConfig
  });
});

var stockholmCompanies = JSON.parse(fs.readFileSync('./companies/stockholm.json'));
companies(app, stockholmCompanies);

