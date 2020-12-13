const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for todo task
const schema = new Schema({
    task :{type: String, unique: true, required: true},
    createdDate: { type: Date, default: (Date.now) },
    completedDate: {type: Date, default: null},
    comDateString:{type:String,default:null},
    crDateString: {type:String,default:null},
    completed: {type:Boolean, default:false}
},{ collection : 'Todo' });


module.exports = mongoose.model('tasks', schema);