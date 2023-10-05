const db = require('../config/db');

const Todo = {
    async create(task) {
        try {
            return db('tasks').insert(task)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Todo