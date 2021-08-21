const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route GET api/user
//@description test route for now
//@access public

router.get('/',(req,res)=>{
    res.send('user route');
});

//@route POST api/users
//@description Register a user
//@access public

router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password','Must be at least 6 characters').isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req)
    const {email, password} = req.body;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors:[{msg:'User already exists'}]});
        }

        user = new User({
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'),(err,token)=>{
            if (err) throw err;
            res.json({token});
        });

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;