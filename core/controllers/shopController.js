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

function addBranch(req,callback){
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
                    console.log("^^^^^^^  branch Added ^^^^^^^ : ");
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
    var query = {shopId:shopId,branchId:params.branchId};
    var changeDoc = { $set:{delete:1}};
    console.log("$$$$$$$  UpdateItem $$$$$$ : ");
    daf.Update(query,changeDoc,CONSTANT.SHOP_BRANCH,function(err,success){
        callback(err , success);
    });
};

function updateBranch(req,callback){
    console.log("$$$$$$$  UpdateItem $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = (params.shopId)? params.shopId:0;
    var query = {shopId:shopId,branchId:params.branchId};
    var shop = (params.shop)? params.shop : {};
    var changeDoc ={$set:{shop: shop}};
    if(params.shop) {
        console.log("$$$$$$$  Update Branch $$$$$$ : ");
            daf.Update(query,changeDoc, CONSTANT.SHOP_BRANCH, function (err, success) {
                callback(err, success);
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
    var shopId = params.shopId;

    if(shopId == "" || shopId == undefined){
        callback("ShopId not Available",null);
    }else{
        var skip =(params.skip)?params.skip:0;
        var limit  = (params.limit)?params.limit:18;
        var sorter = params.sorter;

        var option = {skip:skip, limit:limit, sort:sorter};

        var query = {shopId:shopId, delete:0};
        var data = [];
        var dbCon = daf.FindWithPagination(query,CONSTANT.SHOP_BRANCH,option);
        dbCon.on('data', function(doc){
            data.push(doc);
        });

        dbCon.on('end', function(){
            callback(null,data);
        });
    }

};

function adminGetUserList(req,callback){
    console.log("$$$$$$$  GetShop $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = params.shopId;
    var branchId = params.branchId;
    var superAdmin = params.superAdmin;
    var email = params.email;
    var notInMail = params.notInMail;

    var query = {};

    if(shopId != undefined) {
        query['shopId'] = shopId;
    }
    if(branchId != undefined){
        query['branch.branchId'] = branchId;
    }
    if(params.superAdmin != undefined){
        query['superAdmin'] = superAdmin;
    }
    if(params.email != undefined){
        query['email'] = email;
    }
    if(params.notInMail != undefined){
        query['email'] = { $nin: [ notInMail ] } ;
    }

    console.log("$$$$$$$  GET User List $$$$$$ : ");
    var data = [];
    var dbCon = daf.Find(query,CONSTANT.SHOP_USER);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function adminGetUser(req,callback){
    console.log("$$$$$$$  GetShop $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var shopId = (params.shopId)? params.shopId:0;
    var email = (params.email)? params.email:'';
    var query = {shopId:shopId, email:email};

    console.log("$$$$$$$  Get user detail $$$$$$ : ");
    var data = [];
    var dbCon = daf.Find(query,CONSTANT.SHOP_USER);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function updateShopUser(req,callback) {
    var params = (req.body.params) ? req.body.params : {};
    var regUser =  (params.regUser)?params.regUser: 0;
    var profileUpdate =  (params.profileUpdate)?params.profileUpdate: false;

    var query = {'email':regUser.email};
    if(profileUpdate){
        var changeDoc = {$set: {
            name: regUser.name,
            hotline: regUser.hotline,
            mobile: regUser.mobile,
            profilePic: regUser.profilePic
        }};
    }else{
        var changeDoc = {$set: {
            name: regUser.name,
            branch: regUser.branch,
            title: regUser.title,
            hotline: regUser.hotline,
            mobile: regUser.mobile,
            profilePic: regUser.profilePic,
            entitlements: regUser.entitlements
        }};
    }

        daf.Update(query,changeDoc, CONSTANT.SHOP_USER, function (err, success) {
            if(err){
                callback(("Failed to Update:"+err),null);
            }else {
                callback(err,("Successfully Updated :"+success));
            }
        })

}

function removeShopUser(req,callback) {
    var params = (req.body.params) ? req.body.params : {};
    var regUser =  (params.regUser)?params.regUser: 0;

    var query = {'email':regUser.email};
        daf.Remove(query, CONSTANT.SHOP_USER, function (err, success) {
            if(err){
                callback(("Failed to Remove :"+err),null);
            }else {
                callback(err,("Successfully Removed :"+success));
            }
        })

}

function updateBranches(shopDetails,callback){
    var query = {shopId:shopDetails.shopId};
    var changeDoc = {$set:{shop: shopDetails}};

    daf.Upsert(query,changeDoc,CONSTANT.SHOP_BRANCH,function(err,success){
        callback(err,success)
    });
}


function updateShopUsers(shopDetails){
    var query = {
        'branch.shopId':shopDetails.shopId, 
        'title.value':{ $lte: shopDetails.title.value}
    };
    var changeDoc = {$set:{shop: shopDetails}};

    var dbCon = daf.Find(query,CONSTANT.SHOP_USER);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
    daf.Upsert(query,changeDoc,CONSTANT.SHOP_BRANCH,function(err,success){
        callback(err,success)
    });
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
module.exports.AddBranch = addBranch;
module.exports.RemoveShop = removeShop;
module.exports.GetShop = getShop;
module.exports.GetNearestShopList = getNearestShopList;
module.exports.UpdateBranch = updateBranch;
module.exports.AdminGetShopList = adminGetShopList;
module.exports.AdminGetUserList = adminGetUserList;
module.exports.AdminGetBranchList = adminGetBranchList;
module.exports.UpdateBranches = updateBranches;
module.exports.GetBannerImage = getBannerImage;
module.exports.AdminGetUser = adminGetUser;
module.exports.UpdateShopUser = updateShopUser;
module.exports.RemoveShopUser = removeShopUser;
