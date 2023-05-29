const express = require('express');
const cors = require('cors');
const socket = require("socket.io")

const app = express();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

app.use(express.static("public"));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json(), express.urlencoded({ extended: true }));

require('./config/mongoose.config');

require('./routes/user.routes')(app);
require('./routes/post.routes')(app);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server run on port ${PORT}...`));
const server = app.listen(5000, () => console.log("Server up..."))

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

io.on("connection", socket => {
    socket.on("change_made", data => {
        socket.broadcast.emit("receive_new_change", data)
    })
})