/**
 * Created by Heshanr on 3/10/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var UTIL = require('./utilController');
var _ = require('lodash');

function getLatestItems(req,callback){
    console.log("$$$$$$$  GetLatestItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var organize = (params.organize)?params.organize:"0";
    var sorter = [['Item.trend',-1]];


    var option = {skip:skip, limit:limit, sort:sorter};
    var query = "";
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        if(organize == "1"){
            var itemList =[];
            for (var index = 0; index<dataList.length; index+=3) {
                if(dataList.length >= index+3)
                    itemList.push(dataList.slice(index,index+3));
            }
            callback(null ,itemList);
        }else{
            callback(null,data);
        }
    });
};


function getItemByShop(req,callback){
    console.log("$$$$$$$  Get Items by Shop $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var shopId  = (params.shopId)?params.shopId:1;
    var sorter = [['Date',-1]];


    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {'Item.shopID' : shopId};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
            callback(null,data);
    });
};

function getMostTrendyItems(req,callback){
    console.log("$$$$$$$  GetMostTrendyItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip = params.skip;
    var limit = params.limit;
    var sorter = [["Item.seen",-1],["Item.like",-1],["Item.trend",-1]];

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = "";
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};


function getMainItemList(req,callback){
    console.log("$$$$$$$  Get Main Item List $$$$$$");
    var data = [];

    var params = (req.body.params) ? req.body.params : {};
    var skip = params.skip;
    var limit = params.limit;

    var sorter = [];
    var query = "";
    var option = {};

    var getExist = function(callback){
        sorter = [['Item.trend',-1]];
        skip = 0;
        limit = 1;
        var idArray = [];
        option = {skip:skip, limit:limit, sort:sorter,fields:{ItemID:1,_id:0}};
        var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
        dbCon.on('data', function(doc){
            idArray.push(doc.ItemID)
        });

        dbCon.on('end', function(){
            callback(idArray);
        })
    };


    getExist(function(idArray){
        skip = 0;
        limit = 5;
        query = {$and: [ {'Item.onSale' : 0}, {"ItemID": { $nin: idArray }} ]};
        sorter = [["Item.like",-1],["Item.trend",-1]];
        option = {skip:skip, limit:limit, sort:sorter};
        var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
        dbCon.on('data', function(doc){
            doc.class = "topRated";
            data.push(doc);
        });

        dbCon.on('end', function(){
            query = {$and: [ {'Item.onSale' : 1}, {"ItemID": { $nin: idArray }} ]};
            sorter = [["Item.like",-1],["Item.trend",-1]];
            option = {skip:skip, limit:limit, sort:sorter};
            var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
            dbCon.on('data', function(doc){
                doc.class = "onSale";
                data.push(doc);
            });

            dbCon.on('end', function(){
                query = {};
                sorter = [["Promotion.like",-1],["Promotion.trend",-1]];
                option = {skip:skip, limit:limit, sort:sorter};
                var dbCon = daf.FindWithSorting(query,CONSTANT.PROMOTION_COLLECTION,option);
                dbCon.on('data', function(doc){
                    doc.class = "promotion";
                    data.push(doc);
                });

                dbCon.on('end', function(){
                    callback(null,data);
                });

            });

        });
    });

};


function getCommonItemList(req,callback){
    console.log("$$$$$$$  GetMostTrendyItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip = params.skip;
    var limit = params.limit;
    var type = params.type;

    var sorter = [];


    var query = "";

    switch (type){
        case CONSTANT.ON_SALE:
            query = {"mainItem.onSale":1};
            sorter = [["mainItem.trend",-1]];
            break;

        case CONSTANT.NEW_PRODUCT:
            query = {"mainItem.onSale":0};
            sorter = [["mainItem.trend",-1]];
            break;
        case CONSTANT.TOP_RATED:
            query = {"mainItem.onSale":0};
            sorter = [["mainItem.trend",-1],["mainItem.like",-1]];
            break;

        default :break;
    }
    var data = [];
    var option = {skip:skip, limit:limit, sort:sorter};
    var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};



function getSubItem(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var query = {'ItemID':params.ItemID};
    var changeDoc ={$inc:{ 'Item.seen': 1}};
    daf.Update(query,changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err , data){
        daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
            callback(err ,data);
        });
    });

};

function getRelatedItems(req,callback){
    console.log("$$$$$$$  GetRelatedItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip = params.skip;
    var limit = params.limit;
    var sorter = params.sorter;
    var price = (params.price)? params.price : 0;
    var name = (params.name)? params.name : '';
    var type = (params.type)? params.type : '';

    var option = {};
    var query = {'name':name,'type':type,'price':price};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });

};

function editItems(req,callback){
    console.log("$$$$$$$  EditItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var query = {'ItemID':params.ItemID};

    var itemList = {};
    var mainItem = {};
    daf.FindOne(query,CONSTANT.MAIN_ITEM_COLLECTION, function(err , data){
        if(data) {
            mainItem = data.Item;
            daf.FindOne(query, CONSTANT.SUB_ITEM_COLLECTION, function (err, data) {
                if(data){
                    itemList.subItem = data.ItemList;
                    itemList.mainItem = mainItem;
                    callback(err, itemList);
                }else{
                    callback(err, data);
                }
            });
        }else{
            callback(err, data);
        }
    });


};

function updateItem(req,callback){
    console.log("$$$$$$$  UpdateItem $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var mainItem = (params.mainItem)? params.mainItem:{};
    var subItem = (params.subItem)? params.subItem:{};
    var ItemID = (params.ItemID)? params.ItemID:0;
    var query = {'ItemID':ItemID};
    console.log("$$$$$$$  UpdateItem $$$$$$ : ");
    if(params.mainItem && params.subItem){
        daf.Remove(query,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){
            if(success) {
                daf.Remove(query, CONSTANT.SUB_ITEM_COLLECTION, function (err, success) {
                    var doc = {ItemID: ItemID, Date:new Date(), Item: mainItem};
                    if (success) {
                        daf.Insert(doc, CONSTANT.MAIN_ITEM_COLLECTION, function (err, success) {
                            if (success) {
                                doc = {ItemID: ItemID, ItemList: subItem};
                                daf.Insert(doc, CONSTANT.SUB_ITEM_COLLECTION, function (err, success) {
                                    if (success) {
                                        callback(err, success);
                                    } else {
                                        callback(err, success);
                                    }
                                });
                            } else {
                                callback(err, success);
                            }
                        });
                    }else{
                        callback(err, success);
                    }
                });

            }else{
                callback(err, success);
            }
        });
    }else{
        var err = "Item details not available";
        callback(err);
    }
};

function addItems(req,callback) {
    console.log("$$$$$$$  AddItems $$$$$$");

    var itemID = 0;
    var params = (req.body.params) ? req.body.params : {};
    var mainItem = (params.mainItem) ? params.mainItem : {};
    var subItem = (params.subItem) ? params.subItem : {};
    if(params.mainItem){

        UTIL.UpdateCount(CONSTANT.MAIN_ITEM_COLLECTION, function (err, count) {
                    if (count) {
                        console.log("$$$$$$$  AddItems $$$$$$ Count : " + doc);
                        itemID = count;
                        var doc = {ItemID: itemID, Date: new Date(), Item: mainItem};
                        daf.Insert(doc, CONSTANT.MAIN_ITEM_COLLECTION, function (err, success) {
                            console.log("^^^^^^^  Add Main Items ^^^^^^^ : ");
                            if (success && params.subItem) {
                                console.log("^^^^^^^  Add Sub Items ^^^^^^^ : ");
                                doc = {ItemID: itemID, ItemList: subItem};
                                daf.Insert(doc, CONSTANT.SUB_ITEM_COLLECTION, function (err, success) {
                                    if (success) {
                                        callback(err, success);
                                    } else {
                                        callback(err, success);
                                    }
                                });
                            } else {
                                callback(err, success);
                            }
                        })
                    } else {
                        callback(err, doc);
                    }

                });

    }else{
        var err = "Item details not available";
        callback(err);
    }
};

module.exports.GetLatestItem = getLatestItems;
module.exports.GetItemByShop = getItemByShop;
module.exports.GetMostTrendyItems = getMostTrendyItems;
module.exports.AddItems = addItems;
module.exports.GetSubItem = getSubItem;
module.exports.GetRelatedItems = getRelatedItems;
module.exports.EditItems = editItems;
module.exports.UpdateItem = updateItem;
module.exports.GetCommonItemList = getCommonItemList;
module.exports.GetMainItemList = getMainItemList;