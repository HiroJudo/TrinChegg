const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
    className: { type: String, required: true },
    prof: { type: String, required: false },
    term: { type: String, required: false },
    description: {type: String, required: false},
}, {
    timestamps: true,
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;