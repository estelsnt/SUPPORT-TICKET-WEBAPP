const express = require('express');
const {
    login,
    manualUserRegister,
    getUserList,
    manualLogin,
    editUser,
    disableUser
} = require('../controllers/usersController');
const {
    checkJsonContentType,
    validateToken
} = require('../middleware/middleware');

const route = express.Router(); 

// login from google OAuth2 (will return jwt)
route.post('/login', checkJsonContentType, async (req, res)=>{
    const data = req.body;
    const response = await login(data);
    res.json(response);
});

// manually login from landing page (will just show status if login success)
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

route.post('/disable', validateToken, checkJsonContentType, async (req, res)=>{
    const data = req.body;
    const response = await disableUser(data.email);
    res.json(response);
});

module.exports = route;