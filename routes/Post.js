const express = require("express")
const mysql = require("mysql")
const db = require("./../db-connection").db
const { notifyAuthors } = require('./../utils/mailer')

const router = new express.Router()

// TODO: Optimize code

// Get post by post Id
router.get("/post/:id", (req, res) => {
  const blogId = req.params.id
  console.log(`Fetching blog with id - ${blogId}`)
  let checkBlog =
    "SELECT * FROM blogs WHERE blog_id = ?"
  checkBlog = mysql.format(checkBlog, blogId)
  db.query(checkBlog, (err, result) => {
    if (!result[0]) {
      res.status(404).send("Post not found!")
    } else {
      res.status(200).send(result[0])
    }
  })
})

//Get all posts
router.get("/posts", (req, res) => {
  db.query("SELECT * FROM blogs", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Retrieving all blog posts!")
      res.send(result)
    }
  })
})

// Add a new post by author id
router.post("/post", (req, res) => {
  const authorId = req.body.blog_author
  if (!authorId) {
    res.status(400).send('Missing Author ID!')
  }
  let checkAuthor = "SELECT COUNT(*) as count from authors where author_id = ?"
  checkAuthor = mysql.format(checkAuthor, authorId)
  db.query(checkAuthor, (err, result) => {
    if (err) {
      res.status(500).send("Something went wrong while creating this post!")
    }
    if (result[0].count === 0) {
      res.status(404).send("Author not found!")
    } else {
      if (req.body.blog_title && req.body.blog_description) {
        let insertBlogQuery =
          "INSERT INTO blogs(blog_title, blog_description, blog_author) VALUES (?,?,?)"
        insertBlogQuery = mysql.format(insertBlogQuery, [
          req.body.blog_title,
          req.body.blog_description,
          req.body.blog_author,
        ])
        db.query(insertBlogQuery, (err, result) => {
          if (err) {
            res.status(500).send("Uh-oh! Something went wrong at our end!")
          } else {
            notifyAuthors(
              authorId,
              req.body.blog_title,
              req.body.blog_description
            );
            res.send("Blog published!")
          }
        })
      } else {
        res.status(400).send('Bad request! Title and Description should be present!')
      }
    }
  })
})

// Update a post
router.patch("/post/:id", (req, res) => {
  const blogId = req.params.id
  console.log(`Fetching blog with id - ${blogId}`)
  let checkBlog = "SELECT blog_id, blog_title, blog_description FROM blogs WHERE blog_id = ?"
  checkBlog = mysql.format(checkBlog, blogId)
  //Check if such blog exists
  db.query(checkBlog, (err, result) => {
    if (!result[0]) {
      res.status(404).send("Post not found!")
    } else {
      const blog_title = req.body.blog_title ? req.body.blog_title : result[0].blog_title
      const blog_description = req.body.blog_description ? req.body.blog_description : result[0].blog_description
      let updateBlogQuery = "UPDATE blogs SET blog_title = ?, blog_description = ? WHERE blog_id = ?"
      updateBlogQuery = mysql.format(updateBlogQuery, [blog_title, blog_description, blogId])
      db.query(updateBlogQuery, (err, updateResult) => {
        if (err) {
          res.status(500).send("Something went wrong during updation!")
        } else {
          res.status(204).send()
        }
      })
    }
  })
})

// Delete post
router.delete("/posts/:id", (req, res) => {
  const blogId = req.params.id
  console.log(`Fetching blog with id - ${blogId}`)
  let checkBlog = "SELECT COUNT(blog_id) as count FROM blogs WHERE blog_id = ?"
  checkBlog = mysql.format(checkBlog, blogId)
  //Check if such blog exists
  db.query(checkBlog, (err, checkBlogResult) => {
    if (err) {
      res.status(500).send("Something went wrong!")
    } else {
      if (checkBlogResult[0].count === 0) {
        res.status(404).send("Post not found!")
      } else {
        let deleteBlog = "DELETE FROM blogs WHERE blog_id = ?"
        deleteBlog = mysql.format(deleteBlog, blogId)
        db.query(deleteBlog, (err, deleteResult) => {
          if (err) {
            res.status(500).send("Something went wrong while deleting this post!")
          } else {
            res.status(204).send()
          }
        })
      }
    }
  })
})

module.exports = router