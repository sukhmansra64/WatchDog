const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) => {
    //get token from header
    const token = req.header('token');

    //check if there is a token
    if (!token){
        return res.status(401).json({msg:'No token, not authorized'});
    }

    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'token is invalid'});
    }
}