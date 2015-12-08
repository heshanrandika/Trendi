/**
 * Created by randika on 3/8/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var PWD = require('../utility/GeneralFunctions');
var SHOP = require('../controllers/shopController');
var _ = require('lodash');


function login(req,callback) {
    var params = (req.body.params) ? req.body.params : {};

    var email   = (params.email)?params.email:'';
    var password   = (params.password)?params.password:'';
    var userType = (params.userType)?params.userType: 0;

    var query = {'email':email};


    if(userType === CONSTANT.SHOP){

        daf.FindOne(query,CONSTANT.SHOP_USER,function(err, user){
           if(err){
               callback("User Login Failed", user);
               return;
           }else if(user){
               PWD.VerifyPassword(password,user.password,function(err, state){
                   if(err){
                       callback(err, state);
                   }else if(state){
                       PWD.GenerateSession(function(session){
                           var changeDoc = {$set:{'session':session}};
                           daf.Update(query,changeDoc,CONSTANT.SHOP_USER,function(err, success){
                               if(success){
                                   user.session = session;
                                   callback(err, user);
                               }else{
                                   callback(err, null);
                               }
                           });
                       });

                   }else{
                       callback("User Login Failed", null);
                   }

               });

            }else{
               callback(("Shop Not Available : "+ email),null);
            }
        });
    }else if(userType === CONSTANT.USER){
        daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err, user){
            if(err){
                callback(err, user);
                return;
            }else if(user){
                PWD.VerifyPassword(password,user.password,function(err, state){
                    if(err){
                        callback(err, state);
                    }else if(state){
                        PWD.GenerateSession(function(session){
                            var changeDoc = {$set:{'session':session}};
                            daf.Update(query,changeDoc,CONSTANT.USER_COLLECTION,function(err, success){
                                if(success){
                                    user.session = session;
                                    callback(err, user);
                                }else{
                                    callback(err, null);
                                }
                            });
                        });

                    }else{
                        callback(err, state);
                    }

                });

            }else{
                callback(("User Not Available : "+ email),null);
            }
        });
    }else{
        callback("User Type Error : "+ userType,null);
    }
}

function register(req,callback) {
    var params = (req.body.params) ? req.body.params : {};
    var adminMail = (req.body.email)?req.body.email: 'trendi2015@gmail.com';
    var userType = (params.userType)?params.userType: 0;
    var regUser =  (params.regUser)?params.regUser: 0;
    var query = {'email':regUser.email};
    var HashPWD = PWD.GetHashedPassword(regUser.password,CONSTANT.HASHING_ALGO);
    if(userType == CONSTANT.USER){
        daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err,found){

            if(!found){
                var query = {'userType':CONSTANT.USER , 'firstName' : regUser.firstName, 'lastName' : regUser.lastName, 'dob':regUser.dob, 'mobile':regUser.mobile, 'email':regUser.email, 'password':HashPWD, 'session':'', 'watchList':[],'recentlyView':[]};
                daf.Insert(query,CONSTANT.USER_COLLECTION,function(err,success){
                    console.log("^^^^^^^  Shop Added ^^^^^^^ : ");
                    if(err){
                        callback(("Registration Failed :"+err),null);
                    }else{
                        var messageDoc = {
                            from:adminMail,
                            to: regUser.email,
                            subject: "Test Mail",
                            body: "Test mail from admin"
                        };
                        daf.MInsert(messageDoc,regUser.email, function(err, success){
                            console.log("^^^^^^^  Message Added ^^^^^^^ : ");
                            callback(err,("Successfully Registered :"+success));
                        })
                    }
                });
            }else{
                callback(("Already Registered : Value : "+ regUser.email),null);
            }
        });
    }else{
        callback(("User Type Error : value : "+ userType),null);
    }

}

function getEntitlements(req, callback){
    var email = (req.body.email)? req.body.email : {};
    var query = {'email':email};
    daf.FindOne(query,CONSTANT.SHOP_USER,function(err,user){
        if(user){
            callback(null, user.entitlements)
        }else{
            callback(("Shop user not found "+ email),null);
        }
    });

}

function shopRegistration(req,callback) {
    var params = (req.body.params) ? req.body.params : {};

    var adminMail = (req.body.email)?req.body.email: 'trendi2015@gmail.com';
    var userType = (req.body.userType)?req.body.userType: 0;
    var regUser =  (params.regUser)?params.regUser: 0;
    var shop =  (params.shop)?params.shop: {};
    var bannerImage =  (params.bannerImage)?params.bannerImage: '';

    var query = {'email':regUser.email};
    var HashPWD = PWD.GetHashedPassword(regUser.password,CONSTANT.HASHING_ALGO);
    if(userType == CONSTANT.SHOP){
        daf.FindOne(query,CONSTANT.SHOP_USER,function(err, found){
            if(!found){
                daf.Count('', CONSTANT.SHOP_COLLECTION, function (err, count) {
                    if (count) {
                        console.log("$$$$$$$  Add Shop $$$$$$ Count : " + count);
                        shopId = count;
                        shop.shopId = shopId;
                        shop.regDate = new Date();
                        shop.shopEmail = regUser.email;
                        shop.delete = 0;

                        var branchDoc = {
                            shopId: shopId,
                            branchId:0,
                            addDate: new Date(),
                            delete: 0,
                            shop:shop
                        };

                        var userDoc = {
                            shopId: shopId,
                            name : regUser.name,
                            email:regUser.email,
                            password:HashPWD,
                            profilePic:regUser.profilePic,
                            session:'',
                            branch:branchDoc,
                            userType:userType,
                            entitlements:regUser.entitlements,
                            superAdmin:true,
                            title:{value:10 , key:'Super Admin'}
                        };
                        var messageDoc = {
                            from:adminMail,
                            to: regUser.email,
                            subject: "Test Mail",
                            body: "Test mail from admin"
                        };

                        var bannerDoc = {
                            shopId: shopId,
                            image : bannerImage
                        };

                        daf.Insert(userDoc, CONSTANT.SHOP_USER, function (err, success) {
                            if(err){
                                callback(("Shop User Registration Failed :"+err),null);
                            }else {
                                daf.Insert(shop, CONSTANT.SHOP_COLLECTION, function (err, success) {
                                    if(err){
                                        callback(("Shop Registration Failed :"+err),null);
                                    }else {
                                        daf.Insert(branchDoc, CONSTANT.SHOP_BRANCH, function (err, success) {
                                            if(err){
                                                callback(("Branch Registration Failed :"+err),null);
                                            }else {
                                                console.log("^^^^^^^  Shop Added ^^^^^^^ : ");
                                                daf.MInsert(messageDoc, regUser.email, function (err, success) {
                                                    if(err){
                                                        callback(("Message Adding Failed :"+err),null);
                                                    }else{
                                                        daf.Insert(bannerDoc, CONSTANT.BANNER_IMAGE, function (err, success) {
                                                            if(err){
                                                                callback(err,("Banner Image Adding Failed :"+success));
                                                            }else{
                                                                callback(err,("Successfully Registered :"+success));
                                                            }
                                                        });

                                                    }

                                                })
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    } else {
                        callback(err, count);
                    }

                });
            }else{
                callback(err,"Already Registered : Value : "+ regUser.email);
            }
        });

    }else{
        callback(("User Type Error : value : "+ userType),null);
    }

}

function adminUpdateShop(req,callback) {
    var params = (req.body.params) ? req.body.params : {};


    var userType = (req.body.userType)?req.body.userType: 0;
    var regUser =  (params.regUser)?params.regUser: 0;
    var shop =  (params.shop)?params.shop: {};
    var bannerImage =  (params.bannerImage)?params.bannerImage: '';
    var query = {};
    var changeDoc = {};


    if(userType == CONSTANT.SHOP){
        query = {shopId : shop.shopId};
        changeDoc = shop;
        delete changeDoc._id;
        var branchDoc = {
            shopId: shop.shopId,
            branchId:0,
            addDate: new Date(),
            delete: 0,
            shop:shop
        };
        daf.Upsert(query,changeDoc,CONSTANT.SHOP_COLLECTION,function(err, success){
            if(err){
                callback(("Shop Collection Updating Failed :"+err),null);
            }else{
                query = {'email':regUser.email};
                changeDoc = {
                    shopId: shop.shopId,
                    name : regUser.name,
                    password:regUser.password,
                    profilePic:regUser.profilePic,
                    email:regUser.email,
                    session:'',
                    branch:branchDoc,
                    userType:userType,
                    entitlements:regUser.entitlements,
                    superAdmin:true
                };
                daf.Upsert(query,changeDoc,CONSTANT.SHOP_USER,function(err, success){
                    if(err){
                        callback(("Shop User Updating Failed :"+err),null);
                    }else{
                        query = {shopId : shop.shopId};
                        changeDoc = {shopId : shop.shopId, image : bannerImage};
                        daf.Upsert(query,changeDoc,CONSTANT.BANNER_IMAGE,function(err, success){
                            if(err){
                                callback(("Shop User Registration Failed :"+err),null);
                            }else{
                                SHOP.UpdateBranches(shop, function(err, success){
                                    if(err){
                                        callback(("Shop User Updating Failed :"+err), null);
                                    }else{
                                        callback(err,("Successfully Updated :"+success));
                                    }

                                });


                            }
                        })
                    }
                })
            }
        });

    }else{
        callback(("User Type Error : value : "+ userType),null);
    }

}

function addShopUser(req,callback) {
    var params = (req.body.params) ? req.body.params : {};


    var userType = (req.body.userType)?req.body.userType: 0;
    var regUser =  (params.regUser)?params.regUser: 0;

    var query = {'email':regUser.email};
    var HashPWD = PWD.GetHashedPassword(regUser.password,CONSTANT.HASHING_ALGO);
    if(userType == CONSTANT.SHOP){
        daf.FindOne(query,CONSTANT.SHOP_USER,function(err, found){
            if(!found){
                        var doc = {
                            shopId: regUser.shopId,
                            date: new Date(),
                            name : regUser.name,
                            email:regUser.email,
                            password:HashPWD,
                            branch:regUser.branch,
                            session:'',
                            userType:userType,
                            title:regUser.title,
                            entitlements:regUser.entitlements,
                            profilePic:regUser.profilePic,
                            superAdmin:false
                        };
                        daf.Insert(doc, CONSTANT.SHOP_USER, function (err, success) {
                            if(err){
                                callback(("Registration Failed :"+err),null);
                            }else {
                                callback(err,("Successfully Registered :"+success));
                            }
                        })



            }else{
                callback(err,"Already Registered : Value : "+ regUser.email);
            }
        });
    }else{
        callback(("User Type Error : value : "+ userType),null);
    }

}



function authentication(req, callback) {
   // var params = (req.body) ? req.body : {};

    var email   = (req.body.email)?req.body.email:'';
    var session  = (req.body.session)?req.body.session:'';
    var userType = (req.body.userType)?req.body.userType: 0;

    if(email != '' && session != ''){
        var query = {$and: [ { 'email':email}, { 'session':session} ]};
        console.log("^^^^^^^  Authentication ^^^^^^^ : ");
        if(userType == CONSTANT.SHOP){
            daf.FindOne(query,CONSTANT.SHOP_USER,function(err, user){
                if (err){
                    callback(err, null);

                }else if (user) {
                    callback(null, user);

                }else{
                    callback(("User: " + email + " does not exist"), null);
                }

            });
        }else if (userType === CONSTANT.USER){
            daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err, user){
                if (err){
                    callback(err, null);

                }else if (user) {
                    callback(null, user);

                }else{
                    callback(("User: " + email + " does not exist"), null);
                }
            });
        }else{
            callback("User Type Error",null);
        }
    }else{
        callback(CONSTANT.ERROR_INVALID_PARAMETER,null);
    }



}

function authorization(req, callback) {
    var entitlements =  req.user.entitlements;
    var functionId = parseInt(req.body.functionId);
    var authorized = _.filter(entitlements, { '_id': functionId});
    if(authorized.length > 0){
       // if(authorized.expDate > new Date()){
            callback(null, true);
       /* }else{
            callback(CONSTANT.ERROR_FAIL_AUTHORIZATION_EXP_DATE, true);
        }*/

    }else{
        callback(CONSTANT.ERROR_NOT_AUTHORIZED,null);
    }
}

module.exports.Login = login;
module.exports.Register = register;
module.exports.Authentication = authentication;
module.exports.Authorization = authorization;
module.exports.AddShopUser = addShopUser;
module.exports.ShopRegistration = shopRegistration;
module.exports.GetEntitlements = getEntitlements;
module.exports.AdminUpdateShop = adminUpdateShop;