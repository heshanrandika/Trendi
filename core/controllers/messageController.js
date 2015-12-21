/**
 * Created by Heshanr on 3/25/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function getMessageList(req,callback){
    console.log("$$$$$$$  GetMessageList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var email = req.body.email;
    var type = params.type;
    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var searchKey  = params.searchKey;
    var searchValue  = params.searchValue;
    var sorter = [['date',-1]];

    var query = {$or:[{'tag': type},{'REPLY': {$elemMatch: {tag:type}}}]};
    var data = [];
    var option = {skip:skip, limit:limit, sort:sorter};




    if(searchKey != '')
        query[searchKey] = searchValue;

    var data = {list:[]};
    var dbCon = daf.MFindWithPagination(query,email,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.MCount(query,email,function(err , count){
                if(count){
                    data.count = count;
                }
                callback(null,data);
            })
        }else{
            callback(null,data);
        }

    });


    /*    var dbCon = daf.MFindWithPagination(query,mail,option);
     dbCon.on('data', function(doc){
     data.push(doc);
     });

     dbCon.on('end', function(){
     callback(null,data);
     });*/
};

function getUnreadMessageList(req,callback){
    console.log("$$$$$$$  GetMessageList $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var email = req.body.email;
    var type = params.type;
    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var searchKey  = params.searchKey;
    var searchValue  = params.searchValue;
    var sorter = [['date',-1]];

    var query = {$or:[{'tag': type},{'REPLY': {$elemMatch: {tag:type, read:false}}}]};
    var data = [];
    var option = {skip:skip, limit:limit, sort:sorter};




    if(searchKey != '')
        query[searchKey] = searchValue;

    var data = {list:[]};
    var dbCon = daf.MFindWithPagination(query,email,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.MCount(query,email,function(err , count){
                if(count){
                    data.count = count;
                }
                callback(null,data);
            })
        }else{
            callback(null,data);
        }

    });

};

function sendMessage(req,callback){
    console.log("$$$$$$$  Send Message $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var fromEmail = req.body.email.trim();
    var message = params.message;
    var toEmail = message.to.trim();

    message.to = toEmail;
    message.from = fromEmail;
    message.id = new Date().getTime()+"";
    message.date = new Date();
    message.tag = 'INBOX';
    message.read = false;

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
    var toEmail = params.to;
    var query = {id:params.id};
    var changeDoc = {read : true};

    daf.MUpdate(query,changeDoc,toEmail,function(err , success){
        callback(err , success);
    });

};


function replyMessage(req,callback){
    console.log("$$$$$$$  Reply Message  $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var fromEmail = req.body.email.trim();

    var message = params.message;
    var toEmail = message.to.trim();
    var mainId =  message.replyId;

    message.to = toEmail;
    message.from = fromEmail;
    message.id = new Date().getTime()+"";
    message.date = new Date();
    message.tag = 'INBOX';
    message.read = false;


    var query = {id:mainId};
    var changeDoc = {$push:{'REPLY':message}};

    daf.MUpdate(query,changeDoc,toEmail,function(err , success){
        if(success){
            message.tag = 'SENT';
        }else{
            message.tag = 'DRAFTS';
        }
        daf.MUpdate(query,changeDoc,fromEmail,function(err , success){
            callback(err , success);
        });

    });

};


function retryMessage(req,callback){
    console.log("$$$$$$$  Reply Message  $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var toEmail = params.toEmail;
    var fromEmail = params.email;
    var message = params.Message;

    message.to = toEmail;
    message.from = fromEmail;
    message.tag = 'INBOX';
    message.read = false;

    var query = {id:params.id};
    var changeDoc = {$push:{'REPLY':message}};

    daf.MUpdate(query,changeDoc,toEmail,function(err , success){
        if(success){
            message.tag = 'SENT';
        }else{
            message.tag = 'DRAFTS';
        }
        query = {id:params.id};
        changeDoc = {$addToSet : {"REPLY" : {'id' : message.id , 'tag' : message.tag }} } ;
        daf.MUpdate(query,changeDoc,fromEmail,function(err , success){
            callback(err , success);
        });

    });

};

module.exports.GetMessageList = getMessageList;
module.exports.GetUnreadMessageList = getUnreadMessageList;
module.exports.SendMessage = sendMessage;
module.exports.UpdateMessage = updateMessage;
module.exports.ReplyMessage = replyMessage;