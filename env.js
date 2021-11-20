const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  dbPassword: process.env.DATABASE_PASSWORD,
  dbURL: process.env.DATABASE_URL,
  dbUser: process.env.DATABASE_USER,
  dbName: process.env.DATABASE_NAME,
  mailUser: process.env.MAIL_USER,
  mailService: process.env.MAIL_SERVICE,
  mailSecret: process.env.MAIL_SECRET
}