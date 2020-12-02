const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create details post table schema
let postSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    themes: {
        type: String
    },
    description: {
        type: String
    },
}, {
    collection: 'posts'
})

module.exports = mongoose.model('Post', postSchema)