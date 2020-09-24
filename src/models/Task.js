const mongoose = require('mongoose')

const TaskScheme = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        default:  false
    },

    craetedAt:{
        type: Date,
        default: Date.now
    }
});

mongoose.model("Task", TaskScheme)

