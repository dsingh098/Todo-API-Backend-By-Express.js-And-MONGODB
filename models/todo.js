const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema ({ 
    title : {
        type : String,
        require : true,
    },
    completed : {
        type: Boolean,
        default : false,
    }, 
    createdAt : {
        type : Date,
        default : Date.now
    }
},{timestamps : true})


const Todo = mongoose.model("Todo" , todoSchema)

module.exports = Todo;