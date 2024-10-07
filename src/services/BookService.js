const bookModel = require('../models/Book');
const mongoose = require('mongoose');
const { redisClient } = require('../../redisClient')
const logger = require('../../logger')

class BookService {

    static async create(bookData) {
        try {
            logger.info('Starting book creation process...');
            // Create a new book
            const newBook = new bookModel(bookData);
            // Save to database
            const savedBook = await newBook.save();

            // Log success only if book is saved
            if (savedBook) {
                logger.info(`Book created successfully with ID: ${savedBook._id}`);
                // Clear cache of all books
                await redisClient.del('books:all');
            }
            return savedBook;
        } catch (error) {
            logger.error(`Error creating book: ${error.message}`);
            throw new Error(`Unable to add book: ${error.message}`);
        }
    }

    static async getAll() {
        try {
            logger.info('Fetching books from cache...');
            const cachedBooks = await redisClient.get('books:all');
            if (cachedBooks) {
                logger.info('Books retrieved from Redis cache');
                return JSON.parse(cachedBooks); // Return data from Redis cache
            }
            logger.info('Cache miss. Fetching books from the database...');
            const allBooks = await bookModel.find();

            if (allBooks.length > 0) {
                // Save data to Redis with a TTL (e.g., 1 hour)
                await redisClient.set('books:all', JSON.stringify(allBooks), 'EX', 3600);
                logger.info('Books saved to Redis cache with a TTL of 1 hour');
                return allBooks;
            } else {
                logger.warn('No books found in the database.');
                return [];
            }
        } catch (error) {
            logger.error(`Error fetching books: ${error.message}`);
            throw new Error(`Unable to fetch books: ${error.message}`);
        }
    }
    static async deleteById(bookId) {
        try {
            logger.info(`Attempting to delete book with ID: ${bookId}`);
            // Find book and delete by ID
            const deletedBook = await bookModel.findByIdAndDelete(bookId);
            if (!deletedBook) {
                logger.warn(`Delete operation failed: Book with ID ${bookId} not found.`);
                throw new Error("Book not found or already deleted.");
            }
            logger.info(`Book with ID ${bookId} deleted successfully.`);
            // Clear cache
            await redisClient.del(`books:${bookId}`);
            logger.info(`Cache for book ID ${bookId} invalidated.`);
            return deletedBook;
        } catch (error) {
            logger.error(`Error deleting book: ${error.message}`);
            throw new Error("Unable to delete book: " + error.message);
        }
    }

    static async updateById(bookId, bookData) {
        try {
            logger.info(`Attempting to update book with ID: ${bookId}`);
            // Find book and update by ID
            const updatedBook = await bookModel.findByIdAndUpdate(bookId, bookData, { new: true });
            if (!updatedBook) {
                logger.warn(`Update operation failed: Book with ID ${bookId} not found.`);
                throw new Error("Book not found");
            }
            logger.info(`Book with ID ${bookId} updated successfully.`);
            // Clear cache
            await redisClient.del(`books:${bookId}`);
            logger.info(`Cache for book ID ${bookId} invalidated.`);
            return updatedBook;
        } catch (error) {
            logger.error(`Error updating book: ${error.message}`);
            throw new Error("Unable to update book: " + error.message);
        }
    }
}

module.exports = BookService;

