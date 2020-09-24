const mongoose = require('mongoose')
const crypt = require('bcryptjs')

const UserScheme = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        lowercase: true,
        unique: true
    },
    pass:{
        type:String,
        required: true,
        select: false //não retornar na consulta
    },
    craetedAt:{
        type: Date,
        default: Date.now
    }
});

//
UserScheme.pre('save', async function (next) {
    const hash = await crypt.hash(this.pass, 7)
    this.pass = hash
    next()
})



mongoose.model("User", UserScheme)

