/**
 * Created by Heshanr on 3/25/2015.
 */
function sendMail(user,callback) {
    console.log("KKKKKKKKKKKKKKKKKKKKKKK EMAIL IN");
    var nodemailer = require("nodemailer");
    var link = "http://trendi-meanwhile.rhcloud.com/forgotPassword/"+user.ForgotPassword;
    console.log("KKKKKKKKKKKKKKKKKKKKKKK EMAIL LInk:  "+ link);
    console.log("KKKKKKKKKKKKKKKKKKKKKKK EMAIL USER:  "+ user.Email);
    var Message = '<div>'+
        '<table align="center" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:500px;margin:auto">'+
        '<tbody><tr><td style="padding-top:20px"><div><a href="http://trendi-meanwhile.rhcloud.com" target="_blank">'+
        '<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="background:url(&#39;https://ci6.googleusercontent.com/proxy/-lzms8N9Cq6wHwkBOKygQW22Q5tORjeJzFE98c8-ym55daQf77NWhTZnvozwfx4gFni57Mf25Iw50fBVaG8whH1gBjanKQe7lFzxZRyuF_wAD495ZGJ8MWb2rs_kJSZAP0A=s0-d-e1-ft#https://d2h6m9ihko7kz3.cloudfront.net/images/emailers/header_spoon_black.png&#39;) center center;width:100%;height:70px;overflow:hidden">'+
        '<tbody> <tr> <td> </td> </tr> </tbody> </table></a></div> <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="background:white">'+
        '<tbody><tr><td><br><table width="100%" style="width:100%" border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr>'+
        '<td style="padding:10px 0 30px 0;text-align:center;width:80%;margin:auto"><h1 style="color:#2d2d2a;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;text-align:center;font-size:20px;width:80%;margin:auto">Hi '+ user.FirstName+'</h1><br>'+
        '<p style="color:#bd47cb;text-align:center;width:80%;margin:auto;font-size:16px;line-height:24px">Did you just make a request to reset your password? <br>Yes? Go right ahead.<a style="text-decoration:none"></a></p>'+
        '</td></tr><tr><td style="padding:10px 0 30px 0;text-align:center;width:80%;margin:auto"><a style="text-decoration:none;width:100%;display:inline-block" target="_blank" href='+link+'><span style="color:white;background:#e768ba;padding:15px 20px;font-weight:bold;font-size:14px;border-radius:3px">RESET MY PASSWORD</span></a>'+
        '</td> </tr><tr><td style="padding:10px 0 20px 0;text-align:center;width:80%;margin:auto"> <p style="color:#4d4d49;text-align:center;width:80%;margin:auto;font-size:16px;line-height:24px">If the big red button does not work, copy and paste the following link in your browser.<br><span style="font-size:12px;line-height:14px;display:block;padding-top:20px;padding-bottom:10px;color:#6a6a6d">'+link+'</span> </p>'+
        '</td></tr></tbody></table><table style="padding:0px 0 40px 0;width:80%;margin:auto" border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="color:#9d9d9a;text-align:center;font-size:13px;line-height:20px" align="center">For help, please email us at <a href="trendi2015@gmail.com" style="text-decoration:none" target="_blank"><span style="color:#4d4d4a">trendi2015@gmail.com</span>.'+
        '</a></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" align="center" style="margin:auto">'+
        '<tbody><tr><td style="color:#9a9a93;font-size:11px;padding-bottom:30px;text-align:center"><tr style="margin:auto;width:35px;text-align:center" align="center"><td><img src="./Password Reset Request - h.r.randika@gmail.com - Gmail_files/DHgFofluCjQ7--Y2gdGKojrkU3hRV-Z6I0ouR6K6yfldVhl6P5671CslNJt3iyE838I1kWUAXiWklf5x9F0YLah8RvwrhotPnobFvMFIWlqm8R07=s0-d-e1-ft" alt="" style="padding-top:20px" class="CToWUd"></td></tr>'+
        '</tbody></table></td></tr></tbody></table><div class="yj6qo"></div><div class="adL">'

    var generator = require('xoauth2').createXOAuth2Generator({
        user: "trendi2015@gmail.com", // Your gmail address.
        clientId: "387595319953-pv91tedcvc33c868kursqris777ter5e.apps.googleusercontent.com",
        clientSecret: "NCfqLKqyYLG1QLbEmOXuzKOl",
        refreshToken: "1/8_8VUQfS4RUzSEeA5kliS0_Z3a0FfQXdmLD5BKlLtpE"
    });


    generator.on('token', function(token){
        console.log('New token for %s: %s', token.user, token.accessToken);
    });


// login
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: generator
        }
    });


    var mailOptions = {
        to: user.Email,
        subject: 'Password Reset Request', // Subject line
       // text: 'Dear heshan, please click below link', // plaintext body
        html: Message // html body
    };


    smtpTransport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            callback(error ,"FAIL TO SEND MAIL");

        } else {
            console.log('Message sent: ' + info.response);
            callback(error ,'Message sent: ' + info.response);
        }
        smtpTransport.close();
    })
}

module.exports.Send = sendMail;