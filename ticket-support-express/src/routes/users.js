const express = require('express');
const {
    login
} = require('../controllers/usersController');
const {
    checkJsonContentType
} = require('../middleware/middleware');

const route = express.Router();

route.post('/login', checkJsonContentType, async (req, res)=>{
    const data = req.body;
    console.log(data);
    const response = await login(data);
    res.json(response);
});

module.exports = route;