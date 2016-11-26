#!/bin/env node

var express = require('express');
var route  = require('./core/route/routes.js');
var itemCtrl  = require('./core/controllers/itemController.js');
var App = function(){
    var self = this;


    self.ipaddr  = '0.0.0.0';
    self.port    = 3001;



    self.app  = express();

    //This uses the Connect frameworks body parser to parse the body of the post request
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    self.app.set('views', (__dirname + '/public'));
    self.app.set('view engine', 'ejs');
    self.app.use(bodyParser({limit:'50mb'}));
    self.app.use(bodyParser.urlencoded());
    self.app.use(bodyParser.json());
    self.app.use(methodOverride('_method'))
    self.app.use(express.static(__dirname + '/public'));
    var server = require('http').createServer(self.app);
    var io = require('socket.io').listen(server);
    itemCtrl.Invoke(io);
    //starting the nodejs server with express
    self.startServer = function(){
        server.listen(self.port, self.ipaddr, function(){
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddr, self.port);
        });
    };

    // Destructors
    self.terminator = function(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating Node server ...', Date(Date.now()), sig);
            process.exit(1);
        };
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

    process.on('exit', function() { self.terminator(); });

    self.terminatorSetup = function(element, index, array) {
        process.on(element, function() { self.terminator(element); });
    };
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'].forEach(self.terminatorSetup);
    route(self.app);
};
var app = new App();
app.startServer();
