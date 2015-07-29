/**
 * Created by Heshanr on 3/23/2015.
 */
var EMAIL = require("../utility/Email");
var daf = require('../persistence/MongoPersistence');
var PWD = require('../utility/GeneralFunctions');
var CONSTANT = require('../utility/Constants');

function passwordReset(req,callback){
    console.log("$$$$$$$  GetLatestItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var oldPassword = params.OldPassword;
    var newPassword = PWD.GetHashedPassword(params.NewPassword,CONSTANT.HASHING_ALGO);
    var email = params.Email;

    var query = {Email:email};
    daf.FindOne(query,CONSTANT.USER_COLLECTION,function(err, userArray){
        var user = userArray[0];
        if(err){
            callback(err, user);
            return;
        }else if(userArray.length){
            PWD.VerifyPassword(oldPassword,user.Password,function(err, state){
                if(err){
                    callback(err, state);
                }else if(state){
                        var changeDoc = {$set:{'Password':newPassword}};
                        daf.Update(query,changeDoc,CONSTANT.USER_COLLECTION,function(err, success){
                            callback(err, success);
                        });
                }else{
                    callback("Incorrect Password", null);
                }
            });
        }else{
            callback(("User Not Available : "+ Email),null);
        }
    });
};

function forgotPassword(req,callback){
    console.log("$$$$$$$  GetLatestItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var Email = (params.Email)?params.Email:0;
    PWD.GenerateSession(function(hashId){
        var HashID = hashId;
        var query = {Email:Email};
        var changeDoc = {$set:{'ForgotPassword':HashID}};
        daf.Update(query,changeDoc,CONSTANT.USER_COLLECTION, function(err , success){
            console.log("GGGGGGGGGGGGGGGGGGGGG EMAIL UPDATE"+success);
            if(success){
                daf.FindOne(query,CONSTANT.USER_COLLECTION, function(err , user){
                    console.log("GGGGGGGGGGGGGGGGGGGGG EMAIL FIND"+user);
                    EMAIL.Send(user[0],function(err, success){
                        console.log("GGGGGGGGGGGGGGGGGGGGG EMAIL SEND"+success);
                        callback(err, success);
                    });
                });
            }



        });
    })

};

function changePassword(req,callback){
    console.log("$$$$$$$  Change Password $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var email = params.Email;
    var HashPWD = PWD.GetHashedPassword(params.NewPassword,CONSTANT.HASHING_ALGO);
    var query = {Email:email};
    var changeDoc = {Password : HashPWD}
    daf.Update(query,changeDoc,CONSTANT.USER_COLLECTION, function(err , success){
        callback(err, success);
    });
};

function checkHashId(req,callback){
    console.log("$$$$$$$  GetLatestItems $$$$$$");
    var HashId =  req.params.id;
    var query = {ForgotPassword:HashId};

    daf.FindOne(query,CONSTANT.USER_COLLECTION, function(err , user){
        if(err){
            callback(err,user);
        }else if(user.length){
            callback(err,user[0]);
        }else{
            callback("Hash ID not Available",null);
        }
    });
};


module.exports.PasswordReset = passwordReset;
module.exports.ForgotPassword = forgotPassword;
module.exports.ChangePassword = changePassword;
module.exports.CheckHashId = checkHashId;