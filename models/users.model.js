const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema({
    first_name:{
        type:String,
        required: true,
    },
    last_name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        default: "",
    },
    address_x:{
        type: String,
        default: "",
    },
    address_y:{
        type: String,
        default: "",
    },
    pays:{
        type: String,
        default: "",
    },
    phone:{
        type: String,
        default: "",
    },
    speciality:{
        type: String,
        default: "",
    },
    about:{
        type: String,
        default: "",
    },
    year:{
        type: String,
        default: "",
    },
    img: {
        type: String,
        default: "",
      },
    role: {
        type: String,
        default: "",
      },
});

module.exports = mongoose.model("User",User);