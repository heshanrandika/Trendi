/**
 * Created by Heshanr on 3/27/2015.
 */
var Crypto = require('crypto');
var CONSTANTS = require('../utility/Constants');

function generateSalt(){
    return  Crypto.randomBytes(5).toString('hex').substring(0, 10);
}
function generateHash(passwrod,salt, algorithm){
    var hashPassword ='';
    hashPassword += salt;
    hashPassword += CONSTANTS.PASSWORD_SEPARATOR;
    hashPassword += Crypto.createHmac(algorithm,salt).update(passwrod).digest('hex');
    return hashPassword;
}
function getHashedPassword(password,algorithm){
    return generateHash(password,generateSalt(),algorithm);
}
var verifyPassword = function(password,hashedPassword,callback){
    console.log('password PPPPPPPPPPP'+ hashedPassword);
    var split = hashedPassword.split(CONSTANTS.PASSWORD_SEPARATOR);
    if (generateHash(password, split[0], CONSTANTS.HASHING_ALGO) == hashedPassword){
        callback(null,true);
    }else{
        callback(null,false);
    }

};


function generateSession(callback){
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var session_id = Crypto.createHash('sha1').update(current_date + random).digest('hex');
    callback(session_id);
};

module.exports.GetHashedPassword = getHashedPassword;
module.exports.VerifyPassword = verifyPassword;
module.exports.GenerateSession = generateSession;