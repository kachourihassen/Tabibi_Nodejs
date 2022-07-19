const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const House = Schema({
    patient:{
        type:String,
        required: true,
    },
    doctor:{
        type:String,
        required: true,
    },
    date:{
        type:String,
        required: true,
    },
    time:{
        type:Number,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    address_x:{
        type: String,
        default: "",
    },
    address_y:{
        type: String,
        default: "",
    },
    type:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    bedRooms:{
        type:Number ,
        required: true,
    },
    bathRooms:{
        type:Number ,
        required: true,
    },
    garages:{
        type:Number,
        required: true,
    },
    sqFeet:{
        type:Number,
        required: true,
    },
    isFav:{
        type:Boolean,
        required: true,
    },
    imageUrl:{
        type:String ,
        required: true,
    },
    moreImagesUrl:{
        type:Array ,
        required: true,
    },

 

});

module.exports = mongoose.model("House",House);