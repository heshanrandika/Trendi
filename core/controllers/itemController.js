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
    var sorter = [['item.trend',-1]];


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
    var shopId  = params.shopId;
    var sorter = [['date',-1]];


    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {'item.shop.shopId' : shopId};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};


function adminGetItemList(req,callback){
    console.log("$$$$$$$  Get Items by Shop $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var shopId  = params.shopId;
    var branchId  = params.branchId;
    var searchKey  = params.searchKey;
    var searchValue  = params.searchValue;
    var sorter = [['date',-1]];

    var title = req.user.title.value;
    var query = {};
    switch (title){
        case 20:
            query = {};
            break;

        case 10:
            query = {'item.shop.shopId' : shopId};
            break;

        default :
            query = {$and:[{'item.shop.shopId' : shopId},{'item.shop.branchId' : branchId}]};
            break;
    }

    var option = {skip:skip, limit:limit, sort:sorter};

    if(searchKey != '')
        query[searchKey] = searchValue;

    var data = {list:[]};
    var dbCon = daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.MAIN_ITEM_COLLECTION,function(err , count){
                if(count){
                    data.count = count;
                }
                callback(null,data);
            })
        }else{
            callback(null,data);
        }

    });
};

function getMostTrendyItems(req,callback){
    console.log("$$$$$$$  GetMostTrendyItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip = params.skip;
    var limit = params.limit;
    var sorter = [["item.seen",-1],["item.like",-1],["item.trend",-1]];

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
        sorter = [['item.trend',-1]];
        skip = 0;
        limit = 1;
        var idArray = [];
        option = {skip:skip, limit:limit, sort:sorter,fields:{itemId:1,_id:0}};
        var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
        dbCon.on('data', function(doc){
            idArray.push(doc.itemId)
        });

        dbCon.on('end', function(){
            callback(idArray);
        })
    };


    getExist(function(idArray){
        skip = 0;
        limit = 5;
        query = {$and: [ {'item.onSale' : { $exists : false }}, {"itemId": { $nin: idArray }} ]};
        sorter = [["item.like",-1],["item.trend",-1]];
        option = {skip:skip, limit:limit, sort:sorter};
        var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
        dbCon.on('data', function(doc){
            doc.class = "topRated";
            data.push(doc);
        });

        dbCon.on('end', function(){
            query = {$and: [ {'item.onSale' : true}, {"itemId": { $nin: idArray }} ]};
            sorter = [["item.like",-1],["item.trend",-1]];
            option = {skip:skip, limit:limit, sort:sorter};
            var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
            dbCon.on('data', function(doc){
                doc.class = "onSale";
                data.push(doc);
            });

            dbCon.on('end', function(){
                callback(null,data);
            });

        });
    });

};

