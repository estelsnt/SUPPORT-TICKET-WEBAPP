const {query} = require('../models/database');
const {generateToken} = require('../middleware/middleware');
const bcrypt = require('bcrypt');

async function generateHash(password) {
    try {
        const saltRounds = 10; // You can adjust the salt rounds for more or less security
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing the password:', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (err) {
        console.error('Error verifying the password:', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

async function manualLogin(email, password){
    try{
        // get password
        const find = await query(`
            SELECT * FROM users WHERE email = ? AND isDeleted = 0
        `, [email]);
        if(find.length > 0){  
            if(await verifyPassword(password, find[0].password)){
                const token = generateToken({
                    email: find[0].email,
                    name: find[0].name,
                    id: find[0].id,
                    picture: find[0].picture,
                    access: find[0].access
                });
                return {status: true, message: 'Login success', token: token};
            }
            return {status: false, message: 'Incorrect password. Please try agan.'};
        }
        return {status: false, message: 'Email address not found.'};
    }catch(err){
        console.error(error);
    }
}

async function login(userdata){
    try{
        // check if email is registered
        const isRegistered = await query(`
            SELECT * FROM users WHERE email = ?    
        `, [userdata.email]);
        let userid = undefined;
        let access = 'client';
        if(isRegistered.length === 0){
            // insert new user to database
            const result = await query(`
                INSERT INTO users (sub, email, name, picture, access, dateAdded)
                VALUES (?, ?, ?, ?, 'client', NOW())    
            `, [userdata.sub, userdata.email, userdata.name, userdata.picture]);
            userid = result.insertId;
        }else{
            // check if this user is deleted
            if(isRegistered[0].isDeleted === 1){
                return {status: false, message: 'Your account has been disabled.'};
            }
            // optionally update user info based on returned gmail oauth2 api data, in case when user is manually inserted.
            await query(`
                UPDATE users SET
                sub = ?,
                name = ?,
                picture = ?
                WHERE email = ?    
            `, [userdata.sub, userdata.name, userdata.picture, userdata.email]);
            userid = isRegistered[0].id;
            access = isRegistered[0].access;
        }
        // apply banned user check here
        const token = generateToken({...userdata, id: userid, access: access});
        return {status: true, token: token, user: {
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

async function getUserList(search = '', access){
    try{
        // retrieve first 50 rows
        const data = await query(`
            SELECT access, email, id, name, picture FROM users
            WHERE (name LIKE ?
            OR email LIKE ?)
            AND access = ?
            AND isDeleted = 0
            LIMIT 50
        `, [`%${search}%`, `%${search}%`, access]);
        // count all
        const count = await query(`
            SELECT COUNT(id) AS 'count' FROM users WHERE access = ? AND isDeleted = 0
        `, [access]);
        return {status: true, message: count[0].count, data: data};
    }catch(error){
        console.error(error);
    }
}

async function manualUserRegister(email, name, access, password){
    try{
        // check email duplicate
        const emailcheck = await query(`
            SELECT * FROM users WHERE email = ?    
        `, [email]);
        console.log(emailcheck.length);
        if(emailcheck.length > 0){
            return {status: false, message: 'Email already registered'}
        }
        const response = await query(`
            INSERT INTO users (
                email, password, name, picture, access, dateAdded
            ) VALUES (
                ?, ?, ?, 'https://cdn-icons-png.flaticon.com/512/456/456212.png', ?, NOW() 
            )
        `, [email, await generateHash(password), name, access]);
        return {status: response.affectedRows > 0, message: response.affectedRows > 0 ? 'New user added' : `Unable to add user`};
    }catch(error){
        console.error(error);  
    }
}

async function editUser(email, name, password, access) {
    try{
        let updated = 0;
        const response = await query(`
            UPDATE users SET name = ?, access = ? WHERE email = ?    
        `, [name, access, email]);
        updated += response.changedRows;
        if(password){
            const pup = await query(`
                UPDATE users SET password = ? WHERE email = ?
            `, [await generateHash(password), email]);
            updated += pup.changedRows;
        }
        return {status: updated > 0 ? true : false, message: updated > 0 ? 'User info updated' : 'No changes has been made'};
    }catch(error){
        console.error(error);
    }
}

async function disableUser(email){
    try{
        const response = await query(`UPDATE users SET isDeleted = 1 WHERE email = ?`, [email]);
        return {
            status: response.changedRows > 0 ? true : false, 
            message: response.changedRows > 0 ? 'User account disabled' : 'Unable to update user info, please try again later'
        };
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    generateHash,
    verifyPassword,
    login,
    getUserDataFromId,
    getUserList,
    manualUserRegister,
    manualLogin,
    editUser,
    disableUser
};