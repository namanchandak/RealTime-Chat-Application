/// socket io 

const io=require('socket.io')(8000)

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined' ,name1=>{
        console.log("new user", name1)
        users[socket.id]=name1;
        socket.broadcast.emit('user-joined', name1);
        

        ////////////////////////////////
        const presentUsers = getPresentUsers();
  socket.emit('present-users', presentUsers);

  // notify all other clients that a new user has joined the room
  socket.broadcast.emit('present-user', {
    id: socket.id,
    username: getUsername(socket),


    ///////////////////////////////////
  });

    })

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message : message, name1:users[socket.id]})
    })
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })

}  )
