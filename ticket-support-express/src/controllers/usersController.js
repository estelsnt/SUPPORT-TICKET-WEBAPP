const {query} = require('../models/database');

async function login(userdata){
    try{
        // check if email is registered
        const isRegistered = await query(`
            SELECT * FROM users WHERE email = ?    
        `, [userdata.email]);
        if(isRegistered.length === 0){
            console.log('register this user');
            // insert new user to database
            const insertNewUser = await query(`
                INSERT INTO users (sub, email, name, picture, access, dateAdded)
                VALUES (?, ?, ?, ?, 'client', NOW())    
            `, [userdata.sub, userdata.email, userdata.name, userdata.picture]);
            // issue token

        }else{
            // issue token

        }

        console.log(isRegistered);


    }catch(error){
        console.error(error);
    }
}

module.exports = {
    login
};