/**
 * Created by Drew on 12/17/2014.
 */

var fs = require('fs'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    debug = require('debug')('DevMag'),
    React = require('react'),
    Plates = require('plates');

var app = express();

//For requiring `.jsx` files as Node modules
require('node-jsx').install({extension: '.jsx'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var App = require('./react/App.jsx');

// Render React on Server for all urls
app.get('/*',function(req,res){
    var html = React.renderToString(React.createElement(App, {history: true}));
    renderHtml(res, html, "");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*
* Setup the app and listen
*/
app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

/*
* Handles injects the application before serving base html
*/
function renderHtml(res, appHtml, appData) {
    fs.readFile(
        path.join(__dirname, 'public', 'base.html'),
        { encoding: 'utf-8'},
        function(err, tmpl) {
            var html = Plates.bind(tmpl, {
                "App": appHtml  //, appData: 'APP_DATA = ' + JSON.stringify(appData)
            });

            res.set('Content-Type', 'text/html');
            res.send(html);
        }
    );
}