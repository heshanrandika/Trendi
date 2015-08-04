/**
 * Created by Heshanr on 7/29/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function upsertBlog(req,callback){
    console.log("$$$$$$$  AddBlog $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var Email = params.Email;
    var query = {Email:Email};
    var blog = params.Blog;
    daf.Upsert(query, blog, CONSTANT.BLOG_COLLECTION, function(err , dataList){
        callback(err ,dataList);
    });
};


function getBlogList(req,callback){
    console.log("$$$$$$$  GetBlogList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {};
    var  option = {};

    var data = [];
    var dbCon = daf.FindWithSorting(query,CONSTANT.BLOG_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function removeBlog(req,callback){
    console.log("$$$$$$$  Remove Blog $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {Email:params.Email};

    daf.Remove(query,CONSTANT.BLOG_COLLECTION,function(err , success){
        callback(err ,success);
    });

};

function getBlog(req,callback){
    console.log("$$$$$$$ Get Blog  $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var Email = params.Email;
    var query = {Email:Email};

    daf.FindOne(query, CONSTANT.BLOG_COLLECTION,function(err , blog){
        callback(err ,blog[0]);
    });

};

module.exports.UpsertBlog = upsertBlog;
module.exports.GetBlogList = getBlogList;
module.exports.RemoveBlog = removeBlog;
module.exports.GetBlog = getBlog;