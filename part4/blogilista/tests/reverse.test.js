const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
const listWithSixBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
  const listWithNoBlogs = []

  const listWithNegativeLikes = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: -7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }]
const listWithEqualAuthors = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Michael Chan",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }]

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test("when list has six blogs equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    assert.strictEqual(result, 36)
  })

  test("when list has no blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result,0)
  })

  test("when list has negative likes equal the likes of that", () => {
    const result = listHelper.totalLikes(listWithNegativeLikes)
    assert.strictEqual(result,-2)
  })
})



describe("favourite blog", () => {
    
  test("Favourite blog returns one with most likes", () => {
    const highestLikedBlog = listWithSixBlogs[2]
    const favouriteBlog = listHelper.favouriteBlog(listWithSixBlogs)
    assert.deepStrictEqual(highestLikedBlog,favouriteBlog)
  })

  test("list of blogs with negative likes returns one with most likes", () => {
    const highestLikedBlog = listWithNegativeLikes[1]
    const favouriteBlog = listHelper.favouriteBlog(listWithNegativeLikes)
    assert.deepStrictEqual(highestLikedBlog,favouriteBlog)
  })

})

describe("Favourite author", () => {

    test("Test mostBlogs returns author with most blogs", () => {
        const authorWithMostBlogs = "Robert C. Martin"
        const bestAuthor = listHelper.mostBlogs(listWithSixBlogs)
        assert.equal(authorWithMostBlogs,bestAuthor)
    })

    test("Test if mostBlogs returns if list is empty", () => {
      const bestAuthor = listHelper.mostBlogs([])
      assert.equal(bestAuthor,undefined)
    })

    test("Test if mostBlogs works with equal amount of authors", () => {
      const bestAuthor = listHelper.mostBlogs(listWithEqualAuthors)
      const authors = ["Michael Chan", "Edsger W. Dijkstra"]
      assert(authors.includes(bestAuthor))
    })
})

describe("Most likes", () => {

  test("Test if mostLikes returns most liked author out of six blogs", () => {
    const mostLikedAuthor = listHelper.mostLikes(listWithSixBlogs)
    const topAuthor = "Edsger W. Dijkstra"
    assert.strictEqual(topAuthor,mostLikedAuthor)
  })

  test("Test if mostLikes returns undefined with empty list", () => {
    const mostLikedAuthor = listHelper.mostLikes([])
    const topAuthor = undefined
    assert.strictEqual(topAuthor,mostLikedAuthor)
  })

  test("Test if mostLikes works with equal amount of authors", () => {
      const bestAuthor = listHelper.mostBlogs(listWithEqualAuthors)
      const authors = ["Michael Chan", "Edsger W. Dijkstra"]
      assert(authors.includes(bestAuthor))
    })
})