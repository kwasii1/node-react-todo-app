const db = require('../config/db');

const Todo = {
    async create(task) {
        try {
            return db('tasks').insert(task)
        } catch (error) {
            console.log(error);
        }
    },


    async all() {
        try {
            return db('tasks').select()
        } catch (error) {
            console.log(error);
        }
    },

    async findById(id) {
        try {
            return db('tasks').where('taskid',id)
        } catch (error) {
            console.log(error);
        }
    },

    async destroy(id) {
        try {
            return db('tasks').where('taskid',id).del()
        } catch (error) {
            
        }
    },

    async update(id,task) {
        try {
            return db('tasks').where('taskid',id).update(task)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Todo