/**
 * Created by Heshanr on 3/10/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function getLatestItems(req,callback){
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

function getMostTrendyItems(req,callback){
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
    daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option, function(err , data){
        callback(err ,data);
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
            mainItem = data[0].Item;
            daf.FindOne(query, CONSTANT.SUB_ITEM_COLLECTION, function (err, data) {
                if(data){
                    itemList.subItem = data[0].ItemList;
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
    if(params.mainItem && params.subItem){
        daf.Count('', CONSTANT.MAIN_ITEM_COLLECTION, function (err, count) {
            if (count) {
                console.log("$$$$$$$  AddItems $$$$$$ Count : " + count);
                itemID = count;
                var doc = {ItemID: itemID, Date: new Date(), Item: mainItem};
                daf.Insert(doc, CONSTANT.MAIN_ITEM_COLLECTION, function (err, success) {
                    console.log("^^^^^^^  Add Main Items ^^^^^^^ : ");
                    if (success) {
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
                callback(err, count);
            }

        });
    }else{
        var err = "Item details not available";
        callback(err);
    }
};

module.exports.GetLatestItem = getLatestItems;
module.exports.GetMostTrendyItems = getMostTrendyItems;
module.exports.AddItems = addItems;
module.exports.GetSubItem = getSubItem;
module.exports.GetRelatedItems = getRelatedItems;
module.exports.EditItems = editItems;
module.exports.UpdateItem = updateItem;