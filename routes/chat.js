const express = require("express");
 const Chat = require("../models/chats.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
 
router.route("/chats/register").post((req, res) =>{
  
    const chat = new Chat({
        type: req.body.type,
        sourceEmail: req.body.sourceEmail,
        targetEmail: req.body.targetEmail,
        message: req.body.message,
        time: req.body.time 
         
    });
    
    chat
    .save()
    .then(()=>{
        console.log("Send");
        res.status(200).json({
            message: 'sended successfully!'
          });
    })
    .catch((error)=>{
        res.status(403).json({msg : error});
    });
});
 

  router.route("/rolechat/chat/getDatachat/:sourceEmail/:targetEmail").get( (req, res) => {
    Chat.find({sourceEmail: req.params.sourceEmail,targetEmail: req.params.targetEmail}, (err, result) => {
      if (err) return res.json({ err: err });
      if (result == null) return res.json({ data: [] });
      else return res.json({ data: result });
    });
  });

    
module.exports = router;