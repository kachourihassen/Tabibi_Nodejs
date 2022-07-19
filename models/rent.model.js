const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rent = Schema({
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
    idhome:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model("Rent",Rent);