/**
 * Created by Heshan on 11/8/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function addTag(req,callback){
    console.log("$$$$$$$  Add Tag $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = params.tag;

    daf.FindOne(query, CONSTANT.TAG_COLLECTION, function(err, data){
        if(!data){
            daf.Insert(query, CONSTANT.TAG_COLLECTION, function(err , dataList){
                callback(err ,dataList);
            });
        }else{
            callback('Already Exists Tag' ,null);
        }
    });

};

function getTagList(req,callback){
    console.log("$$$$$$$  GetTagList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {};

    var data = [];
    var dbCon = daf.Find(query,CONSTANT.TAG_COLLECTION);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function getAdminTagList(req,callback){
    console.log("$$$$$$$  GetTagList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {};

    var data = [];
    var dbCon = daf.Find(query,CONSTANT.TAG_COLLECTION);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function removeTag(req,callback){
    console.log("$$$$$$$  Remove Tag $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var tag = params.tag;
    var query = {key : tag.key, shopId : tag.shopId};
    daf.Remove(query,CONSTANT.TAG_COLLECTION,function(err , success){
        callback(err ,success);
    });

};


module.exports.AddTag = addTag;
module.exports.GetTagList = getTagList;
module.exports.GetAdminTagList = getAdminTagList;
module.exports.RemoveTag = removeTag;
