/**
 * Created by heshan on 11/27/2016.
 */
var daf = require('../persistence/MongoPersistence');
var CONSTANT = require('../utility/Constants');
var UTIL = require('./utilController');
var _ = require('lodash');


function getLatestAlbums(req,callback){
    console.log("$$$$$$$  GetLatestItems $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;

    var sorter = [['item.trend',-1],['date',-1]];
    var shopId = params.shopId;


    var option = {skip:skip, limit:limit, sort:sorter};
    var query = "";
    if(!(shopId == '' || undefined == shopId))
        query= {'shop.shopId': parseInt(shopId)};
    var data = [];
    var dbCon = daf.FindWithPagination(query,CONSTANT.ALBUM_COLLECTION,option);
    dbCon.on('data', function(doc){
        req.body.params['album'] = doc; //need to check whether it assigning only last item
        getAlbumItemList(req,function(error, data){
            if(data && data.length>0){
                doc['itemDetails'] = data;
                data.push(doc);
            }
        })
    });

    dbCon.on('end', function(){
        callback(null,data);
    });
};

function getAlbumItemList(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var album = (params.album)? params.album:{};
    var query = { _id : { $in : album.itemList } };

    var data=[];
    var dbCon = daf.FindWithPagination(query,CONSTANT.MAIN_ITEM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.push(doc);
    });

    dbCon.on('end', function(){
        callback(null,data);
    });

};

function adminGetAlbumList(req,callback){
    console.log("$$$$$$$  Get Items by Shop $$$$$$");
    var params = (req.body.params) ? req.body.params : {};

    var skip   = (params.skip)?params.skip:0;
    var limit  = (params.limit)?params.limit:16;
    var shopId  = params.shopId;
    var branchId  = params.branchId;
    var searchKey  = params.searchKey;
    var searchValue  = params.searchValue;
    var searchArray = params.searchArray;
    var sorter = [['date',-1]];

    var title = req.user.title.value;
    var query = {};
    switch (title){
        case 20:
            query = {};
            break;

        case 10:
            query = {'shop.shopId' : shopId};
            break;

        default :
            query = {$and:[{'shop.shopId' : shopId},{'shop.branchId' : branchId}]};
            break;
    }

    var option = {skip:skip, limit:limit, sort:sorter};

    if(searchKey != '')
        query[searchKey] = searchValue;
    if(searchArray && searchArray.length>0)
        _.each(searchArray,function(obj){
            query[obj.key] = obj.value;
        });

    var data = {list:[]};
    var dbCon = daf.FindWithPagination(query,CONSTANT.ALBUM_COLLECTION,option);
    dbCon.on('data', function(doc){
        data.list.push(doc);
    });

    dbCon.on('end', function(){
        if(skip == 0){
            daf.Count(query,CONSTANT.ALBUM_COLLECTION,function(err , count){
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

function adminUpdateAlbum(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var album = (params.album)? params.album:{};

    var query = {'albumId':album.albumId};
    var changeDoc = {$set:{name: album.name, description: album.description, itemList:album.itemList}};
    console.log("$$$$$$$  Admin Update Album$$$$$$ : ");

    daf.Update(query,changeDoc,CONSTANT.ALBUM_COLLECTION,function(err,success){
        callback(err,success)
    });

};

function itemRemoveFromAlbum(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var album = (params.album)? params.album:{};
    var itemId = (params.itemId)? params.itemId:0;
    var query = {'_id': itemId};
    var changeDoc = {$set:{ albumId:''}};
    console.log("$$$$$$$  Remove item from Album  $$$$$$ : ");

    daf.Update(query, changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){
        if(success)
            adminUpdateAlbum(req,callback);
        callback(err, success);
    });

};

function itemAddToAlbum(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var album = (params.album)? params.album:{};
    var itemId = (params.itemId)? params.itemId:0;
    var query = {'_id': itemId};
    var changeDoc = {$set:{ albumId: album.albumId}};
    console.log("$$$$$$$  Add item to Album  $$$$$$ : ");

    daf.Update(query, changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){
        if(success)
            adminUpdateAlbum(req,callback);
        callback(err, success);
    });

};

function removeAlbum(req,callback){
    var params = (req.body.params) ? req.body.params : {};
    var album = (params.album)? params.album:{};
    var query = {'albumId':album.albumId};
    console.log("$$$$$$$  Remove Album  $$$$$$ : ");

    _.each(album.itemList,function(obj){
        var subQuery = {'_id': obj};
        var changeDoc = {$set:{ albumId:''}};
        daf.Update(subQuery, changeDoc,CONSTANT.MAIN_ITEM_COLLECTION,function(err,success){});
    });

    daf.Remove(query,CONSTANT.ALBUM_COLLECTION,function(err,success){
        callback(err, success);
    });

};

function addAlbum(req,callback) {
    console.log("$$$$$$$  Add Album $$$$$$");

    var albumId = 'ALB';
    var params = (req.body.params) ? req.body.params : {};
    var album = (params.album) ? params.album : {};
    if(params.album){
        UTIL.UpdateCount(CONSTANT.ALBUM_COLLECTION, function (err, count) {
            if (count) {
                console.log("$$$$$$$  Add Album $$$$$$ Count : " + count);
                albumId = albumId+count;
                album['albumId'] = albumId;
                album['date'] = new Date();
                album['searchText'] = "";
                _.each(album.types,function(val){
                    album['searchText'] += (val.key+" ");
                });
                if(album.brand){
                    album['searchText'] += (album.brand.name+" ");
                }
                album['searchText'] += (album.name+" ");

                daf.Insert(doc, CONSTANT.ALBUM_COLLECTION, function (err, success) {
                    console.log("^^^^^^^  Add Album ^^^^^^^ : ");
                    callback(err, success);
                })
            } else {
                callback(err, null);
            }

        });

    }else{
        var err = "Album details not available";
        callback(err);
    }
};

module.exports.GetLatestAlbums = getLatestAlbums;
module.exports.GetAlbumItemList = getAlbumItemList;
module.exports.AdminGetAlbumList = adminGetAlbumList;
module.exports.AdminUpdateAlbum = adminUpdateAlbum;
module.exports.ItemRemoveFromAlbum = itemRemoveFromAlbum;
module.exports.ItemAddToAlbum = itemAddToAlbum;
module.exports.RemoveAlbum = removeAlbum;
module.exports.AddAlbum = addAlbum;