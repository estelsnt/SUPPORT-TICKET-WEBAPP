const express = require('express');
const {
    checkJsonContentType,
    validateToken
} = require('../middleware/middleware');

const route = express.Router();

route.post('/add', validateToken, checkJsonContentType, async (req, res)=>{

});

module.exports = route;