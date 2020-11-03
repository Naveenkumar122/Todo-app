let config = require('config.json');
let bcrypt = require('bcryptjs');
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

async function updtCfrm(id){
    const task = await tasks.findById(id);
    // validate
    if (!task) throw 'task not found';
    task.completed = true;
    task.completedDate = Date.now();
    // copy userParam properties to task
    //Object.assign(task, userParam);
    await task.save();
    return await tasks.find();
}

async function loadTasks() {
    return await tasks.find();
}

async function getEdit(id){
    const task = await tasks.findById(id);
    return task;
}

async function create(param) {
    // validate
    if (await tasks.findOne({ task: param.task })) {
        throw ""+param.task+" is already there";
    }
    const task_ = new tasks(param);
    // save user
    await task_.save();
    return await tasks.find();
}

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
    return await tasks.find();
}

async function _delete(id) {
    await tasks.findByIdAndRemove(id);
    return await tasks.find();
}