const mysql = require('mysql2');
const config = require('../../../config.json');

const connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
}); 

async function createDatabase() {
    try {
        // Promisify connection.query
        const query = (sql) => {
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
        };
  
        // Promisify connection.changeUser
        const changeUser = (dbName) => {
            return new Promise((resolve, reject) => {
                connection.changeUser({database: dbName}, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        };

        const dbName = config.MYSQL_DATABASE;

        // Drop the database if it exists
        const dropDbQuery = `DROP DATABASE IF EXISTS \`${dbName}\``;
        await query(dropDbQuery);
        console.log(`Database '${dbName}' dropped if it existed.`);
        const createDbQuery = `CREATE DATABASE IF NOT EXISTS \`${dbName}\``;
  
        await query(createDbQuery);
        console.log(`Database '${dbName}' created or already exists.`);
  
        // Change to the newly created database
        await changeUser(dbName);
        console.log(`Using database '${dbName}'.`);
    
        // Create users table
        await query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                sub TEXT,
                email VARCHAR(250),
                name VARCHAR(250),
                picture TEXT,
                access VARCHAR(50),
                dateAdded DATETIME
            )
        `);
        console.log('tables created');
  
    } catch (error) {
        console.error('Error in createDatabase function:', error);
    } finally {
        // Close the connection after all operations are complete
        connection.end((err) => {
            if (err) {
                console.error('Error closing the connection:', err.stack);
            } else {
                console.log('Connection closed.');
            }
        });
    }
}

createDatabase();