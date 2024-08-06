const express = require('express');
const {
    login,
    manualUserRegister,
    getUserList,
    manualLogin,
    editUser
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

route.post('/login2', checkJsonContentType, async (req, res)=>{
    const data = req.body;
    const response = await manualLogin(data.email, data.password);
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

route.get('/:access',validateToken, async (req, res)=>{
    const access = req.params.access;
    const query = req.query.search;
    const response = await getUserList(query, access);
    res.send(response);
});

route.post('/add', validateToken, checkJsonContentType, async (req, res)=>{
    const data = req.body;
    const response = await manualUserRegister(data.email, data.name, data.access, data.password);
    res.json(response);
});

route.post('/edit', validateToken, checkJsonContentType, async (req, res)=>{
    const data = req.body;
    const response = await editUser(data.email, data.name, data.password, data.access);
    res.json(response);
});

module.exports = route;