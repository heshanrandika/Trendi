/**
 * Created by randika on 4/6/2015.
 */

var ITEM = require("../controllers/itemController");
var SHOP = require("../controllers/shopController");
var PROMOTION = require("../controllers/promotionController");
var BLOG = require("../controllers/blogController");

var normalRequestRoute = function(req,res){
    var functionId = parseInt(req.body.functionId);
    console.log("++++++  RequestRoute +++++ functionId : "+ functionId);
    var resObject = {
        "resStatus": 0,
        "responData": {}
    };

    switch (functionId) {
        case 1001:

            ITEM.GetLatestItem(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1002:

            ITEM.GetMostTrendyItems(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1004:

            ITEM.GetSubItem(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1005:

            ITEM.GetRelatedItems(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1008:

            ITEM.GetCommonItemList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1009:

            ITEM.GetMainItemList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1012:

            ITEM.GetSearchItemList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1013:

            ITEM.GetItemCount(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 1014:

            ITEM.GetMainItem(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

         case 1015:

            ITEM.GetItemMenu(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 2000:

            SHOP.GetShopList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 2001:

            SHOP.GetRatedShopList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;


        case 2002:

            SHOP.GetNearestShopList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 2004:

            SHOP.GetShop(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;


        case 3000:

            PROMOTION.GetPromotionList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;


        case 3001:

            PROMOTION.GetRatedPromotionList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 3005:

            SHOP.GetPromotion(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;

        case 6000:

            BLOG.GetBlogList(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {

                    resObject.resStatus = 1;
                    resObject.responData.data = data;
                    res.send(resObject);

                }

            });
            break;



        default :

            res.status(500);
            res.send("Normal User Route for requested function " + functionId + " not found");
            break;
    }

}

module.exports.NormalRequestRoute = normalRequestRoute;