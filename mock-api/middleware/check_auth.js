const jwt = require("jsonwebtoken");
const user_schema = require('../schemas/user_schema');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verified = jwt.verify(token, "secret");
        req.userData = verified;
        next();
    }
    catch (error){
        return res.status(401).json({
            message: "Authorization failed"
        });
    }
}