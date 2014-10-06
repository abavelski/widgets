var express = require('express'),
    http = require('http'),
    mongoClient = require('mongodb').MongoClient,
    config = require('./config'),
    users = require('./users'),
    passport = require('passport'),
    app = express();
var security = require('./security/security');


mongoClient.connect(process.env.MONGOLAB_URI || config.mongo.dbUrl, function(err, db) {
    if(err) {
        throw err;
    }
    app.set('views', __dirname + '/views')
    app.set('view engine', 'jade');
    app.use(express.logger())
       .use(express.static(config.server.staticFolder))
       .use(express.cookieParser())
       .use(express.bodyParser())
       .use(express.session({ secret: 'secret' }))
       .use(passport.initialize())
       .use(passport.session());

    security.initialize(db);


    var server = http.createServer(app);
    server.listen(process.env.PORT || 8080);
    console.log('Express server started.');

    var context = {
                   app : app,
                   db: db,
                   security: security,
                   config : config
    };

    var myConfig = {
      views: [
      {
        path : '/view1/:id', 
        type : 'twelveSixSix', 
        widgets : {
          north : ['dashboard'],
          east : ['widget1', 'widget2'],
          west : ['panel']
        }
      },{
        path : '/view1', 
        type : 'twelveSixSix', 
        widgets : {
          north : ['dashboard'],
          east : ['widget1', 'widget2'],
          west : ['panel']
        }
      },
      {
        path : '/view2', 
        type : 'twelveZeroZero', 
        widgets : {
          north : ['dashboard', 'panel']          
        }
      },
      {
        path : '/view3', 
        type : 'zeroSixSix', 
        widgets : {
          east : ['widget1', 'widget2'],
          west : ['panel']
        }
      },
      {
        path : '/view4', 
        type : 'twelveZeroZero', 
        widgets : {
          north : ['dashboard', 'widget1']
        }
      },

      ]
    };



    app.get('/', function(req, res){
      res.render('index', {
        config : myConfig
      });
    });
    users(context);
});