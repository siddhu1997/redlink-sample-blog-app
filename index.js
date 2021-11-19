const express = require("express")
const postRouter = require("./routes/Post")
const authorRouter = require("./routes/Author")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(postRouter)
app.use(authorRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});
