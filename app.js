/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var http = require('http');
var express = require('express');
var config = require('./config');
var routes = require('./routes');
var _ = require('lodash');
var ui = require('./ui');
var viewsWares = require('./middlewares/views');
// application
var app = express();
// set template's path
app.set('views', path.join(__dirname, 'views/templates'));
// customer middleware
app.use(express.favicon());
//app.use(express.logger());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
// rewrite res.render
app.use(viewsWares.render);
app.use(app.router);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/images', express.static(path.join(__dirname, 'images')));
routes( app );
// template engine
var velocityjs = require('./widgets/velocity/api');
app.engine( config.template.extension, config.template.callback(velocityjs) );
// set port
app.set('port', process.env.PORT || 3000);
var port = process.argv[2];
port = /^\d{4,5}$/.test(port) ? port : app.get('port');
http.createServer(app).listen(port, function() {
    console.log('Server listening on port ' + port);
}).on('error', function(err) {
    console.log('Error', err.code);
});

module.exports = app;
