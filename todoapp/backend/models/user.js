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
    }
}

module.exports = User