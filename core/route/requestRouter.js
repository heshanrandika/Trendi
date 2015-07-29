/**
 * Created by Heshanr on 3/4/2015.
 */
var ITEM = require("../controllers/itemController");
var SHOP = require("../controllers/shopController");
var PROMOTION = require("../controllers/promotionController");
var PASSWORD = require("../controllers/passwordController");
var MESSAGE = require("../controllers/messageController");
var BLOG = require("../controllers/blogController");

var requestRoute = function(req,res){
    var functionId = parseInt(req.body.functionId);
    console.log("++++++  RequestRoute +++++ functionId : "+ functionId);
    var resObject = {
        "resStatus": 0,
        "responData": {}
    };

    switch (functionId) {
        case 1000:

            res.send(req.user);
            break;

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

        case 1003:

            ITEM.AddItems(req, function (err, data) {
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

        case 1006:

            ITEM.EditItems(req, function (err, data) {
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

        case 1007:

            ITEM.UpdateItem(req, function (err, data) {
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


        case 2003:

            SHOP.AddShop(req, function (err, data) {
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


        case 2005:

            SHOP.RemoveShop(req, function (err, data) {
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


        case 2006:

            SHOP.UpdateShop(req, function (err, data) {
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


        case 3002:

            PROMOTION.AddPromotion(req, function (err, data) {
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


        case 3003:

            PROMOTION.UpdatePromotion(req, function (err, data) {
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


        case 3004:

            PROMOTION.RemovePromotion(req, function (err, data) {
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

        case 4000:

            PASSWORD.SendMail(req, function (err, data) {
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

        case 5000:

            MESSAGE.GetMessageList(req, function (err, data) {
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

        case 5001:

            MESSAGE.SendMessage(req, function (err, data) {
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

        case 5002:

            MESSAGE.UpdateMessageBox(req, function (err, data) {
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

        case 6001:

            BLOG.GetBlog(req, function (err, data) {
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

        case 6002:

            BLOG.UpsertBlog(req, function (err, data) {
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

        case 6003:

            BLOG.RemoveBlog(req, function (err, data) {
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
            res.send("Route for requested function " + functionId + " not found");
            break;
    }

}

module.exports.RequestRoute = requestRoute;