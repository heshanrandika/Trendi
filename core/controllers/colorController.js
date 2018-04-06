/**
 * Created by Heshan on 11/8/2015.
 */

var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');

function addColors(req,callback){
    console.log("$$$$$$$  Add Brand $$$$$$");
    var params = (req.body.params) ? req.body.params : {};
    var colorsarray = params.colors;
    var query = {name: 'x'};

    var changeDoc = {$set:{colors: colorsarray}};
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