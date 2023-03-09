const socket = io('http://localhost:8000',{transports:['websocket']})
const form=document.getElementById('send-container')

const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

const append=(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

const name1=prompt("Enter your name to join  ");
socket.emit('new-user-joined',  name1)

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const message=messageInput.value;
     append(`You: ${message}`, 'right')
     socket.emit('send', message)
     messageInput.value=''
})

socket.on('user-joined', name1=>{

    append(`${name1} joined the chat`, 'right')
})
socket.on('receive', data=>{

    append(`${data.name1}: ${data.message} ` , 'left')
})
