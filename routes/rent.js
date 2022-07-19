const express = require("express");
const Rent = require("../models/rent.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
 
router.route("/Rent/add").post((req, res) =>{

    const  rent = new Rent({
        patient: req.body.patient,
        doctor: req.body.doctor,
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        idhome:req.body.idhome,
    });

    rent
    .save()
    .then(()=>{
        console.log("Rent");
        res.status(200).json({
            message: 'Rent successfully!'
          });
    })
    .catch((error)=>{
        res.status(403).json({msg : error});
    });
});

module.exports = router;