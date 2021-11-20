const _ = require('lodash')
const mailer = require('nodemailer')
const mysql = require('mysql')
const validator = require('email-validator')
const db = require('./../db-connection').db
const { mailService, mailUser, mailSecret } = require('../env')

const mailTransport = mailer.createTransport({
    service: mailService,
    auth: {
        user: mailUser,
        pass: mailSecret
    }
})

let mailingList = []

let mailTemplate = {
    from: mailUser,
    bcc: mailingList,
    subject: `Checkout this new blog `,
    text: "description"
}

let notifyAuthors = (authorId, blog_title, blog_description, mailDetails = mailTemplate) => {
  let fetchMailQuery = "SELECT email FROM authors WHERE author_id != ?";
  fetchMailQuery = mysql.format(fetchMailQuery, authorId);
  db.query(fetchMailQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      _.forEach(result, function (obj) {
        mailingList.push(obj.email);
      });
      mailingList = mailingList.filter((email) => {
        validator.validate(email);
      });
        if (mailingList.length) {
            mailTemplate.subject = `Checkout this new blog "${blog_title}"`;
            mailTemplate.text = blog_description 
            mailTransport.sendMail(mailTemplate, (error, data) => {
            if (error) {
                console.log("An error has occured!!!");
            } else {
                console.log("Authors have been notified about the blog!");
            }
            });
      }
    }
  });
};

module.exports = {
    notifyAuthors
}