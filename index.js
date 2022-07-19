const express = require("express")
const app = express()
const mongoose = require("mongoose")
//io 
const cors = require("cors")

var http=require("http");
var server = http.createServer(app);
var io = require("socket.io")(server);
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    //userCreateIndex: true,
    //userUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open",()=> {
    console.log("MongoDB connected")
});
const Port = process.env.Port || 7000;
const Port1 = process.env.Port || 6000;
app.route("/").get((req,res)=>res.json("API Kachouri"));
app.listen(Port, ()=>console.log(`server running on port ${Port}`));

//
app.use(express.json());
//app.use(cors());
var clients={};

io.on("connection",(socket)=>{
    console.log("Connected");
    console.log(socket.id,"has joined");
    socket.on("signin",(email)=>{
        console.log(email);
        clients[email]=socket;
        //console.log(clients);
    });
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetEmail=msg.targetEmail;
        if(clients[targetEmail])
        clients[targetEmail].emit("message",msg);
    });
});


server.listen(Port1,"0.0.0.0",()=>console.log(`server OI started  on port ${Port1}`)
 );
const userRoute = require("./routes/user");
app.use("/user",userRoute);

const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);

const chatRoute = require("./routes/chat");
app.use("/chat", chatRoute);

const appointmentRoute = require("./routes/appointment");
app.use("/appointment", appointmentRoute);

const rentRoute = require("./routes/rent");
app.use("/rent", rentRoute);

const houseRoute = require("./routes/house");
app.use("/house", houseRoute);


app.use("/uploads", express.static('uploads'));
app.use(express.json());

