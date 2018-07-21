

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob');
var favicon = require('serve-favicon');
var path = require('path');
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser');
  app.use(xmlparser());
  /*
  var mongoDB = mongoose.connect(config.db, {
    useMongoClient: true
  });
  */
  const connStr = (process.env.NODE_ENV == 'production')?
  'mongodb://db1:antusdk2@ds033196.mlab.com:33196/woosung':
  'mongodb://localhost/geolocation';
  //const connStr = 'mongodb://localhost/mjdb4';
  // 아래는 mLab을 사용하는 경우의 예: 본인의 접속 String으로 바꾸세요.
  // const connStr = 'mongodb://dbuser1:mju12345@ds113825.mlab.com:13825/sampledb1';
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cookieParser());
/*
  mongoDB
    .then(function (db) {
      console.log('mongodb has been connected');
    })
    .catch(function (err) {
      console.log('error while trying to connect with mongodb');
    });
*/
/*
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
*/
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

module.exports = require('./config/express')(app, config);
