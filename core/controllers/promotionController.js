/**
 * Created by Heshanr on 3/17/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var UTIL = require('./utilController');
var _ = require('lodash');

function getPromotionList(req,callback){
    console.log("$$$$$$$  GetPromotionList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:10;
    var sorter = (params.sorter)?params.sorter:[];
    var shopId = (params.shop)?params.shop:undefined;
    var bank = (params.bank)?params.bank:undefined;

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {delete:0};
    if(shopId)
        query['shopId'] = shopId;
    if(bank)
        query['banks'] = { $elemMatch: { key:bank} };
    var data = {list:[]};
    var dbCon = daf.FindWithPagination(query,CONSTANT.PROMOTION_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.PROMOTION_COLLECTION,function(err , count){
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


function getAdminPromotionList(req,callback){
    console.log("$$$$$$$  GetPromotionList $$$$$$");
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
            query = {shopId:shopId};
            break;

        default :
            query = {$and:[{shopId:shopId},{branchId : branchId}]};
            break;
    }

    if(searchKey != '')
        query[searchKey] = searchValue;

    if(searchArray && searchArray.length>0)
    _.each(searchArray,function(obj){
             query[obj.key] = obj.value;
    });

    var data = {list:[]};
    var dbCon = daf.FindWithPagination(query,CONSTANT.PROMOTION_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.PROMOTION_COLLECTION,function(err , count){
                if(count){
                    data.count = count;
                }
                callback(null,data);
            })
        }else{
            callback(null,data);
        }

    });






/*
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.PROMOTION_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });*/

};

function getRatedPromotionList(req,callback){
    console.log("$$$$$$$  GetRatedPromotionList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:10;
    var sorter = (params.sorter)?params.sorter:[['promotion.trend',-1]];

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {delete:0};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.PROMOTION_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function addPromotion(req,callback){
    console.log("$$$$$$$  Add Promotion $$$$$$");
    var promotionId = 0;
    var params = (req.body.params) ? req.body.params : {};
    var promotion = (params.promotion)? params.promotion:{};
    if(params.promotion) {
        UTIL.UpdateCount(CONSTANT.PROMOTION_COLLECTION, function (err, count) {
            if (count) {
                console.log("$$$$$$$  Add Promotion $$$$$$ Count : " + count);
                promotionId = count;
                promotion.promotionId = promotionId;
                var doc = promotion;
                daf.Insert(doc, CONSTANT.PROMOTION_COLLECTION, function (err, success) {
                    console.log("^^^^^^^  Promotion Added ^^^^^^^ : ");
                    callback(err, success);
                })
            } else {
                callback(err, count);
            }

        });
    }else{
        var err = "Promotion details not available";
        callback(err);
    }
};

function removePromotion(req,callback){
    console.log("$$$$$$$  RemovePromotion $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var promotion = (params.promotion)? params.promotion : {};

    if(promotion){
        var query = {promotionId:promotion.promotionId};
        console.log("$$$$$$$ Remove Promotion $$$$$$ : ");
        daf.Remove(query,CONSTANT.PROMOTION_COLLECTION,function(err,success){
            callback(err , success);
        });

    }else{
        callback('No promotion id' , null);
    }

};

function updatePromotion(req,callback){
    console.log("$$$$$$$  Update Promotion $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var promotion = (params.promotion)? params.promotion : {};

    console.log("$$$$$$$  Update Promotion $$$$$$ : ");
    if(params.promotion) {
        var query = {promotionId:promotion.promotionId};
        var doc = {$set:{
            title : promotion.title,
            promotionPic: promotion.promotionPic,
            tags: promotion.tags,
            banks: promotion.banks,
            proType:promotion.proType,
            description: promotion.description,
            expDate:promotion.expDate
        }};
        daf.Update(query, doc, CONSTANT.PROMOTION_COLLECTION, function (err, success) {
            callback(err, success);
        });
    }else{
        var err = "Promotion details not available";
        callback(err);
    }
};

function adminPromotionApproval(req,callback){
    console.log("$$$$$$$  Update Promotion $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var promotion = (params.promotionId)? params.promotionId : {};
    var approved = (params.approved)? params.approved:false;

    console.log("$$$$$$$  Update Promotion $$$$$$ : ");
    if(params.promotionId) {
        var query = {promotionId:promotion.promotionId};
        var doc = {$set:{
            approved:approved
        }};
        daf.Update(query, doc, CONSTANT.PROMOTION_COLLECTION, function (err, success) {
            callback(err, success);
        });
    }else{
        var err = "Promotion details not available";
        callback(err);
    }
};

function getPromotion(req,callback){
    console.log("$$$$$$$  Get Promotion $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var promotionId = (params.promotionId)? params.promotionId:0;
    var query = {promotionId:promotionId,delete:0};

    console.log("$$$$$$$  Get Promotion $$$$$$ : ");
    daf.FindOne(query,CONSTANT.PROMOTION_COLLECTION,function(err,success){
        callback(err , success);
    });
}


module.exports.GetAdminPromotionList = getAdminPromotionList;
module.exports.GetPromotionList = getPromotionList;
module.exports.GetRatedPromotionList = getRatedPromotionList;
module.exports.AddPromotion = addPromotion;
module.exports.RemovePromotion = removePromotion;
module.exports.UpdatePromotion = updatePromotion;
module.exports.AdminPromotionApproval = adminPromotionApproval;
module.exports.GetPromotion = getPromotion;

