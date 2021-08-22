const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require("express-validator");
const User = require('../../models/User');
const Marker = require('../../models/Marker');


//@route GET api/marker
//@description test route for now
//@access private

router.get('/', auth, async (req,res)=>{
    try{
        const markers = await Marker.find().populate('user',['email']);;
        res.status(200).json({markers});
    }catch(err){
        console.error(err);
        res.status(500).json({msg:'Server Error'});
    }
});

//@route POST api/marker
//@description make a marker
//@access private

router.post('/', [auth,check('text', 'Add a description').not().isEmpty()], async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const mark = {lat, lng, text} = req.body;
        mark.user = req.user.id;
        const marker = new Marker(mark);
        await marker.save();
        res.status(200).json(marker);
    }catch(err){
        console.error(err);
        res.status(500).json({msg:'Server Error'});
    }
});



module.exports = router;