const mongoose = require('mongoose')

const ProjectScheme = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],


    craetedAt:{
        type: Date,
        default: Date.now
    }
});

mongoose.model("Project", ProjectScheme)

