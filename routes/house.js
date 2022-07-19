const express = require("express");
const House = require("../models/house.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
 
router.route("/House/add").post((req, res) =>{
  
    const  house = new House({
        patient: req.body.patient,
        doctor: req.body.doctor,
        date: req.body.date,
        time: req.body.time,
        address: req.body.address,
        type: req.body.type,
        description:req.body.description,
        price:req.body.price,
        bedRooms:req.body.bedRooms,
        bathRooms:req.body.bathRooms,
        garages:req.body.garages,
        sqFeet:req.body.sqFeet,
        isFav:req.body.isFav,
        imageUrl:req.body.imageUrl,
        moreImagesUrl:req.body.moreImagesUrl,
        address_x:req.body.address_x,
        address_y:req.body.address_y,
  
    });
    
    house
    .save()
    .then(()=>{
        console.log("House");
        res.status(200).json({
            message: 'Add successfully!'
          });
    })
    .catch((error)=>{
        res.status(403).json({msg : error});
    });
});
 
router.route("/house/getData").get( (req, res) => {
  House.find((err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  });
});

router.route("/house/getpays/:address/:isFav").get( (req, res) => {
  House.find({address: req.params.address,isFav: req.params.isFav },(err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  });
});




router.route("/updateHouse/:_id").patch((req,res)=>{
 
  House.updateMany(
    {_id:req.params._id},
    {$set: {patient: req.body.patient,doctor: req.body.doctor,date: req.body.date,isFav: req.body.isFav}},
    (err, result)=>{
        if(err) return res.status(500).json({msg: err});
        const msg ={
            msg: "Rent HOUSE Successfully",
            _id: req.params._id,

        };
        return res.json(msg);
    }
);
});

router.route("/house/getdatapays/:patient").get( (req, res) => {
  House.find({patient: req.params.patient },(err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  });
});

module.exports = router;