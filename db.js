const mysql = require('mysql')
const db = mysql.createConnection({
host: "database-1.ciiqyztsz12a.us-east-1.rds.amazonaws.com",
user: "admin",
password: "DbManage99",
database:"application_management_system",
port: 3306,
})

console.log("databse connected")
module.exports = db; 