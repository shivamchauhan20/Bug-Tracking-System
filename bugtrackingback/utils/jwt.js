const jwt = require('jsonwebtoken');
const jwtOperations = {
    PRIVATEKEY:'LOVEYOU3000',
    generateToken(userid){
        var token = jwt.sign({userid},this.PRIVATEKEY,{expiresIn:'1h'});
        return token;
    },
    verifyToken(clientTokenNumber){
        var decoded = jwt.verify(clientTokenNumber,this.PRIVATEKEY);
        if(decoded){
            console.log('Token Matched');
            return decoded.userid;
        }
        else{
            console.log('Invalid Token');
            return undefined;
        }
    }
} 
module.exports = jwtOperations;