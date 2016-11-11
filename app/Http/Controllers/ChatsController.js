'use strict'

const Pusher = require('pusher')
const Chat = use('App/Model/Chat')

class ChatsController {

  * index(request, response) {
    var chats = yield Chat.query().orderBy('id','desc')

    yield response.sendView('chats', {
      chats: chats
    })
  }

  // * create(request, response) {
  //   //
  // }

  * store(request, response) {
    var message = request.input('message')

    var pusher = new Pusher({
      appId: '131622',
      key: '6e5f67bde794d28881ed',
      secret: 'cc5ab615a7d0aa9056c4',
      encrypted: true
    })

    pusher.trigger('chat_app', 'new_chat', {
      message: message
    })

    // save the message to your Chat model here...
    var chat = new Chat()
    chat.message = message
    yield chat.save()
    response.json(true)
  }

  * show(request, response) {
    //
  }

  // * edit(request, response) {
  //   //
  // }
  //
  // * update(request, response) {
  //   //
  // }
  //
  // * destroy(request, response) {
  //   //
  // }

}

module.exports = ChatsController
