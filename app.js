const { connected } = require('process')

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

// for connection
users = []
io.on('connection', (socket) => {
   // this will show how many users connected
   console.log(" user connected" )
    // this will set username
    socket.on('setUsername', (data) => {
       console.log('username:-',data)
       users.push(data)
        user = data
        socket.emit('userSet', {
            username: data
        })
    })

    socket.on('msg', (data) => {
        //Send message to everyone
        io.sockets.emit('newmsg', data)
    })
    
socket.on('disconnect', function(data) {
       console.log(" disconnected")
    })

})

http.listen(3000, () => {
    console.log('listening on localhost:3000')
})