const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    },0) 

    return total
}

const favouriteBlog = (blogs) => {
    const mostLikedBlog = blogs.reduce((highest, blog) => {
        return highest.likes < blog.likes ? blog : highest 
    },blogs[0])
    return mostLikedBlog
}

const mostBlogs = (blogs) => {
    const mostFrequentAuthor = _.maxBy(Object.entries(_.countBy(blogs,blog => blog.author)),([author, frequency]) => frequency)?.[0]
    return mostFrequentAuthor ?? undefined
}

const mostLikes = (blogs) => {
    const totalLikes = (blogs) => blogs.reduce((sum, blog) => {
            return sum + blog.likes
        },0)
    
        const groupedAuthors = Object.entries(_.groupBy(blogs, blog => blog.author))
    
        const authorLikes = groupedAuthors.map(([author, authorBlogs]) => 
            [author, totalLikes(authorBlogs)])
    
        const mostLikedAuthor = _.maxBy(authorLikes, ([,totalLikes]) => totalLikes)?.[0]
        return mostLikedAuthor ?? undefined
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}