const socket = io('http://localhost:8000',{transports:['websocket']})
const form=document.getElementById('send-container')

const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio = new Audio('ting.mp3')

const append=(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position =='left')
    audio.play();
}

const name1=prompt("Enter your name to join  ");

if (name1 === null || name1.trim() === "") {
  location.reload();
}



const showUsersBtn = document.getElementById('show-users-btn');
const usersContainer = document.getElementById('users-container');

showUsersBtn.addEventListener('click', () => {
  // emit an event to request the list of connected users from the server
//   socket.emit('get-connected-users');
  socket.on('connected-users', (users) => {

    users.forEach((user) => {
      const userElement = document.createElement('div');
      
      
      append(`You: ${user} is here`, 'right')
    });
  });
});

socket.on('connected-users', (users) => {

  users.forEach((user) => {
    const userElement = document.createElement('div');
    
    
    append(`You: ${user} is here`, 'right')
  });
});

socket.emit('new-user-joined',  name1)




form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const message=messageInput.value;
    if(!message=="")
    {
        append(`You: ${message}`, 'right')
        socket.emit('send', message)
        messageInput.value=''
    }

})

socket.on('user-joined', name1=>{

    if(name1!=null)
    append(`${name1} joined the chat`, 'right')


})
socket.on('receive', data=>{

    append(`${data.name1}: ${data.message} ` , 'left')
})
socket.on('left', name1=>{

    if(name1!=null)
    append(`${name1}: left the chat`, 'left')
})
 