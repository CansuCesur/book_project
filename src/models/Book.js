const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authorInfo: {
        name: { type: String, required: true },
        country: { type: String, required: true },
        birthDate: { type: Date, required: true }
    },
    price: {
        type: Number,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;