const mysql = require('mysql2');
const config = require('../../../config.json');

// Create a connection pool
const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Adjust the limit based on your needs
    queueLimit: 0
});

// Promisify pool.query for async/await usage
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
        if (err) return reject(err);
            resolve(results);
        });
    });
}

// Testing the connection
async function testConnection() {
    try {
        await query('SELECT 1');
        console.log('Database connection is successful.');
        return true;
    } catch (error) {
        console.error('Database connection test failed:', error);
        return false;
    }
}

module.exports = {
    query,
    testConnection
};
