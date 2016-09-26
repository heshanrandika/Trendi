/**
 * Created by randika on 4/6/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function getUserList(req,callback){
    console.log("$$$$$$$  GetLatestItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:18;
    var sorter = [['item.trend',-1]];


    var option = {skip:skip, limit:limit, sort:sorter};
    var query = "";
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.USER_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function getUser(req,callback){
    console.log("$$$$$$$  GetMostTrendyItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip = params.skip;
    var limit = params.limit;
    var sorter = [["item.seen",-1],["item.like",-1],["item.trend",-1]];

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = "";
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.USER_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });

};

function updateUser(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var query = {'itemId':params.itemId};
    var changeDoc ={$inc:{ 'item.seen': 1}};
    daf.Update(query,changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err , data){
        daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
            callback(err ,data);
        });
    });

};

function addItemToList(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var email = req.body.email;
    var query = {email:email};
    var changeDoc ={$addToSet:{ watchList: params.itemId}};
    daf.Update(query,changeDoc,CONSTANT.USER_COLLECTION,function(err , data){
        callback(err ,data);
    });

};

function removeItemFromList(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var itemId = params.itemId;
    var email = req.body.email;
    var changeDoc = { $pull: { watchList: itemId}};
    var query = {email:email};
    daf.Update(query,changeDoc,CONSTANT.USER_COLLECTION,function(err , data){
            callback(err ,data);
    });

};

function getListItem(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var email = req.body.email;
    var all =  params.all;
    var query = {email:email};
    var results = [];

    daf.FindOne(query,CONSTANT.USER_COLLECTION, function(err , data){
        if(data){
            var itemList = [];
            if(all){
                itemList = data.watchList.reverse();
            }else{
                itemList = data.watchList.reverse().slice(0,3);
            }
            
            query = {'itemId':{$in:itemList}};
            var dbCon = daf.Find(query,CONSTANT.MAIN_ITEM_COLLECTION);
            dbCon.on('data', function(doc){
                results.push(doc);
            });

            dbCon.on('end', function(){
                callback(null,results);
            });
        }
    });

};

module.exports.GetUserList = getUserList;
module.exports.GetUser = getUser;
module.exports.UpdateUser = updateUser;
module.exports.AddItemToList = addItemToList;
module.exports.RemoveItemFromList = removeItemFromList;
module.exports.GetListItem = getListItem;
