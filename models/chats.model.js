const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chat = Schema({
    type:{
        type:String,
         
    },
   
    sourceEmail:{
        type:String,
        required: true,
    },
    targetEmail:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required: true,
    },
    time:{
        type:String,
        required: true,
    },
     
});

module.exports = mongoose.model("Chat",Chat);