const jwt = require('jsonwebtoken');
class GetToken {
    
    
    getToken = (details) => {
        const token = jwt.sign({
            id: details._id,
            email: process.env.USER_MAIL
        }, process.env.JWT_SECRET)
        return token;
    }
}
module.exports=new GetToken();