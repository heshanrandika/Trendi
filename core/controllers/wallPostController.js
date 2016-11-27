/**
 * Created by heshan on 11/27/2016.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var _ = require('lodash');

function getLatestPost(req,callback){
    console.log("$$$$$$$  Get Wall Post $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var sorter = [['trend',-1],['date',-1]];
    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {};

    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.WALL_POST_COLLECTION,option);
    dbCon.on('data', function(doc){
        //data retrieve logic
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function updatePost(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var post = (params.post)? params.post:{};
    var query = {'collection':post.collection, objectId : post.objectId};
    var changeDoc = {$set:{date: new Date()}};
    console.log("$$$$$$$  Update Post  $$$$$$ : ");

    daf.Update(query,changeDoc,CONSTANT.WALL_POST_COLLECTION,function(err,success){
        callback(err,success)
    });

};

function removePost(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var post = (params.post)? params.post:{};
    var query = {'collection':post.collection, objectId : post.objectId};
    console.log("$$$$$$$  Remove Post  $$$$$$ : ");


    daf.Remove(query,CONSTANT.WALL_POST_COLLECTION,function(err,success){
        callback(err, success);
    });

};

function addPost(req,callback) {
    var params = (req.body.params) ? req.body.params : {};
    var post = (params.post) ? params.post : {};
    if(params.post){
        daf.Insert(post, CONSTANT.WALL_POST_COLLECTION, function (err, success) {
            console.log("$$$$$$$  Post Added $$$$$$ : ");
            callback(err, success);
        })
    }else{
        var err = "Post details not available";
        callback(err);
    }
};


module.exports.GetLatestPost = getLatestPost;
module.exports.UpdatePost = updatePost;
module.exports.RemovePost = removePost;
module.exports.AddPost = addPost;