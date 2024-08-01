const {query} = require('../models/database');
const {generateToken, validateToken} = require('../middleware/middleware');

async function login(userdata){
    try{
        // check if email is registered
        const [isRegistered] = await query(`
            SELECT * FROM users WHERE email = ?    
        `, [userdata.email]);
        let userid = undefined;
        let access = 'client';
        if(isRegistered.length === 0){
            console.log('register this user');
            // insert new user to database
            const [result] = await query(`
                INSERT INTO users (sub, email, name, picture, access, dateAdded)
                VALUES (?, ?, ?, ?, 'client', NOW())    
            `, [userdata.sub, userdata.email, userdata.name, userdata.picture]);
            userid = result.insertId;
        }else{
            userid = isRegistered.id;
            access = isRegistered.access;
        }
        // apply banned user check here
        const token = generateToken({...userdata, id: userid, access: access});
        return {token: token, user: {
            id: userid,
            name: userdata.name,
            email: userdata.email,
            picture: userdata.picture,
            access: access
        }};
    }catch(error){
        console.error(error);
    }
}

async function getUserDataFromId(id){
    try{
        const [data] = await query(`
            SELECT * FROM users WHERE id = ?
        `, [id]);
        console.log(data);
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    login,
    getUserDataFromId
};