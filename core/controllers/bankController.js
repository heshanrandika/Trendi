/**
 * Created by heshan on 11/14/2016.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function addBank(req,callback){
    console.log("$$$$$$$  Add Bank $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var bank = params.bank;
    var query = {name: bank.name};

    var changeDoc = {$set:{img: bank.img, description: bank.description}};

    daf.Upsert(query,changeDoc,CONSTANT.BANK_COLLECTION,function(err,success){
        callback(err,success)
    });

};

function getBankList(req,callback){
    console.log("$$$$$$$  Get Bank List $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var skip =(params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:500;
    var searchArray = params.searchArray;
    var option = {skip:skip, limit:limit};
    var query ={};

    if(searchArray && searchArray.length>0)
        _.each(searchArray,function(obj){
            query[obj.key] = obj.value;
        });

    var data = {list:[]};
    var dbCon = daf.FindWithPagination(query,CONSTANT.BANK_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.BANK_COLLECTION,function(err , count){
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


function removeBank(req,callback){
    console.log("$$$$$$$  Remove Bank $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var bank = params.bank;
    var query = {name : bank.name};
    daf.Remove(query,CONSTANT.BANK_COLLECTION,function(err , success){
        callback(err ,success);
    });

};


module.exports.AddBank = addBank;
module.exports.GetBankList = getBankList;
module.exports.RemoveBank = removeBank;
