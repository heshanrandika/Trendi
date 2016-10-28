/**
 * Created by randika on 3/8/2015.
 */
var daf = require('../persistence/MongoPersistence');
var mdaf = require('../persistence/MessageMongoPersistence');
var CONSTANT = require('../utility/Constants');
var PWD = require('../utility/GeneralFunctions');
var SHOP = require('../controllers/shopController');
var UTIL = require('./utilController');
var _ = require('lodash');


function sendMessage(message, callback) {
    var toEmail = message.to.trim();
    var fromEmail = message.from.trim();
    mdaf.MInsert(message,toEmail,function(err , success){
        if(success){
            message.tag = 'SENT';
        }else{
            message.tag = 'DRAFTS';
        }
        message.read = true;
        mdaf.MInsert(message,fromEmail,function(err , success){
            callback(err , success);
        });

    });
}

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
                        callback("Incorrect password!", null);
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
    var userType = (params.regUser.userType)?params.regUser.userType: 0;
    var regUser =  (params.regUser)?params.regUser: 0;
    var query = {'email':regUser.email};
    var HashPWD = PWD.GetHashedPassword(regUser.password,CONSTANT.HASHING_ALGO);
    if(userType == CONSTANT.USER){
        daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err,found){

            if(!found) {
                UTIL.UpdateCount(CONSTANT.USER_COLLECTION, function (err, count) {
                    var query = {
                        'userType': CONSTANT.USER,
                        'name': regUser.name ? regUser.name : 'unknown',
                        'email': regUser.email,
                        'password': HashPWD,
                        'session': '',
                        'watchList': [],
                        'recentlyView': [],
                        'userId':count,
                        'image': regUser.image ? regUser.image : '',
                        'from': regUser.from ? regUser.from : ''

                    };
                    daf.Insert(query, CONSTANT.USER_COLLECTION, function (err, success) {
                        console.log("^^^^^^^  user registration ^^^^^^^ : ");
                        if (err) {
                            callback(("Registration Failed :" + err), null);
                        } else {
                            var messageDoc = {
                                id : new Date().getTime()+"",
                                from: adminMail,
                                to: regUser.email,
                                subject: "Confimation Message",
                                message : "<p>hi user,</p><p>This is a confirmation message from admin.</p><p>Admin</p>",
                                date : new Date(),
                                read : true,
                                tag : 'INBOX'
                            };
                            sendMessage(messageDoc, function (err, success) {
                                console.log("^^^^^^^  Message Added ^^^^^^^ : ");
                                callback(err, ("Successfully Registered :" + success));
                            })
                        }
                    });
                })
            }else if(regUser.from == 'f' || regUser.from == 'g'){
                var query = { 'email': regUser.email };
                var changeDoc = {$set:{'image': regUser.image ? regUser.image : '', 'name': regUser.name ? regUser.name : 'unknown'}};
                daf.Upsert(query,changeDoc,CONSTANT.USER_COLLECTION,function(err,success){
                    if(success){
                        callback(("Already Registered : Value : "+ regUser.email),null);
                    }else{
                        callback(err,success)
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
    var type = (req.body.params)? req.body.params.type : {};
    var query = {'type':type};
    daf.FindOne(query,CONSTANT.ENTITLEMENTS,function(err,entitlements){
        if(entitlements){
            callback(null, entitlements)
        }else{
            callback(("Shop user not found "),null);
        }
    });

}

function shopRegistration(req,callback) {
    var params = (req.body.params) ? req.body.params : {};

    var adminMail = (req.body.email)?req.body.email: 'trendi2015@gmail.com';
    var userType = (req.body.userType)?req.body.userType: 0;
    var regUser =  (params.regUser)?params.regUser: 0;
    var shop =  (params.shop)?params.shop: {};
    var shopId = 0;

    var query = {'email':regUser.email};
    var HashPWD = PWD.GetHashedPassword(regUser.password,CONSTANT.HASHING_ALGO);
    if(userType == CONSTANT.SHOP){
        daf.FindOne(query,CONSTANT.SHOP_USER,function(err, found){
            if(!found){
                UTIL.UpdateCount(CONSTANT.SHOP_COLLECTION, function (err, count) {
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
                            hotline:regUser.hotline,
                            mobile:regUser.mobile,
                            entitlements:regUser.entitlements,
                            superAdmin:true,
                            title:{value:10 , key:'Super Admin'}
                        };
                        var messageDoc = {
                                id :new Date().getTime()+"",
                                from: adminMail,
                                to: regUser.email,
                                subject: "Confimation Message",
                                message : "<p>hi user,</p><p>This is a confirmation message from admin.</p><p>Admin</p>",
                                date : new Date(),
                                read : true,
                                tag : 'INBOX'
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
                                                sendMessage(messageDoc, function (err, success) {
                                                    if(err){
                                                        callback(("Message Adding Failed :"+err),null);
                                                    }else{
                                                        callback(err,("Successfully Registered :"+success));
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
                    hotline:regUser.hotline,
                    mobile:regUser.mobile,
                    email:regUser.email,
                    session:'',
                    branch:branchDoc,
                    userType:userType,
                    entitlements:regUser.entitlements,
                    superAdmin:true,
                    title:regUser.title
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
                    superAdmin:false,
                    hotline: regUser.hotline,
                    mobile: regUser.mobile,
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
    if(req.body.userType == 1){
        callback(null, true);
    }else{
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
}




module.exports.Login = login;
module.exports.Register = register;
module.exports.Authentication = authentication;
module.exports.Authorization = authorization;
module.exports.AddShopUser = addShopUser;
module.exports.ShopRegistration = shopRegistration;
module.exports.GetEntitlements = getEntitlements;
module.exports.AdminUpdateShop = adminUpdateShop;