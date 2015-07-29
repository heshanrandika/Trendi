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
    var organize = (params.organize)?params.organize:"1";
    var sorter = [['Item.trend',-1]];


    var option = {skip:skip, limit:limit, sort:sorter};
    var query = "";
    daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option, function(err , dataList){
        if(dataList){
            if(organize == "1"){
                var itemList =[];
                for (var index = 0; index<dataList.length; index+=3) {
                    if(dataList.length >= index+3)
                        itemList.push(dataList.slice(index,index+3));
                }
                callback(err ,itemList);
            }else{
                callback(err ,dataList);
            }

        }else{
            callback(err ,dataList);
        }
    });
};

function getUser(req,callback){
    console.log("$$$$$$$  GetMostTrendyItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip = params.skip;
    var limit = params.limit;
    var sorter = [["Item.seen",-1],["Item.like",-1],["Item.trend",-1]];

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = "";
    daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option, function(err , data){
        callback(err ,data);
    });
};

function updateUser(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var query = {'ItemID':params.ItemID};
    var changeDoc ={$inc:{ 'Item.seen': 1}};
    daf.Update(query,changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err , data){
        daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
            callback(err ,data);
        });
    });

};

function addItemToList(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var query = {'ItemID':params.ItemID};
    var changeDoc ={$inc:{ 'Item.seen': 1}};
    daf.Update(query,changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err , data){
        daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
            callback(err ,data);
        });
    });

};

function removeItemFromList(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var query = {'ItemID':params.ItemID};
    var changeDoc ={$inc:{ 'Item.seen': 1}};
    daf.Update(query,changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err , data){
        daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
            callback(err ,data);
        });
    });

};

function getListItem(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var query = {'ItemID':params.ItemID};
    var changeDoc ={$inc:{ 'Item.seen': 1}};
    daf.Update(query,changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err , data){
        daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
            callback(err ,data);
        });
    });

};

module.exports.GetUserList = getUserList;
module.exports.GetUser = getUser;
module.exports.UpdateUser = updateUser;
module.exports.AddItemToList = addItemToList;
module.exports.RemoveItemFromList = removeItemFromList;
module.exports.GetListItem = getListItem;
