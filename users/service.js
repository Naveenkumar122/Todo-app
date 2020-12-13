let config = require('config.json');
let db = require('helpers/db');
let tasks = db.tasks;

module.exports = {
    loadTasks,
    create,
    update,
    getEdit,
    updtCfrm,
    _delete
};

//sevice for updating confirm near the task
async function updtCfrm(id,res){
    const task = await tasks.findById(id);
    // validate
    if (!task) throw 'task not found';
    task.completed = true;
    task.completedDate = Date.now();
    task.comDateString =DateString(task.completedDate);
    await task.save();
}

//loads all tasks in the db
async function loadTasks() {
    return  await tasks.find();
}


//get service gets the individual data by id and sends it to edit.ejs file for editing purpose
async function getEdit(id){
    const task = await tasks.findById(id);
    return task;
}

//sevice for creating new task in the db
async function create(param,res) {
    // validate
    if (await tasks.findOne({ task: param.task })) {
        throw ""+param.task+" is already there";
    }
    const task_ = new tasks(param);
    task_.crDateString = DateString(task_.createdDate);
    // save user
    await task_.save();
    res.redirect('\home');
}

//service for updating the task with their id
async function update(id, userParam) {
    const task = await tasks.findById(id);

    // validate
    if (!task) throw 'task not found';
    if (task.task !== userParam.task && await tasks.findOne({ task: userParam.task })) {
        throw 'task "' + userParam.task + '" is already there';
    }

    // copy userParam properties to task
    Object.assign(task, userParam);

    await task.save();
}

//service deleted the document by their id
async function _delete(id) {
    await tasks.findByIdAndRemove(id);
}

//utility function for creating date string from date object
function DateString(dateObj){
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day ;
    return newdate;
}