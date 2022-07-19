const express = require("express");
const Appointment = require("../models/appointment.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
 
router.route("/Appointment/add").post((req, res) =>{
  
    const  appointment = new Appointment({
        patient: req.body.patient,
        doctor: req.body.doctor,
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        speciality: req.body.speciality,
        pays: req.body.pays,
        rent: req.body.rent

    });
    
    appointment
    .save()
    .then(()=>{
        console.log("Appointment");
        res.status(200).json({
            message: 'Appointment successfully!'
          });
    })
    .catch((error)=>{
        res.status(403).json({msg : error});
    });
});
 

  router.route("/listappPat/:patient").get( (req, res) => {
    Appointment.find({patient: req.params.patient }, (err, result) => {
      if (err) return res.json({ err: err });
      if (result == null) return res.json({ data: [] });
      else return res.json({ data: result });
    });
  });
  router.route("/listappDoc/:doctor").get( (req, res) => {
    Appointment.find({doctor: req.params.doctor }, (err, result) => {
      if (err) return res.json({ err: err });
      if (result == null) return res.json({ data: [] });
      else return res.json({ data: result });
    });
  });

  router.route("/checkapp/:date/:time").get((req,res)=>{
    Appointment.findOne({date:req.params.date,time:req.params.time},(err, result)=>{
        if(err) return res.status(500).json({msg: err});
        if(result !== null){
            return res.json({
                Status: true,
            });
        }else
        return res.json({
            Status: false,
        });
    }
);
});
router.route("/checkappdate/:date/:doctor/:patient").get((req,res)=>{
  Appointment.findOne({date:req.params.date,doctor:req.params.doctor,patient:req.params.patient},(err, result)=>{
      if(err) return res.status(500).json({msg: err});
      if(result !== null){
          return res.json({
              Status: true,
          });
      }else
      return res.json({
          Status: false,
      });
  }
);
});


router.route("/get/:_id").get( (req, res) => {
  Appointment.find({_id: req.params._id }, (err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  });
});
router.route("/update/:_id").patch(middleware.checkToken,(req,res)=>{
   
  
    Appointment.updateMany(
      {_id:req.params._id},
      {$set: {type: req.body.type}},
      (err, result)=>{
          if(err) return res.status(500).json({msg: err});
          const msg ={
              msg: "Appointment Successfully updated",
              _id: req.params._id,
  
          };
          return res.json(msg);
      }
  );
  });
  router.route("/updaterent/:_id").patch((req,res)=>{
   
  
    Appointment.updateMany(
      {_id:req.params._id},
      {$set: {rent: req.body.rent}},
      (err, result)=>{
          if(err) return res.status(500).json({msg: err});
          const msg ={
              msg: "Appointment Successfully updated",
              _id: req.params._id,
  
          };
          return res.json(msg);
      }
  );
  });


  router.route("/delete/app/:_id").delete((req,res)=>{
    Appointment.findOneAndDelete({_id:req.params._id},(err, result)=>{
            if(err) return res.status(500).json({msg: err});
            const msg ={
                msg: "Appointment deleted",
                 
            };
            return res.json(msg);
        }
    );
    });

module.exports = router;