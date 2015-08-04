#!/bin/env node
/**
 * Created by heshanr on 11/20/2014.
 */
var mongodb = require('mongodb');
var mdbc = this;
var EventEmitter = require('events').EventEmitter;


mdbc.dbServer = new mongodb.Server('127.0.0.1',parseInt('27017'));
mdbc.db = new mongodb.Db('trendi', mdbc.dbServer, {auto_reconnect: true});

mdbc.connectDb = function(){
    mdbc.db.open(function(err, db){
        if(err){ throw err };

    });
};
mdbc.connectDb();


function findOne(query,fromCollection,callback){
    mdbc.db.collection(fromCollection).find(query).toArray(function(err, found) {
        callback(err,found);
    });
}

function find(query,fromCollection,callback){

    var event = new EventEmitter();
    query = (query) ? query : {};
    var stream = mdbc.db.collection(fromCollection).find(query).stream();
    stream.on('data', function(doc){
        event.emit('data', doc);
    });
    stream.on('end', function () {
        event.emit('end');
    });
    return event;
}

function findWithPagination(query,fromCollection,condition){

    var event = new EventEmitter();
    query = (query) ? query : {};
    var stream = mdbc.db.collection(fromCollection).find(query,condition).stream();
    stream.on('data', function(doc){
        event.emit('data', doc);
    });
    stream.on('end', function () {
        event.emit('end');
    });
    return event;
}

function findWithSorting(query,fromCollection,condition){
    var event = new EventEmitter();
    query = (query) ? query : {};
    var stream = mdbc.db.collection(fromCollection).find(query,condition).stream();
    stream.on('data', function(doc){
       event.emit('data', doc);
    });
    stream.on('end', function () {
        event.emit('end');
    });
    return event;
}

function insert(doc, toCollection, callback){
    mdbc.db.collection(toCollection).insert(doc, function(err, success){
        if (err) { callback(err,success); }
        if(success) { callback(err,success); }
    });
}

function update(query, changeDoc, fromCollection, callback){
    mdbc.db.collection(fromCollection).update(query ,changeDoc, function(err, result){
        callback(err,result);
    });
}

function remove(query, fromCollection, callback){
    mdbc.db.collection(fromCollection).remove(query , function(err, remDoc){
        if (err) { throw err; }
        if(remDoc) { callback(remDoc); }
    });
}

function count(query, fromCollection, callback){
    mdbc.db.collection(fromCollection).count(query,function(err, docCount){
        if (err) {
            callback(err,docCount);
        }
        if(docCount) {
            callback(err,docCount);
        }
    });
}


function upsert(query, newDoc, fromCollection, callback){
    var options = {
        "upsert": true
    };

    mdbc.db.collection(fromCollection).update(query,newDoc,options,function(err, docCount){
        if (err) {
            callback(err,docCount);
        }
        if(docCount) {
            callback(err,docCount);
        }
    });
}

module.exports.FindOne = findOne;
module.exports.Find = find;
module.exports.FindWithPagination = findWithPagination;
module.exports.FindWithSorting = findWithSorting;
module.exports.Insert = insert;
module.exports.Update = update;
module.exports.Remove = remove;
module.exports.Count = count;
module.exports.Upsert = upsert;




