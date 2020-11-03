const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    task :{type: String, unique: true, required: true},
    createdDate: { type: Date, default: Date.now },
    completedDate: {type:Date, default: null},
    completed: {type:Boolean, default:false}
},{ collection : 'Todo' });


module.exports = mongoose.model('tasks', schema);