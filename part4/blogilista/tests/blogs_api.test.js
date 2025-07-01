const {test, after, beforeEach} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      title: 'newTitle Blog',
      author: 'jukkapoika',
      url: 'www.yotube.ccccom',
      likes: 22,
    },
    {
      title: 'blogglkaoshasdp',
      author: 'jakkupoika',
      url: 'www.facebook.asdf',
      likes: 332,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs returns correct amount of JSON blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs have id field not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach (blog => {
        assert.strictEqual(blog._id, undefined)
        assert(blog.id.length > 0)
    })
})

test('blogs can be added by POST to /api/blogs', async () => {
    
    let blogObject = new Blog({
      title: 'addedblog',
      author: 'newblogauthor',
      url: 'www.yotube.cccssscom',
      likes: 0,
    })

    blogObject.save()
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length+1)

})

test('blogs likes are set to 0 if none are given', async () => {
    
    let blogObject = new Blog({
      title: 'addedblog',
      author: 'newblogauthor',
      url: 'www.yotube.cccssscom',
    })

    const response = await blogObject.save()
    assert.strictEqual(response.likes, 0)

})

test('blog POST without title returns 400', async () => {
    
    const blog = {
      author: 'newblogauthor',
      url: 'www.yotube.cccssscom',
      likes: 0,
    }

    await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)

})

test('blog POST without url returns 400', async () => {
    
    const blog = {
      title: 'hahahaha',
      author: 'newblogauthor',
      likes: 0,
    }

    await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)

})

test('blogs can be deleted with correct id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    const firstId = response.body[0].id
    await api.delete(`/api/blogs/${firstId}`)
    const afterDeletion = await api.get('/api/blogs')
    const ids = afterDeletion.body.map(blog => blog.id)
    assert(!ids.includes(firstId))

})

test.only('blogs can be edited with correct id', async () => {
    const response = await api.get('/api/blogs')
    const firstId = response.body[0].id
    const updatedData = {title:"brandNewTitle"}

    await api.patch(`/api/blogs/${firstId}`)
            .send(updatedData)
            .expect(200)

    const afterUpdate = await api.get('/api/blogs')
    const updatedBlog = afterUpdate.body.find(blog => blog.id === firstId)
    
    assert.strictEqual(updatedBlog.title, updatedData.title)
    })

after(async () => {
    await mongoose.connection.close()
})