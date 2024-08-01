const express = require('express');
const {
    login
} = require('../controllers/usersController');
const {
    checkJsonContentType,
    validateToken
} = require('../middleware/middleware');

const route = express.Router();

route.post('/login', checkJsonContentType, async (req, res)=>{
    const data = req.body;
    const response = await login(data);
    res.json(response);
});

route.post('/verify', validateToken, async (req, res)=>{
    res.json({
        name: req.user.name,
        id: req.user.id,
        email: req.user.email,
        picture: req.user.picture,
        access: req.user.access
    });
});

module.exports = route;