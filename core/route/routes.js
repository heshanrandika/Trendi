var authCtrl = require('../controllers/authController');
var RequestRouter = require('../route/requestRouter');
var AuthRouter = require('../route/authRouter');
var NormalUser = require('../route/normalUser');
var CryptoJS = require("crypto-js");



module.exports = function(app) {
    var decrypt = function(encrypted){
        if(encrypted != undefined){
            var decrypted = CryptoJS.TripleDES.decrypt(encrypted, "dsgfbdusiduigdfgndsgyufigyfldg");
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        }else{
            return undefined;
        }

    };


    app.get('/forgotPassword/:id', function(req, res) {
        req.body.functionId = 4005;
        AuthRouter.AuthRoute(req, res);

        // load the single view file (angular will handle the page changes on the front-end)

       // res.send('user' + req.params.id);

    });
    app.use(function(req, res, next){
        req.body = decrypt(req.body.enc);
        if(req.method =='GET'){
			console.log('++++++++++++======================='+req.path);
			if(req.path == '/admin/'){
                res.render('adminIndex', {});// load the single view file (angular will handle the page changes on the front-end)
            }else if(req.path == '/'){
                res.render('index', {});// load the single view file (angular will handle the page changes on the front-end)
            }else{
                res.status(404);
                res.send("Page requested is not available!!!");
            }

        }

        if (req.method === 'POST') {
            AuthRouter.AuthRoute(req, res, function(response){
                if(!response){
                    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX Auth CTRL Return XXXXXXXXXXXXXXXXXX");
                    next();
                }
            });

        }
    });

    app.use(function(req, res, next){
        authCtrl.Authentication(req, function(err, userObj){
            if(err){
                var email   = (req.body.email)?req.body.email:'';
                if(email == ''){
                    NormalUser.NormalRequestRoute(req, res);
                }else{
                    var resObject = {
                        "resStatus": 0,
                        "responData": {}
                    };
                    resObject.responData.Error = err.toString();
                    console.log("Error occurred while authentication ");
                    res.status(500);
                    res.send(resObject);
                }


            }else if(userObj){
                req.user = userObj;
                next();

            }

        });

    });


    app.use(function(req, res, next){
        authCtrl.Authorization(req, function(err, authorized){
            if(err){
                var resObject = {
                    "resStatus": 0,
                    "responData": {}
                };
                resObject.responData.Error = err.toString();
                console.log("Error occurred while authorization ");
                res.status(500);
                res.send(resObject);



            }else if(authorized){
                next();

            }

        });

    });


    app.use(function(req, res, next){
        RequestRouter.RequestRoute(req, res);

    });




};