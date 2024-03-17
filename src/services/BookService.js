const bookModel = require('../models/Book');

class BookService {

    static async create(bookData) {
        try {
            //create a new book
            const newBook = new bookModel(bookData);
            //save to database
            const savedBook = await newBook.save();
            return savedBook;
        } catch (error) {
            throw new Error("Unable to add book: " + error.message);
        }
    }

    static async getAll() {
        try {
            //get all books from database
            const allBooks = await bookModel.find();
            return allBooks;
        } catch (error) {
            throw new Error("Unable to fetch books: " + error.message);
        }
    }

    static async deleteById(bookId) {
        try {
            //find book and delete book by id
            const deletedBook = await bookModel.findByIdAndDelete(bookId);
            if (!deletedBook) {
                throw new Error("Book not found or already deleted.");
            }
            return;
        } catch (error) {
            throw new Error("Unable to delete book: " + error.message);
        }
    }

    static async updateById(bookId, bookData) {
        try {
            // find book and update book by id 
            const updatedBook = await bookModel.findByIdAndUpdate(bookId, bookData, { new: true });
            if (!updatedBook) {
                throw new Error("Book not found");
            }
            return updatedBook;
        } catch (error) {
            throw new Error("Unable to update book: " + error.message);
        }
    }
}

module.exports = BookService;

