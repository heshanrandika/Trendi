/**
 * Created by randika on 3/8/2015.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var PWD = require('../utility/GeneralFunctions');


function login(req,callback) {
    var params = (req.body.params) ? req.body.params : {};

    var Email   = (params.Email)?params.Email:'';
    var Password   = (params.Password)?params.Password:'';
    var userType = (params.userType)?params.userType: 0;

    var query = {'Email':Email};


    if(userType === CONSTANT.SHOP){

        daf.FindOne(query,CONSTANT.SHOP_COLLECTION,function(err, userArray){
            var user = userArray[0];
           if(err){
               callback(err, user);
               return;
           }else if(userArray.length){
               PWD.VerifyPassword(Password,user.Password,function(err, state){
                   if(err){
                       callback(err, state);
                   }else if(state){
                       PWD.GenerateSession(function(Session){
                           var changeDoc = {$set:{'Session':Session}};
                           daf.Update(query,changeDoc,CONSTANT.SHOP_COLLECTION,function(err, success){
                               if(success){
                                   user.Session = Session;
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
               callback(("Shop Not Available : "+ Email),null);
            }
        });
    }else if(userType === CONSTANT.USER){
        daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err, userArray){
            var user = userArray[0];
            if(err){
                callback(err, user);
                return;
            }else if(userArray.length){
                PWD.VerifyPassword(Password,user.Password,function(err, state){
                    if(err){
                        callback(err, state);
                    }else if(state){
                        PWD.GenerateSession(function(Session){
                            var changeDoc = {$set:{'Session':Session}};
                            daf.Update(query,changeDoc,CONSTANT.USER_COLLECTION,function(err, success){
                                if(success){
                                    user.Session = Session;
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
                callback(("User Not Available : "+ Email),null);
            }
        });
    }else{
        callback("User Type Error : "+ userType,null);
    }
}

function register(req,callback) {
    var params = (req.body.params) ? req.body.params : {};


    var userType = (params.userType)?params.userType: 0;
    var RegUser =  (params.RegUser)?params.RegUser: 0;

    var query = {'Email':RegUser.Email};
    var HashPWD = PWD.GetHashedPassword(RegUser.Password,CONSTANT.HASHING_ALGO);
    if(userType == CONSTANT.SHOP){
        daf.FindOne(query,CONSTANT.SHOP_COLLECTION,function(err, found){
            if(err){
                callback(err,null);
                return;
            }
            if(!found.length){
              //  var query = {'Name' : RegUser.Name, 'Email':RegUser.Email, 'Password':HashPWD, 'Session':'', 'Rating':'', 'pos':RegUser.pos};
                daf.Count('', CONSTANT.SHOP_COLLECTION, function (err, count) {
                    if (count) {
                        console.log("$$$$$$$  Add Shop $$$$$$ Count : " + count);
                        shopID = count;
                        var doc = {ShopID: shopID, Date: new Date(), Delete: 0, 'Name' : RegUser.Name, 'Email':RegUser.Email, 'Password':HashPWD, 'Shop':RegUser.Shop, 'Session':''};
                        daf.Insert(doc, CONSTANT.SHOP_COLLECTION, function (err, success) {
                            if(err){
                                callback(("Registration Failed :"+err),null);
                            }else {
                                console.log("^^^^^^^  Shop Added ^^^^^^^ : ");
                                var messageDoc = {Email: RegUser.Email, SENTITEM: [], NEWMESSAGE: [], INBOX: []};
                                daf.Insert(messageDoc, CONSTANT.MESSAGE, function (err, success) {
                                    console.log("^^^^^^^  Message Added ^^^^^^^ : ");
                                    callback(err,("Successfully Registered :"+success));
                                })
                            }
                        })
                    } else {
                        callback(err, count);
                    }

                });
            }else{
                callback(err,"Already Registered : Value : "+ RegUser.Email);
            }
        });
    }else if(userType == CONSTANT.USER){
        daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err,found){
            if(err){
                callback(err,null);
                return;
            }
            if(!found.length){
                var query = {'FirstName' : RegUser.FirstName, 'LastName' : RegUser.LastName, 'Dob':RegUser.DOB, 'Mobile':RegUser.Mobile, 'Email':RegUser.Email, 'Password':HashPWD, 'Session':'', 'watchList':[],'recentlyView':[]};
                daf.Insert(query,CONSTANT.USER_COLLECTION,function(err,success){
                    console.log("^^^^^^^  Shop Added ^^^^^^^ : ");
                    if(err){
                        callback(("Registration Failed :"+err),null);
                    }else{
                        var messageDoc = {Email:RegUser.Email,SENTITEM:[],NEWMESSAGE:[],INBOX:[]};
                        daf.Insert(messageDoc,CONSTANT.MESSAGE, function(err, success){
                            console.log("^^^^^^^  Message Added ^^^^^^^ : ");
                            callback(err,("Successfully Registered :"+success));
                        })
                    }
                });
            }else{
                callback(("Already Registered : Value : "+ RegUser.Email),null);
            }
        });
    }else{
        callback(("User Type Error : value : "+ userType),null);
    }

}

function authentication(req, callback) {
    var params = (req.body.params) ? req.body.params : {};

    var Email   = (params.Email)?params.Email:'';
    var Session  = (params.Session)?params.Session:'';
    var userType = (params.userType)?params.userType: 0;

    if(Email != '' && Session != ''){
        var query = {$and: [ { 'Email':Email}, { 'Session':Session} ]};
        console.log("^^^^^^^  Authentication ^^^^^^^ : ");
        if(userType == CONSTANT.SHOP){
            daf.FindOne(query,CONSTANT.SHOP_COLLECTION,function(err, user){
                if (err){
                    callback(err, null);

                }else if (user.length) {
                    callback(null, user);

                }else{
                    callback(("User: " + Email + " does not exist"), null);
                }

            });
        }else if (userType === CONSTANT.USER){
            daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err, user){
                if (err){
                    callback(err, null);

                }else if (user.length) {
                    callback(null, user);

                }else{
                    callback(("User: " + Email + " does not exist"), null);
                }
            });
        }else{
            callback("User Type Error",null);
        }
    }else{
        callback(CONSTANT.ERROR_INVALID_PARAMETER,null);
    }



}


module.exports.Login = login;
module.exports.Register = register;
module.exports.Authentication = authentication;