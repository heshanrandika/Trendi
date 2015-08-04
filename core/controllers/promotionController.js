/**
 * Created by Heshanr on 3/17/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function getPromotionList(req,callback){
    console.log("$$$$$$$  GetPromotionList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:10;
    var sorter = (params.sorter)?params.sorter:[];

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {Delete:0};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.PROMOTION_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });

};

function getRatedPromotionList(req,callback){
    console.log("$$$$$$$  GetRatedPromotionList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:10;
    var sorter = (params.sorter)?params.sorter:[['Promotion.trend',-1]];

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {Delete:0};
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
    var promotion = (params.Promotion)? params.Promotion:{};
    if(params.Promotion) {
        daf.Count('', CONSTANT.PROMOTION_COLLECTION, function (err, count) {
            if (count) {
                console.log("$$$$$$$  Add Promotion $$$$$$ Count : " + count);
                promotionId = count;
                var doc = {PromotionID: promotionId, Promotion: promotion,Delete:0};
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
    var promotionID = (params.PromotionID)? params.PromotionID:0;
    var query = {PromotionID:promotionID};
    var changeDoc = {Delete:1};
    console.log("$$$$$$$ RemovePromotion Update Promotion $$$$$$ : ");
    daf.Update(query,changeDoc,CONSTANT.PROMOTION_COLLECTION,function(err,success){
        callback(err , success);
    });
};

function updatePromotion(req,callback){
    console.log("$$$$$$$  Update Promotion $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var promotionId = (params.PromotionID)? params.PromotionID:0;
    var promotion = (params.Promotion)? params.Promotion : {};

    var query = {PromotionID:promotionId};
    var doc = {PromotionID: promotionId, Promotion: promotion,Delete:0};

    console.log("$$$$$$$  Update Promotion $$$$$$ : ");
    if(params.Promotion) {
        daf.Remove(query, CONSTANT.PROMOTION_COLLECTION, function () {
            daf.Insert(doc, CONSTANT.PROMOTION_COLLECTION, function (err, success) {
                callback(err, success);
            });
        });
    }else{
        var err = "Promotion details not available";
        callback(err);
    }
};

function getPromotion(req,callback){
    console.log("$$$$$$$  Get Promotion $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var promotionID = (params.PromotionID)? params.PromotionID:0;
    var query = {PromotionID:promotionID,Delete:0};

    console.log("$$$$$$$  Get Promotion $$$$$$ : ");
    daf.FindOne(query,CONSTANT.PROMOTION_COLLECTION,function(err,success){
        callback(err , success);
    });
}


module.exports.GetPromotionList = getPromotionList;
module.exports.GetRatedPromotionList = getRatedPromotionList;
module.exports.AddPromotion = addPromotion;
module.exports.RemovePromotion = removePromotion;
module.exports.UpdatePromotion = updatePromotion;
module.exports.GetPromotion = getPromotion;

