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
.use(express.bodyParser())
.use(express.session({ secret: 'secret' }));

var server = http.createServer(app);
server.listen(8080);
console.log('Express server started at port 8080.');

var data = fs.readFileSync('./config.json');
var myConfig = JSON.parse(data);

app.get('/', function(req, res){
  res.render('index', {
    config : myConfig
  });
});

