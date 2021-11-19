const express = require("express")
const mysql = require("mysql")
const db = require("./../db-connection").db

const router = express.Router()

router.get("/author/:id/posts", (req, res) => {
    let checkAuthorExists = "SELECT COUNT(author_id) as count FROM authors WHERE author_id = ?"
    const authorId = req.params.id
    checkAuthorExists = mysql.format(checkAuthorExists, authorId)
    db.query(checkAuthorExists, (err, authorExistResult) => {
        if (err) {
            res.status(500).send("Something went wrong!")
        } else {
            if (authorExistResult[0].count === 0) {
                res.status(404).send("Author not found!")
            } else {
                let checkAuthorPosts =
                  "SELECT * FROM blogs where blog_author = ?"
                checkAuthorPosts = mysql.format(checkAuthorPosts, authorId)
                db.query(checkAuthorPosts, (err, result) => {
                  if (err) {
                    res.status(500).send("Something went wrong while fetching your post")
                  } else {
                    if (!result[0]) {
                      res.status(404).send("Author does'nt have any posts yet")
                    } else {
                      res.send(result)
                    }
                  }
                })
            }
        }
    })
})

module.exports = router