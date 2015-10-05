/**
 * Created by Heshanr on 3/10/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function getShopList(req,callback){
    console.log("$$$$$$$  GetShopList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:18;
    var sorter = params.sorter;

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {delete:0};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.SHOP_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function getRatedShopList(req,callback){
    console.log("$$$$$$$  GetRatedShopList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:18;
    var sorter = [['shop.point',-1]];

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {delete:0};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.SHOP_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function addShop(req,callback){
    console.log("$$$$$$$  AddShop $$$$$$");
    var branchId = 0;
    var params = (req.body.params) ? req.body.params : {};
    var shop = (params.shop)? params.shop:{};
    var shopId = params.shopId;
    if(params.shop) {
        var query = {shopId:shopId};
        daf.Count(query, CONSTANT.SHOP_BRANCH, function (err, count) {
            if (count) {
                console.log("$$$$$$$  Add Shop $$$$$$ Count : " + count);
                branchId = count;
                var doc = {
                    shopId: shopId,
                    branchId:branchId,
                    addDate: new Date(),
                    delete: 0,
                    shop:shop
                };
                daf.Insert(doc, CONSTANT.SHOP_BRANCH, function (err, success) {
                    console.log("^^^^^^^  Shop Added ^^^^^^^ : ");
                    callback(err, success);
                })
            } else {
                callback(err, count);
            }

        });
    }else{
        var err = "Shop details not available";
        callback(err);
    }
};

function removeShop(req,callback){
    console.log("$$$$$$$  UpdateItem $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = (params.shopId)? params.shopId:0;
    var query = {shopId:shopId};
    var changeDoc = { $set:{delete:1}};
    console.log("$$$$$$$  UpdateItem $$$$$$ : ");
    daf.Update(query,changeDoc,CONSTANT.SHOP_COLLECTION,function(err,success){
        callback(err , success);
    });
};

function updateShop(req,callback){
    console.log("$$$$$$$  UpdateItem $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = (params.shopId)? params.shopId:0;
    var query = {shopId:shopId};
    var shop = (params.shop)? params.shop : {};
    if(params.shop) {
        var doc = {shopId: itemID, date: new Date(), shop: shop, delete: 0};
        console.log("$$$$$$$  UpdateItem $$$$$$ : ");
        daf.Remove(query, CONSTANT.SHOP_COLLECTION, function () {
            daf.Insert(doc, CONSTANT.SHOP_COLLECTION, function (err, success) {
                callback(err, success);
            });
        });
    }else{
        var err = "Shop details not available";
        callback(err);
    }
};

function getShop(req,callback){
    console.log("$$$$$$$  GetShop $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = (params.shopId)? params.shopId:0;
    var query = {shopId:shopId, delete:0};

    console.log("$$$$$$$  UpdateItem $$$$$$ : ");
    daf.FindOne(query,CONSTANT.SHOP_COLLECTION,function(err,success){
        callback(err , success);
    });
};

function getNearestShopList(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var pos = params.pos;
    var query =  {$and:[{"pos" : {$near: pos}}]};
    var option = {};
    var data = [];
    var dbCon = daf.FindWithSorting(query,CONSTANT.SHOP_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function adminGetShopList(req,callback){
    console.log("$$$$$$$  adminGetShopList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:18;
    var sorter = params.sorter;

    var option = {skip:skip, limit:limit, sort:sorter};
    var query = {delete:0};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.SHOP_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function adminGetBranchList(req,callback){
    console.log("$$$$$$$  adminGetShopList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = (params.shopId)? params.shopId:0;

    var query = {shopId:shopId, delete:0};
    var data = [];
    var dbCon = daf.Find(query,CONSTANT.SHOP_BRANCH);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function adminGetUserList(req,callback){
    console.log("$$$$$$$  GetShop $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = (params.shopId)? params.shopId:0;
    var superAdmin = (params.superAdmin)? params.superAdmin:false;

    var query = {shopId:shopId, superAdmin:superAdmin};

    console.log("$$$$$$$  UpdateItem $$$$$$ : ");
    var data = [];
    var dbCon = daf.Find(query,CONSTANT.SHOP_USER);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function updateBranches(shopDetails,callback){
    var query = {shopId:shopDetails.shopId};
    var changeDoc = {$set:{shop: shopDetails}};

    daf.Upsert(query,changeDoc,CONSTANT.SHOP_BRANCH,function(err,success){
        callback(err,success)
    });
}

function getBannerImage(req,callback){
    console.log("$$$$$$$  Get Banner Image $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = params.shopId;
    var query = {shopId:shopId};

    daf.FindOne(query,CONSTANT.BANNER_IMAGE,function(err,success){
        callback(err , success);
    });
}


module.exports.GetShopList = getShopList;
module.exports.GetRatedShopList = getRatedShopList;
module.exports.AddShop = addShop;
module.exports.RemoveShop = removeShop;
module.exports.GetShop = getShop;
module.exports.GetNearestShopList = getNearestShopList;
module.exports.UpdateShop = updateShop;
module.exports.AdminGetShopList = adminGetShopList;
module.exports.AdminGetUserList = adminGetUserList;
module.exports.AdminGetBranchList = adminGetBranchList;
module.exports.UpdateBranches = updateBranches;
module.exports.GetBannerImage = getBannerImage;
