const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: Number, // 1 for pending 2 for progress 3 for completed
        default: 0
    },
    // userId: {
    //     type: mongoose.Types.ObjectId,  if we want to save user spacific
    //     ref: 'users',
    // },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    isDel: {
        type: Boolean,
        default: false
    },

})
let taskModel = mongoose.model('task', taskSchema)
module.exports = {
    taskModel
}






