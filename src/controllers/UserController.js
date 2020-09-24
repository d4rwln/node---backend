const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const crypt = require("bcryptjs");

module.exports = {
    async create(req, res) {
        const { email } = req.body

        try{
            if ( await User.findOne({email}))
                return res.status(400).send({ error: 'User already exists'})
            
            
            const user = await User.create(req.body) ;

            
            return res.send({ user })
            
        } catch(err){}
    },
    async authenticate(req, res) {
        const { email, pass } = req.body

        const user = await User.findOne({ email }).select('+pass')

        if (!user)
            return res.status(400).send({error:"User not found!"})
            
        if(!await crypt.compare(pass, user.pass))
            return res.status(400).send({error:"Invalid password!"})

        user.pass = undefined

        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400})

        res.send({"success":true, "token": token})
    },
    
};             