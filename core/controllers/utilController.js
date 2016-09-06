/**
 * Created by Heshanr on 8/11/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var _ = require('lodash');


function updateCount(type, callback){
    var query ={};
    var changeArray={};
    changeArray[type] = 1;
    var changeDoc = {'$inc':changeArray};
    daf.Update(query, changeDoc, CONSTANT.DOC_COUNT, function (err, update) {
        if(update){
            daf.FindOne(query, CONSTANT.DOC_COUNT, function (err, doc) {
                if (doc) {
                    callback(err, doc[type]);
                } else {
                    callback(err, doc);
                }
            });
        }else{
            callback(err, update);
        }
    });
}

function getSizes(req,callback){
    console.log("$$$$$$$  AddSize $$$$$$");
    var query = {};
    var data = [];
    var dbCon = daf.Find(query,CONSTANT.SIZE_COLLECTION);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
}; 


function changeSizes(req,callback){
    console.log("$$$$$$$  AddSize $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {};
    var changeDoc = {'sizes':params.sizes};    
    daf.Update(query, changeDoc, CONSTANT.SIZE_COLLECTION, function (err, update) {
        callback(err, update);
    });
}; 



module.exports.UpdateCount = updateCount;
module.exports.ChangeSizes = changeSizes;
module.exports.GetSizes = getSizes;
