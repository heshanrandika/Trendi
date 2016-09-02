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


function insertSize(req,callback){
    console.log("$$$$$$$  AddBlog $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var blog = params.sizes;
    UTIL.UpdateCount(CONSTANT.SIZE_COLLECTION, function (err, count) {
        if (count) {
            console.log("$$$$$$$  blog $$$$$$ Count : " + count);
            blog.blogId = count;
            daf.Insert(blog, CONSTANT.SIZE_COLLECTION, function(err , dataList){
                callback(err ,dataList);
            });

        } else {
            callback(err, null);
        }

    });


}; 

module.exports.UpdateCount = updateCount;