function getSearchItemList(req,callback){
    console.log("$$$$$$$  Get Search Item List $$$$$$");
    var data = [];

    var params = (req.body.params) ? req.body.params : {};
    var opt = params.option;
    var skip = params.skip;
    var limit = params.limit;
    var category = params.category;
    var item = params.item;
    var shop = params.shop;
    var searchText = params.searchText;
    var filterMap = params.filterMap?params.filterMap:[];
    var filter = [];

    var sorter = [];
    var query = "";
    var option = {};
    var data = {list:[]};

    if(!(category == '' || undefined == category)){
        var tmp ={};
        tmp['item.group.'+category.toLowerCase()] = true;
        filter.push(tmp);
    }
    if(!(item == '' || undefined == item || item == "all")){
        filter.push( {'item.types': { $elemMatch: { value: item } } });
    }
    if(!(shop == '' || undefined == shop || shop == "all")){
        filter.push({'item.shop.shopId': parseInt(shop)});
    }
    if(!(searchText == '' || undefined == searchText)){
        filter.push({'$text':{ '$search': item}});
    }
    if(!(filterMap.size == '' || undefined == filterMap.size)){
        if(!(filterMap.size.value == '' || undefined == filterMap.size.value)){
            filter.push( {'item.sizes': { $elemMatch: { value: filterMap.size.value } } });
        }
    }
    if(!(filterMap.color == '' || undefined == filterMap.color)){
        if(!(filterMap.color.value == '' || undefined == filterMap.color.value)) {
            filter.push({'item.colors': {$elemMatch: {color: filterMap.color.value}}});
        }
    }
    if(!(filterMap.minPrice == '' || undefined == filterMap.minPrice)){

    }
    if(!(filterMap.maxPrice == '' || undefined == filterMap.maxPrice)){

    }



    query = {$and: [ {'item.onSale' : { $exists : false }}]};
    query.$and = query.$and.concat(filter);
    sorter = [["item.like",-1],["item.trend",-1]];
    option = {skip:skip, limit:limit, sort:sorter};
    var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        doc.class = "topRated";
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        query = {$and: [ {'item.onSale' : true}]};
        query.$and = query.$and.concat(filter);
        sorter = [["item.like",-1],["item.trend",-1]];
        option = {skip:skip, limit:limit, sort:sorter};
        var dbCon = daf.FindWithSorting(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
        dbCon.on('data', function(doc){
            doc.class = "onSale";
            data.list.push(doc);
        });

        dbCon.on('end', function(){
            if(skip == 0){
                query = {$and: filter};
                daf.Count(query,CONSTANT.MAIN_ITEM_COLLECTION,function(err , count){
                    if(count){
                        data.count = count;
                    }
                    callback(null,data);
                })
            }else{
                callback(null,data);
            }
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
    var query = {'itemId':params.itemId};
    var changeDoc ={$inc:{ 'item.seen': 1}};
    if(params.seenEnable){
        daf.Update(query,changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err , data){
            daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
                callback(err ,data);
            });
        });
    }else{
        daf.FindOne(query,CONSTANT.SUB_ITEM_COLLECTION, function(err , data){
            callback(err ,data);
        });
    }


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
    var query = {'itemId':params.itemId};

    var itemList = {};
    var mainItem = {};
    daf.FindOne(query,CONSTANT.MAIN_ITEM_COLLECTION, function(err , data){
        if(data) {
            mainItem = data.item;
            daf.FindOne(query, CONSTANT.SUB_ITEM_COLLECTION, function (err, data) {
                if(data){
                    itemList.subItem = data.itemList;
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
    var itemId = (params.itemId)? params.itemId:0;
    var query = {'itemId':itemId};
    console.log("$$$$$$$  UpdateItem $$$$$$ : ");
    if(params.mainItem && params.subItem){
        daf.Remove(query,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){
            if(success) {
                daf.Remove(query, CONSTANT.SUB_ITEM_COLLECTION, function (err, success) {
                    var doc = {itemId: itemId, date:new Date(), item: mainItem};
                    var doc = {itemId: itemId, date: new Date(), item: mainItem};
                    doc.searchText = "";
                    _.each(mainItem.types,function(val){
                        doc.searchText += (val.value+" ");
                    });
                    doc.searchText += (mainItem.name+" ");
                    if (success) {
                        daf.Insert(doc, CONSTANT.MAIN_ITEM_COLLECTION, function (err, success) {
                            if (success) {
                                doc = {itemId: itemId, itemList: subItem};
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
                console.log("$$$$$$$  AddItems $$$$$$ Count : " + count);
                itemId = count;
                var doc = {itemId: itemId, date: new Date(), item: mainItem};
                doc.searchText = "";
                _.each(mainItem.types,function(val){
                    doc.searchText += (val.value+" ");
                });
                doc.searchText += (mainItem.name+" ");

                daf.Insert(doc, CONSTANT.MAIN_ITEM_COLLECTION, function (err, success) {
                    console.log("^^^^^^^  Add Main Items ^^^^^^^ : ");
                    if (success && params.subItem) {
                        console.log("^^^^^^^  Add Sub Items ^^^^^^^ : ");
                        doc = {itemId: itemId, itemList: subItem};
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
                callback(err, null);
            }

        });

    }else{
        var err = "Item details not available";
        callback(err);
    }
};

function removeItem(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var itemId = (params.itemId)? params.itemId:0;
    var query = {'itemId':itemId};
    console.log("$$$$$$$  Remove Item  $$$$$$ : ");
    daf.Remove(query,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){
        if(success) {
            daf.Remove(query, CONSTANT.SUB_ITEM_COLLECTION, function (err, success) {
                callback(err, success);
            });
        }else{
            callback(err, success);
        }
    });

};


function getItemCountByTags(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var category = params.category;
    var shopId = parseInt(params.shop);
    var query = [];
    if(params.shop == 'all'){
        query = [
            { $unwind : "$item.types" } ,
            { $group: { "_id": "$item.types.value" , "count": { $sum: 1 } } }
        ];
    }else{
        query = [
            { $match: { 'item.shop.shopId': shopId } },
            { $unwind : "$item.types" } ,
            { $group: { "_id": "$item.types.value" , "count": { $sum: 1 } } }
        ];
    }


    if(undefined != category && category != 'all'){
        var catText = {};
        catText["item.group."+category.toLowerCase()]   = true;

        query.splice(1,0,{"$match":catText});
    }

    daf.Aggregate(query,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){
        callback(err, success);
    });

};


function getMainItem(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var itemId = (params.itemId)? params.itemId:0;
    var query = {'itemId':itemId};
    console.log("$$$$$$$  main Item  $$$$$$ : ");
    daf.FindOne(query,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){
        callback(err, success);
    });

};

function getItemMenu(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var menuId = (params.menuId)? params.menuId:0;
    var query = {};
    console.log("$$$$$$$  Item Menu $$$$$$ : ");
    daf.FindOne(query,CONSTANT.ITEM_MENU_COLLECTION,function(err,success){
        callback(err, success);
    });

};

function setRating(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var menuId = (params.menuId)? params.menuId:0;
    var origin = params.origin
    var query = {};

/*    switch(origin){
        case 'item':
            query = {
                {},{ $inc: { quantity: -2, "metrics.orders": 1 } }
            }

        case 'shop':
         query = {
                {},{ $inc: { quantity: -2, "metrics.orders": 1 } }
            }
    }*/
/*db.products.update(
   { sku: "abc123" },
   { $inc: { quantity: -2, "metrics.orders": 1 } }
)*/

    console.log("$$$$$$$  Item Menu $$$$$$ : ");
    daf.Update(query,CONSTANT.ITEM_MENU_COLLECTION,function(err,success){
        callback(err, success);
    });

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
module.exports.RemoveItem = removeItem;
module.exports.AdminGetItemList = adminGetItemList;
module.exports.GetSearchItemList = getSearchItemList;
module.exports.GetItemCount = getItemCountByTags;
module.exports.GetMainItem = getMainItem;
module.exports.GetItemMenu = getItemMenu;