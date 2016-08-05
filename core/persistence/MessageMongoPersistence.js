#!/bin/env node
/**
 * Created by heshanr on 11/20/2014.




use message
db.createUser(
  {
    user: "admin",
    pwd: "19891222",
    roles: [ { role: "readWrite", db: "message" }]
  }
)  

then run 


mongod.exe --auth
 */
var mongodb = require('mongodb');
var mdbc = this;
var EventEmitter = require('events').EventEmitter;


mdbc.dbServer = new mongodb.Server('127.0.0.1',parseInt('27017'));
mdbc.dbm = new mongodb.Db('message', mdbc.dbServer, {auto_reconnect: true});


mdbc.connectDbm = function(){
    mdbc.dbm.open(function(err, dbm){
        if(err){ throw err };
        mdbc.dbm.authenticate('admin', '19891222', function(err, result) {
          if(err){ throw err };
        });
    });
};
mdbc.connectDbm();




function mFindWithPagination(query,fromCollection,condition){

    var event = new EventEmitter();
    query = (query) ? query : {};
    var stream = mdbc.dbm.collection(fromCollection).find(query,condition).stream();
    stream.on('data', function(doc){
        event.emit('data', doc);
    });
    stream.on('end', function () {
        event.emit('end');
    });
    return event;
}


function mInsert(doc, toCollection, callback){
    mdbc.dbm.collection(toCollection).insert(doc, function(err, success){
        if (err) { callback(err,success); }
        if(success) { callback(err,success); }
    });
}


function mUpdate(query, changeDoc, fromCollection, callback){
    mdbc.dbm.collection(fromCollection).update(query ,changeDoc, function(err, result){
        callback(err,result);
    });
}


function mRemove(query, fromCollection, callback){
    mdbc.dbm.collection(fromCollection).remove(query , function(err, remDoc){
        callback(err,remDoc);
    });
}


function mCount(query, fromCollection, callback){
    mdbc.dbm.collection(fromCollection).count(query,function(err, docCount){
        callback(err,docCount);
    });
}


module.exports.MFindWithPagination = mFindWithPagination;
module.exports.MInsert = mInsert;
module.exports.MUpdate = mUpdate;
module.exports.MRemove = mRemove;
module.exports.MCount = mCount;


