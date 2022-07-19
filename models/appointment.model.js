const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = Schema({
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
        type:String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    speciality:{
        type:String,
        required: true,
    },
    pays:{
        type:String,
        required: true,
    },
    rent:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model("Appointment",Appointment);