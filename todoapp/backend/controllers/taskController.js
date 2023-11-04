const { check, validationResult } = require('express-validator');
var Todo = require('../models/todo')
var crypto = require('crypto')

const index = async (req,res) => {
    try {
        const tasks = await Todo.all();
        return res.status(200).json({ message: 'User created successfully', tasks: tasks });
    } catch (error) {
        console.log(error);
    }
}

const destroy = async (req,res) => {
    try {
        const deletetask = Todo.destroy(req.params.taskid);
        return res.status(200).json({message:"Task Deleted"})
    } catch (error) {
        console.log(error);
    }
}


const view = async (req,res) => {
    try {
        const task = await Todo.findById(req.params.taskid);
        return res.status(200).json({task:task});
    } catch (error) {
        console.log(error);
    }
}


const update = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({ errors: errors.formatWith(error => error.msg).mapped() });
        return;
    }
    const uuid = crypto.randomUUID();
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const startdate = req.body.startdate;
    const duration = req.body.duration;
    try {
        const task = await Todo.update(req.params.taskid,{
            name:name,
            description:description,
            category:category,
            startdate:startdate,
            duration:duration
        })
        return res.status(200).json({ message: 'Task updated successfully', task: task });
    } catch (error) {
        console.log(error);
    }
}

const store = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({ errors: errors.formatWith(error => error.msg).mapped() });
        return;
    }
    const uuid = crypto.randomUUID();
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const startdate = req.body.startdate;
    const duration = req.body.duration;
    try {
        const task = await Todo.create({
            taskid:uuid,
            name:name,
            description:description,
            category:category,
            startdate:startdate,
            duration:duration
        })
        return res.status(200).json({ message: 'Task created successfully', task: task });
    } catch (error) {
        console.log(error);
    }
}

const validate = (method) => {
    switch (method) {
        case 'addtask': {
            return [
                check('name').notEmpty().withMessage('Field is required'),
                check('description').notEmpty().withMessage('Field is required'),
                check('category').notEmpty().withMessage('Field is required'),
                check('startdate').notEmpty().withMessage('Field is required').isDate(),
                check('duration').notEmpty().withMessage('Field is required').isNumeric()
            ]
        }
        case 'updateTask': {
            return [
                check('name').notEmpty().withMessage('Field is required'),
                check('description').notEmpty().withMessage('Field is required'),
                check('category').notEmpty().withMessage('Field is required'),
                check('startdate').notEmpty().withMessage('Field is required').isDate(),
                check('duration').notEmpty().withMessage('Field is required').isNumeric()
            ]
        }
            
            break;
    
        default:
            break;
    }
}

module.exports = {
    store,
    validate,
    index,
    view,
    destroy,
    update
}