/**
 * Created by Heshan on 11/8/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function addComment(req,callback){
    console.log("$$$$$$$  Add Tag $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {};
    var comment = params.comment;
    var shopId = params.shopId;
    var itemId = params.itemId;
    var addComment = {};
    comment.comId = new Date().getTime();
    comment.date = new Date();

    if(itemId){
        query = {itemId:itemId};
    }else{
        query = {shopId:shopId};
    }

    daf.FindOne(query, CONSTANT.COMMENT_COLLECTION, function(err, data){
        if(!data){
            if(itemId){
                query = {itemId:itemId, commentList:[comment]};
            }else{
                query = {shopId:shopId, commentList:[comment]};
            }
            daf.Insert(query, CONSTANT.COMMENT_COLLECTION, function(err , dataList){
                callback(err ,dataList);
            });
        }else{
            addComment = {$addToSet: {commentList: comment }};
            daf.Update(query, addComment, CONSTANT.COMMENT_COLLECTION, function(err , dataList){
                callback(err ,dataList);
            });
        }
    });

}

function getCommentList(req,callback){
    console.log("$$$$$$$  GetTagList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {};
    var shopId = params.shopId;
    var itemId = params.itemId;


    if(itemId){
        query = {itemId:itemId};
    }else{
        query = {shopId:shopId};
    }

    daf.FindOne(query, CONSTANT.COMMENT_COLLECTION, function(err, data){
        callback(err ,data);
    });
}

function getAdminCommentList(req,callback){
    console.log("$$$$$$$  GetTagList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {};

    var data = [];
    var dbCon = daf.Find(query,CONSTANT.COMMENT_COLLECTION);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
}

function removeComment(req,callback){
    console.log("$$$$$$$  Remove Tag $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var comId = params.comId;
    var query = {};
    var comment = params.comment;
    var shopId = params.shopId;
    var itemId = params.itemId;
    var removeComment = {};

    if(itemId){
        query = {itemId:itemId};
    }else{
        query = {shopId:shopId};
    }

    daf.FindOne(query, CONSTANT.COMMENT_COLLECTION, function(err, data){
        if(data){
            removeComment = {$pull: {'commentList': {'comId': comId}}};
            daf.Update(query, removeComment, CONSTANT.COMMENT_COLLECTION, function(err , dataList){
                callback(err ,dataList);
            });
        }else{
            callback('No comment for comId' ,null);
        }
    });

}


module.exports.AddComment = addComment;
module.exports.GetCommentList = getCommentList;
module.exports.GetAdminCommentList = getAdminCommentList;
module.exports.RemoveComment = removeComment;
