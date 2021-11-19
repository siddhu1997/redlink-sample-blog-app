var mysql = require("mysql")
const dbName = require("./env").dbName
const dbUser = require("./env").dbUser
const dbURL = require("./env").dbURL
const dbPassword = require("./env").dbPassword

var db = mysql.createPool({
    host: dbURL,
    database: dbName,
    user: dbUser,
    password: dbPassword
})

module.exports = {
    db
}