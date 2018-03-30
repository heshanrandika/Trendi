/**
 * Created by Heshanr on 8/11/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var ObjectId = require('mongodb').ObjectID;
var _ = require('lodash');
var fs = require('fs');
var path = require('path');


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

    var skip     =   (params.skip)?params.skip:0;
    var limit    =   (params.limit)?params.limit:16;
    var reqDate  =   (params.reqDate)?params.reqDate:new Date();
    var pullReq  =   params.pullReq;
    var sorter   =   [['date',-1]];
    var option   =   {skip:skip, limit:limit, sort:sorter};


    if(pullReq){
        option   =   {sort:sorter};
        var query = { 'date' : { '$gt' : reqDate , '$lt' : new Date() } } ;
        var data = [];
        var dbCon = daf.FindWithPagination(query,CONSTANT.WALL_POST_COLLECTION,option);
        dbCon.on('data', function(doc){
            data.push(doc);
        });

        dbCon.on('end', function(){
            var count = data.length;
            for(index in data){
                daf.FindOne({_id:ObjectId(data[index].objectId)},data[index].collection,function(err,val){
                    count--;
                    if(val)
                        results.push(val);
                    if(count == 0)
                        callback(null,results);
                });
                
            }
           
        });
    }else{
        var query = {"date" : { $lt : reqDate }};
        var data = [];
        var results = [];
        var dbCon = daf.FindWithPagination(query,CONSTANT.WALL_POST_COLLECTION,option);
        dbCon.on('data', function(doc){
            data.push(doc);
        });

        dbCon.on('end', function(){
            var count = data.length;
            for(index in data){
                daf.FindOne({_id:ObjectId(data[index].objectId)},data[index].collection,function(err,val){
                    count--;
                    if(val)
                        results.push(val);
                    if(count == 0)
                        callback(null,results);
                });
                
            }
           
        });
    }

    
}


function imageSaver(data, pathString, callback){
	ensureDirectoryExistence(pathString+"/0");
    var imagePath = pathString+"/"+Date.now()+".png"
    if(!(data.indexOf("/App_Images") == 0)){
    	saveImage(data, imagePath);
    	callback(imagePath.replace('public',''));
    }else{
    	callback(0);
    }
}

function saveImage(data, imagePath){
    var base64Data = data.replace(/^data:image\/png;base64,/, "");
    base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile(imagePath, base64Data, 'base64', function(err) {
        console.log(err);
    });
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function deleteImages(images){
	 for (var i =  0; i < images.length; i++) {
	        imagePath = 'public'+images[i].image; 
	        fs.unlink(imagePath,function(err){
	            if(err) return console.log(err);
	            console.log('file deleted successfully');
	       });  
	 }
}

module.exports.UpdateCount = updateCount;
module.exports.ChangeSizes = changeSizes;
module.exports.GetSizes = getSizes;
module.exports.AddPost = addPost;
module.exports.RemovePost = removePost;
module.exports.UpdatePost = updatePost;
module.exports.GetAllPost = getAllPost;
module.exports.ImageSaver = imageSaver;
module.exports.SaveImage  = saveImage;
module.exports.EnsureDirectoryExistence = ensureDirectoryExistence;
module.exports.DeleteImages = deleteImages;
