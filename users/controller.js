const express = require('express');
const userService = require('./service');
const methodOverride = require("method-override");

//express router for router
const router = express.Router();

//method overriding for put and delete
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));


// routes
router.get('/home',ldHome);
router.post('/add_todo',add_todo);
router.get('/edit/:id',get_edit);
router.put('/update/:id', update);
router.delete('/:id/delete', _delete);
router.get('/confirm/:id',updateCfrm);

module.exports = router;
function updateCfrm(req,res,next){
    userService.updtCfrm(req.params.id)
        .then(tasks => tasks ? res.render('Ejs/home',{list:tasks}) : res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}
function ldHome( req,res, next) {
    userService.loadTasks()
        .then(tasks => tasks ? res.render('Ejs/home',{list:tasks}) : res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}

function add_todo(req, res, next) {
    userService.create(req.body)
        .then(tasks => tasks ? res.render('Ejs/home',{list:tasks}) : res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(tasks => tasks ? res.render('Ejs/home',{list:tasks}) : res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService._delete(req.params.id)
        .then(tasks => tasks ? res.render('Ejs/home',{list:tasks}) : res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}

function get_edit(req,res,next){
    userService.getEdit(req.params.id)
        .then(task => task ?res.render('Ejs/edit',{tsk:task}):res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}