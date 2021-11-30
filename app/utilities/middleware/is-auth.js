const jwt = require('jsonwebtoken');

/**
      * @description Takes the header as req and verifies the token and returns true or false
      * @param {*} req
      */
module.exports = ({ req }) => {
    const token = req.headers.authorization || ''
    try {
        if (!token) {
            return req=false;
        }
            let decodedToken;   
            decodedToken=jwt.verify(token, process.env.JWT_SECRET)       
            return decodedToken;
        }
    
    catch (err) {
        return false;
    }
    
};