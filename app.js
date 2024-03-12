const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
// const notesRouter = require('./controllers/notes')
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
const mongoose = require('mongoose')

// mongoose.set('strictQuery', false)

// logger.info('connecting to', config.MONGODB_URI)

// mongoose.connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.error('error connection to MongoDB:', error.message)
//   })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
// app.use(express.static('dist))
app.use(express.json())
// app.use(middleware.requestLogger)

// app.use('api/notes', notesRouter)

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.json(result)
    })
})

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app