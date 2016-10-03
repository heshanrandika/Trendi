/**
 * Created by Heshanr on 7/29/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var UTIL = require('./utilController');
var _ = require('lodash');

function insertBlog(req,callback){
    console.log("$$$$$$$  AddBlog $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var blog = params.blog;
    UTIL.UpdateCount(CONSTANT.BLOG_COLLECTION, function (err, count) {
        if (count) {
            console.log("$$$$$$$  blog $$$$$$ Count : " + count);
            blog.blogId = count;
            daf.Insert(blog, CONSTANT.BLOG_COLLECTION, function(err , dataList){
                callback(err ,dataList);
            });

        } else {
            callback(err, null);
        }

    });


};

function updateBlog(req,callback){
    console.log("$$$$$$$  AddBlog $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var blog = params.blog;
    delete blog._id;
    var shopId = blog.shop.shopId;
    var query = {'shop.shopId':shopId, blogId : blog.blogId};
    daf.Update(query, blog, CONSTANT.BLOG_COLLECTION, function(err , dataList){
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

function getAdminBlogList(req,callback){
    console.log("$$$$$$$  GetBlogList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:10;

    var shopId = params.shopId;
    var branchId  = params.branchId;
    var searchKey  = params.searchKey;
    var searchValue  = params.searchValue;
    var searchArray = params.searchArray;
    var sorter = [['date',-1]];

    var option = {skip:skip, limit:limit, sort:sorter};


    var title = req.user.title.value;
    var query = {};
    switch (title){
        case 20:
            query = {};
            break;

        case 10:
            query = {'shop.shopId':shopId};
            break;

        default :
            query = {$and:[{'shop.shopId':shopId},{branchId : branchId}]};
            break;
    }

    if(searchKey != '')
        query[searchKey] = searchValue;

    if(searchArray && searchArray.length>0)
    _.each(searchArray,function(obj){
             query[obj.key] = obj.value;
    });

    var data = {list:[]};
    var dbCon = daf.FindWithPagination(query,CONSTANT.BLOG_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.BLOG_COLLECTION,function(err , count){
                if(count){
                    data.count = count;
                }
                callback(null,data);
            })
        }else{
            callback(null,data);
        }

    });














/*    var query = {};
    var  option = {};

    var data = [];
    var dbCon = daf.FindWithSorting(query,CONSTANT.BLOG_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });*/
};

function removeBlog(req,callback){
    console.log("$$$$$$$  Remove Blog $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var blog = params.blog;
    var query = {blogId : blog.blogId, 'shop.shopId' : blog.shop.shopId};
    daf.Remove(query,CONSTANT.BLOG_COLLECTION,function(err , success){
        callback(err ,success);
    });

};

function getBlog(req,callback){
    console.log("$$$$$$$ Get Blog  $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var email = params.email;
    var query = {email:email};

    daf.FindOne(query, CONSTANT.BLOG_COLLECTION,function(err , blog){
        callback(err ,blog);
    });

};

module.exports.InsertBlog = insertBlog;
module.exports.UpdateBlog = updateBlog;
module.exports.GetBlogList = getBlogList;
module.exports.GetAdminBlogList = getAdminBlogList;
module.exports.RemoveBlog = removeBlog;
module.exports.GetBlog = getBlog;