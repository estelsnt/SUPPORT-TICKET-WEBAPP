const jwt = require('jsonwebtoken');
const config = require('../../../config.json');
const secretKey = config.SECRET_KEY;

function generateToken(user){
    const token = jwt.sign({user}, secretKey, {expiresIn: '30d'});
    return token;
}

function validateToken(req, res, next){
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({ message: 'Token is required' });
    }
    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
}

function checkJsonContentType(req, res, next) {
    if (req.is('application/json')) {
        try {
            // Try to parse the JSON body
            const body = JSON.parse(JSON.stringify(req.body)); // This is to ensure the body is valid JSON
            // Check if the body is an object and not empty
            if (body && Object.keys(body).length > 0) {
                next(); // Body is valid and not empty, proceed to the next middleware
            } else {
                // Body is empty
                res.status(400).json({ error: 'JSON body cannot be empty' });
            }
        } catch (error) {
            // Body is not valid JSON
            res.status(400).json({ error: 'Invalid JSON data' });
        }
    } else {
        // Content-Type is not application/json, send a 400 Bad Request response
        res.status(400).json({ error: 'Content-Type must be application/json' });
    }
}
  
module.exports = {
    checkJsonContentType,
    generateToken,
    validateToken
};