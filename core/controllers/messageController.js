/**
 * Created by Heshanr on 3/25/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function getMessageList(req,callback){
    console.log("$$$$$$$  GetMessageList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var email = params.email;
    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var sorter = [['date',-1]];

    var query = {};
    var data = [];
    var option = {skip:skip, limit:limit, sort:sorter};

    var dbCon = daf.MFindWithPagination(query,mail,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function sendMessage(req,callback){
    console.log("$$$$$$$  Send Message $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var toEmail = params.toEmail;
    var fromEmail = params.email;
    var message = params.Message;

    message.to = toEmail;
    message.from = fromEmail;
    message.tag = 'INBOX';

    daf.MInsert(message,toEmail,function(err , success){
        if(success){
            message.tag = 'SENT';
        }else{
            message.tag = 'DRAFTS';
        }
        daf.MInsert(message,fromEmail,function(err , success){
                callback(err , success);
        });
        
    });

};
 //TODO
function updateMessage(req,callback){
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


function replyMessage(req,callback){
    console.log("$$$$$$$  Reply Message  $$$$$$");
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
module.exports.UpdateMessage = updateMessage;
module.exports.ReplyMessage = replyMessage;