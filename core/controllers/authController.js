/**
 * Created by randika on 3/8/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var PWD = require('../utility/GeneralFunctions');
var _ = require('lodash');


function login(req,callback) {
    var params = (req.body.params) ? req.body.params : {};

    var email   = (params.email)?params.email:'';
    var password   = (params.password)?params.password:'';
    var userType = (params.userType)?params.userType: 0;

    var query = {'email':email};


    if(userType === CONSTANT.SHOP){

        daf.FindOne(query,CONSTANT.SHOP_COLLECTION,function(err, user){
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
                           daf.Update(query,changeDoc,CONSTANT.SHOP_COLLECTION,function(err, success){
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


    var userType = (params.userType)?params.userType: 0;
    var regUser =  (params.regUser)?params.regUser: 0;

    var query = {'email':regUser.email};
    var HashPWD = PWD.GetHashedPassword(regUser.password,CONSTANT.HASHING_ALGO);
    if(userType == CONSTANT.SHOP){
        daf.FindOne(query,CONSTANT.SHOP_USER,function(err, found){
            if(!found){
                daf.Count('', CONSTANT.SHOP_COLLECTION, function (err, count) {
                    if (count) {
                        console.log("$$$$$$$  Add Shop $$$$$$ Count : " + count);
                        shopId = count;
                        regUser.shop.shopId = shopId;
                        regUser.shop.regDate = new Date();
                        regUser.shop.shopEmail = regUser.email;

                        var branchDoc = {
                            shopId: shopId,
                            branchId:0,
                            addDate: new Date(),
                            delete: 0,
                            shop:regUser.shop
                        };

                        var userDoc = {
                            shopId: shopId,
                            name : regUser.name,
                            email:regUser.email,
                            password:HashPWD,
                            session:'',
                            branch:branchDoc,
                            userType:userType,
                            entitlements:regUser.entitlements,
                            superAdmin:true
                        };

                        daf.Insert(userDoc, CONSTANT.SHOP_USER, function (err, success) {
                            if(err){
                                callback(("Shop User Registration Failed :"+err),null);
                            }else {
                                daf.Insert(regUser.shop, CONSTANT.SHOP_COLLECTION, function (err, success) {
                                    if(err){
                                        callback(("Shop Registration Failed :"+err),null);
                                    }else {
                                        daf.Insert(branchDoc, CONSTANT.SHOP_BRANCH, function (err, success) {
                                            if(err){
                                                callback(("Branch Registration Failed :"+err),null);
                                            }else {
                                                console.log("^^^^^^^  Shop Added ^^^^^^^ : ");
                                                var messageDoc = {email: regUser.email, SENTITEM: [], NEWMESSAGE: [], INBOX: []};
                                                daf.Insert(messageDoc, CONSTANT.MESSAGE, function (err, success) {
                                                    console.log("^^^^^^^  Message Added ^^^^^^^ : ");
                                                    callback(err,("Successfully Registered :"+success));
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
    }else if(userType == CONSTANT.USER){
        daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err,found){

            if(!found){
                var query = {'userType':CONSTANT.USER , 'firstName' : regUser.firstName, 'lastName' : regUser.lastName, 'dob':regUser.dob, 'mobile':regUser.mobile, 'email':regUser.email, 'password':HashPWD, 'session':'', 'watchList':[],'recentlyView':[]};
                daf.Insert(query,CONSTANT.USER_COLLECTION,function(err,success){
                    console.log("^^^^^^^  Shop Added ^^^^^^^ : ");
                    if(err){
                        callback(("Registration Failed :"+err),null);
                    }else{
                        var messageDoc = {email:regUser.email,SENTITEM:[],NEWMESSAGE:[],INBOX:[]};
                        daf.Insert(messageDoc,CONSTANT.MESSAGE, function(err, success){
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




function addShopUser(req,callback) {
    var params = (req.body.params) ? req.body.params : {};


    var userType = (params.userType)?params.userType: 0;
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
                            entitlements:regUser.entitlements
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
            daf.FindOne(query,CONSTANT.SHOP_COLLECTION,function(err, user){
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
        if(authorized.expDate > new Date()){
            callback(null, true);
        }else{
            callback(CONSTANT.ERROR_FAIL_AUTHORIZATION_EXP_DATE, true);
        }

    }else{
        callback(CONSTANT.ERROR_NOT_AUTHORIZED,null);
    }
}

module.exports.Login = login;
module.exports.Register = register;
module.exports.Authentication = authentication;
module.exports.Authorization = authorization;
module.exports.AddShopUser = addShopUser;