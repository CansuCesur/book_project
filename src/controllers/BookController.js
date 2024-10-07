const bookService = require('../services/BookService');

// Processes the incoming HTTP request to create a new book.
const create = async (req, res) => {
    try {
        const newBook = await bookService.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}

// Processes the incoming HTTP request to get all books
const getAll = async (req, res) => {
    try {
        const allBooks = await bookService.getAll();
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}

// Processes the incoming HTTP request to delete book by book object id 
const deleteById = async (req, res) => {
    try {
        const bookId = req.params.id;
        await bookService.deleteById(bookId);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Processes the incoming HTTP request to update book by book object id 
const updateById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookData = req.body;
        const updatedBook = await bookService.updateById(bookId, bookData);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    getAll,
    deleteById,
    updateById
};