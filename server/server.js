var express = require('express'),
http = require('http'),
config = require('./config'),
fs = require('fs'),
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

var data = fs.readFileSync('./config.json');
var myConfig = JSON.parse(data);

app.get('/', function(req, res) {
  res.render('index', {
    config : myConfig
  });
});

