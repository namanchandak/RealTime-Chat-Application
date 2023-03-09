/// socket io 

const io=require('socket.io')(8000)

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined' ,name1=>{
        console.log("new user", name1)
        users[socket.id]=name1;
        socket.broadcast.emit('user-joined', name1);

    })

    socket.on('send', message=>{
        scoket.broadcast.emit('receive', {message : message, name1:users[socket.id]})
    })
}  )
