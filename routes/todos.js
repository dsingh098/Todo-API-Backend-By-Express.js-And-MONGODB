const express = require('express')
const router = express.Router();
const Todo = require('../models/todo.js'); // Ensure this path is correct


//  getting all todo
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// create new todo 
router.post('/', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            completed: req.body.completed || false
        })


        const newtodo = await todo.save();  // Corrected

        res.status(201).json(newtodo)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

// get todo by id 

router.get('/:id', gettodo, (req, res) => {
    res.json(res.todo)
})


//  update todo by id 

router.patch('/:id', gettodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }
    if (req.body.completed != null) {
        res.todo.completed = req.body.completed;
    }

    try {
        const updatetodo = await res.todo.save()
        res.json(updatetodo)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//  delete todo by id 

router.delete('/:id', gettodo, async (req, res) => {
    try {
        await res.todo.remove()
        res.json({ message: "delete todo" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//  middleware to get todo by id 

async function gettodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id)
        if (todo == null) {
            res.status(404).json({ message: 'cannot find todo ' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    res.todo = todo
    next()
}

module.exports = router;
