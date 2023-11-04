const db = require('../config/db');

const User = {
    async create(user) {
        try {
            return db('users').insert(user)
        } catch (error) {
            console.log(error);
        }
    },

    async findByEmail(email) {
        return db('users').where('email', email).first();
    },

    async findById(id) {
        return db('users').where('user_id', id).first();
    }
}

module.exports = User