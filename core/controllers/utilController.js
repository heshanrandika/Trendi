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

function addPost(post,callback){
    daf.Insert(post, CONSTANT.WALL_POST_COLLECTION, function (err, success) {
        console.log("^^^^^^^  Add Post ^^^^^^^ : ");
        callback(err, success);
    })
}

function removePost(post,callback){
    var query = {collection:post.collection, objectId:post.objectId};
    daf.Remove(query,CONSTANT.WALL_POST_COLLECTION,function(err,success){
        console.log("$$$$$$$  Remove Post  $$$$$$ : ");
        callback(err, success);
    });
}

function updatePost(post,callback){
    var query = {collection:post.collection, objectId:post.objectId};
    var changeDoc = {$set:{date:new Date()}};

    daf.Update(query, changeDoc, CONSTANT.WALL_POST_COLLECTION, function(err , dataList){
        console.log("$$$$$$$  Update Post  $$$$$$ : ");
        callback(err ,dataList);
    });
}

function getAllPost(req,callback){
    var params = (req.body.params) ? req.body.params : {};

    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var sorter = [['date',-1]];
    var option = {skip:skip, limit:limit, sort:sorter};

    var query = {};
    var data = {list:[]};
    var dbCon = daf.FindWithPagination(query,CONSTANT.WALL_POST_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.WALL_POST_COLLECTION,function(err , count){
                if(count){
                    data.count = count;
                }
                callback(null,data);
            })
        }else{
            callback(null,data);
        }

    });
}

module.exports.UpdateCount = updateCount;
module.exports.ChangeSizes = changeSizes;
module.exports.GetSizes = getSizes;
module.exports.AddPost = addPost;
module.exports.RemovePost = removePost;
module.exports.UpdatePost = updatePost;
module.exports.GetAllPost = getAllPost;
