/**
 * Created by Heshan on 11/8/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function addBrand(req,callback){
    console.log("$$$$$$$  Add Brand $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var brand = params.brand;
    var query = {name: brand.name};

    var changeDoc = {$set:{img: brand.img, description: brand.description}};

    daf.Upsert(query,changeDoc,CONSTANT.BRAND_COLLECTION,function(err,success){
        callback(err,success)
    });

};

function getBrandList(req,callback){
    console.log("$$$$$$$  Get Brand List $$$$$$");
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
    var dbCon = daf.FindWithPagination(query,CONSTANT.BRAND_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.BRAND_COLLECTION,function(err , count){
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


function removeBrand(req,callback){
    console.log("$$$$$$$  Remove Brand $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var brand = params.brand;
    var query = {name : brand.name};
    daf.Remove(query,CONSTANT.BRAND_COLLECTION,function(err , success){
        callback(err ,success);
    });

};


module.exports.AddBrand = addBrand;
module.exports.GetBrandList = getBrandList;
module.exports.RemoveBrand = removeBrand;
