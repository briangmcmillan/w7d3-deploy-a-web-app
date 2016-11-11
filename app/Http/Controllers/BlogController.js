'use strict'

//Import Model in so you can use it
const Post = use('App/Model/Post')

class BlogController {

  * index(request, response) {
    var allPosts = yield Post.query().select('*').orderBy('id', 'desc')

    yield response.sendView('posts', {
      posts: allPosts
    })
  }

  * create(request, response) {
      yield response.sendView('create')
    //
  }

  * store(request, response) {
    var post = new Post()
    post.author = request.input('author')
    post.headline = request.input('headline')
    post.body = request.input('body')

    yield post.save()

    response.redirect('/blog')
  }

  * show(request, response) {
    var singlePost = yield Post.find(request.param('id'))

    yield response.sendView('post', {
      post: singlePost
    })
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = BlogController
