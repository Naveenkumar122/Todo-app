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
router.get('/no-confirm/:id',updateNoCfrm);

module.exports = router;

//update confirm route
function updateCfrm(req,res,next){
    userService.updtCfrm(req.params.id)
        .then(()=>res.redirect('/todo/home'))
        .catch(err => next(err));
}
//update no-confirm route
function updateNoCfrm(req,res,next){
    userService.updtNoCfrm(req.params.id)
        .then(()=>res.redirect('/todo/home'))
        .catch(err => next(err));
}

//home route
function ldHome( req,res, next) {
    userService.loadTasks()
        .then(tasks => tasks ? res.render('Ejs/home',{list:tasks}) : res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}

//Adding todo route
function add_todo(req, res, next) {
    userService.create(req.body,res)
        .then(()=>{})
        .catch(err => next(err));
}

//updating route
function update(req, res, next) {
    userService.update(req.params.id, req.body)
       .then(()=>res.redirect('/todo/home'))
       .catch(err => next(err));
}

//deleting route
function _delete(req, res, next) {
    userService._delete(req.params.id)
       .then(()=>res.redirect('/todo/home'))
       .catch(err => next(err));
}

//route to serve edit page
function get_edit(req,res,next){
    userService.getEdit(req.params.id)
        .then(task => task ?res.render('Ejs/edit',{tsk:task}):res.status(400).json({ message: 'Something went wrong' }))
        .catch(err => next(err));
}
