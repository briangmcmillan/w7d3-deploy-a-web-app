var inputField = document.getElementById('message')
inputField.addEventListener('keypress', enter)

// Pusher Setup
var pusher = new Pusher('6e5f67bde794d28881ed', {
  encrypted: true
})

var pusherChannel = pusher.subscribe('chat_app')

pusherChannel.bind('new_chat', function(chat) {
  addChatMessage(chat)
})

function enter(e){
  if(e.key === 'Enter'){
    runfetch(inputField.value)
    // console.log(inputField.value)
  }
}

  function runfetch(){
    var message = inputField.value
    inputField.value = ''
    fetch('/chats', {
      body: JSON.stringify({
        message: message
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
}

//This function is going to
  function addChatMessage(chat){
    var messages = document.getElementById("messages")
    var othersMessage = document.createElement("li")
    othersMessage.classList.add("list-group-item")
    othersMessage.innerHTML = chat.message
    messages.insertBefore(othersMessage, messages.childNodes[0])
  }
