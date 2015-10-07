/*
// First, we require Express.js as dependency
var express = require('express');
var logger = require('morgan');

// a helper to resolve relative paths
var path = require('path');

// Then we initialize the application...
var app = express();
app.use(logger({ immediate: true, format: 'dev' }));

// We add a basic route that serves an index.html
// ... let's use the same as above
app.get('/', function(req, res) {
  var html = path.resolve(__dirname + '/../index.html');
  res.sendfile(html);
});

// Let's listen on port 5000
app.listen(5000);
console.log("Server is running.");
*/

var express = require('express'),
    path = require('path'),
    stitch  = require('stitch');
// To "stitch" the client-side modules together
// we create a package
var package = stitch.createPackage({
  paths: [__dirname + '/../app'],
  dependencies: [
    __dirname + '/../libs/jquery.js',
    __dirname + '/../libs/underscore.js',
    __dirname + '/../libs/backbone.js',
  ]
});
var app = express();
app.use(express.static(__dirname + '/public'));
// Whenever a request goes to the client, we deliver the modules as client.js
app.get('/static/bundle.js', package.createServer());
app.get('/', function(req, res) {
    console.log("--> /");
    var html = path.resolve(__dirname + '/../index.html');
    res.sendfile(html);
});
app.listen(5000);
console.log("Server is running.");

