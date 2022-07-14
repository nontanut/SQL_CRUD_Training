const mysql = require("mysql");

// MySQL Connection
const connection = () => {
    const db = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME
    })
    
    db.connect((err) => {
        if (err) {
            console.log("Error connecting to MySQL database.");
        } else {
            console.log("MySQL database connected successfully!");
        }
    })
    return db;
}

module.exports = connection();