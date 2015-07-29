/**
 * Created by Heshanr on 3/25/2015.
 */

var AuthCtrl = require('../controllers/authController');
var PasswordCtrl = require('../controllers/passwordController');

var authRoute = function(req,res,callback){
    var functionId = parseInt(req.body.functionId);
    console.log("++++++  AuthRoute +++++ functionId : "+ functionId);
    var resObject = {
        "resStatus": 0,
        "responData": {}
    };

    switch (functionId) {
        case 4000:
            console.log("%%%%%%%%%%%%%%%%% Auth 4000 %%%%%%%%%%%%%%%%%%%%");
            AuthCtrl.Login(req, function (err, data) {
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

        case 4001:
            console.log("%%%%%%%%%%%%%%%%% Auth 4001 %%%%%%%%%%%%%%%%%%%%");
            AuthCtrl.Register(req, function (err, data) {
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

        case 4002:
            console.log("%%%%%%%%%%%%%%%%% Auth 4002 %%%%%%%%%%%%%%%%%%%%");
            PasswordCtrl.PasswordReset(req, function (err, data) {
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

        case 4003:
            console.log("%%%%%%%%%%%%%%%%% Auth 3 %%%%%%%%%%%%%%%%%%%%");
            PasswordCtrl.ChangePassword(req, function (err, data) {
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

        case 4004:
            console.log("%%%%%%%%%%%%%%%%% Auth 4004 %%%%%%%%%%%%%%%%%%%%");
            PasswordCtrl.ForgotPassword(req, function (err, data) {
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

        case 4005:
            console.log("%%%%%%%%%%%%%%%%% Auth 4005 %%%%%%%%%%%%%%%%%%%%");
            PasswordCtrl.CheckHashId(req, function (err, data) {
                if (err) {
                    resObject.resStatus = 0;
                    resObject.responData.Error = err.toString();
                    res.status(500);
                    res.send(resObject);

                } else if (data) {
                    res.sendfile('./public/signup.html');
                }

            });
            break;

        default :
            callback();
            break;
    }

};
module.exports.AuthRoute = authRoute;