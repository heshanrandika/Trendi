/**
 * Created by Heshan on 11/8/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function addColors(req,callback){
    console.log("$$$$$$$  Add Brand $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var colors = params.colors;
    var query = {id: 1};

    var changeDoc = {$set:{colors: colors}};

    daf.Upsert(query,changeDoc,CONSTANT.COLOR_COLLECTION,function(err,success){
        callback(err,success)
    });

};

function getColorList(req,callback){
    console.log("$$$$$$$  Get Color List $$$$$$");   
    var query ={};

    var data = [];
    daf.FindOne(query, CONSTANT.COLOR_COLLECTION,function(err , colors){
        callback(err ,colors);
    });
};




module.exports.AddColors = addColors;
module.exports.GetColorList = getColorList;