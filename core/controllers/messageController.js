/**
 * Created by Heshanr on 3/25/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function getMessageList(req,callback){
    console.log("$$$$$$$  GetMessageList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var email = params.email;
    var query = {email:email};
    daf.FindOne(query,CONSTANT.MESSAGE, function(err , dataList){
        callback(err ,dataList);
    });
};

function sendMessage(req,callback){
    console.log("$$$$$$$  Send Message $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var senderEmail = params.SenderEmail;
    var receiverEmail = params.email;
    var message = params.Message;
    var query = {email:senderEmail};
    var changeDoc = {$push:{'NEWMESSAGE':message}};

    daf.Update(query,changeDoc,CONSTANT.MESSAGE,function(err , success){
        query = {email:receiverEmail};
        changeDoc = {$push:{'SENTITEM':message}};

        daf.Update(query,changeDoc,CONSTANT.MESSAGE,function(err , success){
            callback(err , success);
        });
    });

};

function updateMessageBox(req,callback){
    console.log("$$$$$$$  Update MessageBox  $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var email = params.email;
    var NewMessageArray = params.NewMessageArray;
    var message = params.Message;

    var query = {email:email};
    var changeDoc = {$push:{'INBOX':message}};

    daf.Update(query,changeDoc,CONSTANT.MESSAGE,function(err , success){
        query = {email:email};
        changeDoc = {$set:{'NEWMESSAGE':NewMessageArray}};

        daf.Update(query,changeDoc,CONSTANT.MESSAGE,function(err , success){
            callback(err , success);
        });
    });

};

module.exports.GetMessageList = getMessageList;
module.exports.SendMessage = sendMessage;
module.exports.UpdateMessageBox = updateMessageBox;