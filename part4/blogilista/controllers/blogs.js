const blogsRouter = require("express").Router()
const { request } = require("../app")
const Blog = require("../models/blog")

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)} 
    catch (exception) {
      next(exception)
    }
})

blogsRouter.delete('/:id', async (request, respones, next) => {
  try {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  } catch (exception) {
    next (exception)
  }
})

blogsRouter.patch('/:id', async(request,response,next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,request.body,{new:true, runValidators:true})
    response.status(200).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter