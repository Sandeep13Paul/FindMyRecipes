const mongoose = require('mongoose');

const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Recepie = mongoose.model('Recepie', blogSchema);

module.exports = Recepie;