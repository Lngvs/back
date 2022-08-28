const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const session = require("express-session")
const http = require('http').createServer(app)
const router = require('./router/mainRouter')
const socketIo = require('socket.io') 
const { connected } = require('process')
const { on } = require('events')
const io = socketIo(http, { cors: { origin: 'http://localhost:3000' } })
http.listen(4000)
console.log('server started 4000port')
app.set('socketio', io)
mongoose.connect('mongodb+srv://testAdmin:langues96@cluster0.p0dut.mongodb.net/?retryWrites=true&w=majority').then(res => console.log('database on')).catch(e => console.log(e))
app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,HEAD,PATCH,POST,DELETE'
}))
app.use(express.json())
app.use(session({
    secret: 'sdfmewwsaeok@223261SadavsSAwpe',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
}))
app.use('/', router)
io.on('connect', socket => {
    console.log(socket.id)
})