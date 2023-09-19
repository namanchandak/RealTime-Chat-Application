/// socket io 

const io=require('socket.io')(process.env.PORT || 8000)

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined' ,name1=>{
        console.log("new user", name1)
        users[socket.id]=name1;
        socket.broadcast.emit('user-joined', name1);

        io.emit('connected-users', Object.values(users));

    
    // broadcast that the user has left to all other clients
    

    })

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message : message, name1:users[socket.id]})
    })
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })

}  )
