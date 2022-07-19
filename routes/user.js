const express = require("express");
//const { createIndexes } = require("../models/users.model");
const User = require("../models/users.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
//add user patient
router.route("/register").post((req, res, next) =>{
    console.log("inside the register");
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        address:req.body.address,
        address_x:req.body.address_x,
        address_y:req.body.address_y,
        pays: req.body.pays,
        email: req.body.email,
        phone: req.body. phone,
        year: req.body.year,
        speciality: req.body.speciality,
        about : req.body.about, 
        role: req.body.role
    });
    console.log("End the register");
    user
    .save()
    .then(()=>{
        console.log("user registered");
        res.status(200).json({
            message: 'User saved successfully!'
          });
    })
    .catch((error)=>{
        res.status(403).json({msg : error});
    });
});
//update user patient
router.route("/update/:email").patch(middleware.checkToken,(req,res)=>{
   
    //User.findOneAndUpdate(
    User.updateMany(
        {email:req.params.email},
        {$set: {password: req.body.password}},
        (err, result)=>{
            if(err) return res.status(500).json({msg: err});
            const msg ={
                msg: "password successfuly updated",
                email: req.params.email,
    
            };
            return res.json(msg);
        }
    );
    });
    //delete user patient

    router.route("/delete/:email").delete(middleware.checkToken,(req,res)=>{
        User.findOneAndDelete({email:req.params.email},(err, result)=>{
                if(err) return res.status(500).json({msg: err});
                const msg ={
                    msg: "User deleted",
                    email: req.params.email,
                };
                return res.json(msg);
            }
        );
        });
        //get all user data 
        router.route("/:email").get((req,res)=>{
            User.findOne({email:req.params.email},(err, result)=>{
                    if(err) return res.status(500).json({msg: err});
                    res.json({
                        data: result,
                        email: req.params.email,
                    });
                }
            );
            });

//login user patient
router.route("/login").post((req,res)=>{
    User.findOne({email:req.body.email},(err, result)=>{
            if(err) return res.status(500).json({msg: err});
            if(result === null){
                return res.status(403).json("email is incorrect")

            }
            if(result.password === req.body.password)
            {   let token = jwt.sign({email: req.body.email},config.key,{
                expiresIn: "24H",
            });
                res.json({
                    token: token,
                    msg: "success",
                });
            }
            else{
                res.status(403).json("password is incorrect"); 
            }
        });
    });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.decoded.email + ".jpg");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});

//adding and update profile image
router
  .route("/add/image")
  .patch(middleware.checkToken, upload.single("img"),async (req, res) => {
    
      User.findOneAndUpdate(
      { email: req.decoded.email },
      {
        $set: {
          img: req.file.path,
        },
      },
      { new: true },
      (err, user) => { 
        if (err) return res.status(500).send(err);
        const response = {
          message: "image successfully updated",
          data: user,
        };
        return res.status(200).send(response);
      }
    );
  });





   
    router.route("/checkemail/:email").get((req,res)=>{
        User.findOne({email:req.params.email},(err, result)=>{
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






router.route("/updateps/:email").patch((req,res)=>{
    //User.findOneAndUpdate(
    User.updateMany(
        {email:req.params.email},
        {$set: {password: req.body.password}},
        (err, result)=>{
            if(err) return res.status(500).json({msg: err});
            const msg ={
                msg: "password successfuly updated",
                usermane: req.params.email,
            };
            return res.json(msg);
        }
    );
    });
   /* router.route("/updateuser/:email").patch((req,res)=>{
        //User.findOneAndUpdate(
        User.updateMany(
            {email:req.params.email},
            {$set: {first_name: req.body.first_name ? req.body.first_name : user.first_name,
                last_name: req.body.last_name ? req.body.last_name: user.last_name,
                email: req.body.email ? req.body.email : user.email,
                password: req.body.password ? req.body.password : user.password,
                phone: req.body.phone ? req.body.phone : user.phone,  
                year: req.body.year ? req.body.year : user.year, }},
            (err, result)=>{
                if(err) return res.status(500).json({msg: err});
                const msg ={
                    msg: "User successfuly updated",
                    usermane: req.params.email,
                };
                return res.json(msg);
            }
        );
        });*/

  
router.route("/updateuser/").patch( middleware.checkToken, async (req, res) => {
    let user = {};
    /*await User.findOne({email: req.decoded.email}, (err, result) => {
      if (err) {
        user = {};
      }
      if (result != null) {
        user = result;
      }
    });*/
    User.updateMany(
      { email: req.decoded.email },
      {
        $set: {
            first_name: req.body.first_name ? req.body.first_name : user.first_name,
            last_name: req.body.last_name ? req.body.last_name: user.last_name,
            email: req.body.email ? req.body.email : user.email,
            password: req.body.password ? req.body.password : user.password,
            address: req.body.address ? req.body.address : user.address,
            address_x: req.body.address_x ? req.body.address_x : user.address_x,
            address_y: req.body.address_y ? req.body.address_y : user.address_y,
            pays: req.body.pays ? req.body.pays : user.pays,
            phone: req.body.phone ? req.body.phone : user.phone,  
            year: req.body.year ? req.body.year : user.year, 
            speciality: req.body.speciality? req.body.speciality : user.speciality,
            about : req.body.about? req.body.about : user.about, 
           

        },
      },
      { new: true },
      (err, result) => {
        if (err) return res.json({ err: err });
        if (result == null) return res.json({ data: [] });
        else return res.json({ data: result });
      }
    );
  });

  router.route("/profile/getData").get(middleware.checkToken, (req, res) => {
    User.findOne({ email: req.decoded.email }, (err, result) => {
      if (err) return res.json({ err: err });
      if (result == null) return res.json({ data: [] });
      else return res.json({ data: result });
    });
  });

  router.route("/role/chat/getData/:role").get( (req, res) => {
    User.find({role: req.params.role}, (err, result) => {
      if (err) return res.json({ err: err });
      if (result == null) return res.json({ data: [] });
      else return res.json({ data: result });
    });
  });

  router.route("/speciality/Data/:speciality").get( (req, res) => {
    User.find({speciality: req.params.speciality}, (err, result) => {
      if (err) return res.json({ err: err });
      if (result == null) return res.json({ data: [] });
      else return res.json({ data: result });
    });
  });

module.exports = router;