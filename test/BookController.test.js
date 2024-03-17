const request = require('supertest');
const app = require('../index');
const bookService = require('../src/services/BookService');

// Spy on the methods of the 'bookService'
jest.spyOn(bookService, 'create')
jest.spyOn(bookService, 'getAll')
jest.spyOn(bookService, 'deleteById')
jest.spyOn(bookService, 'updateById')

const mockBookData = {
    title: 'Test Book',
    authorInfo: {
        name: 'Test Author',
        country: 'Test Country',
        birthDate: '2000-01-01'
    },
    price: 19.99,
    ISBN: '1234567890',
    language: 'English',
    pageCount: 200,
    publisher: 'Test Publisher'
};
const mockBookId = '609f3b05f0d48907d4d36b13'; // An Exmaple BookObjectId

const mockBookDataWithId = {
    ...mockBookData,
    _id: mockBookId
};

const mockUpdatedBookData = {
    _id: mockBookId,
    title: 'Test Book',
    authorInfo: {
        name: 'Test Author',
        country: 'Test Country',
        birthDate: '2000-01-01'
    },
    price: 19.99,
    ISBN: '1234567890',
    language: 'Turkish',
    pageCount: 200,
    publisher: 'Test Publisher'
};

//CREATE
describe('POST /api/books/create', () => {
    it('should create a new book', async () => {
        bookService.create.mockResolvedValue(mockBookData);
        // Make a POST request using Supertest
        const response = await request(app)
            .post('/api/books/create')
            .send(mockBookData)
            .expect(201);
        expect(response.body).toEqual(mockBookData);
    });

    it('should return 500 if there is an error', async () => {
        // Reject the bookService.create function with an error
        bookService.create.mockRejectedValue(new Error('Database error'));
        const response = await request(app)
            .post('/api/books/create')
            .send(mockBookData)
            .expect(500);
        expect(response.body.error).toBe('Database error');
    });
});

//GET ALL
describe('GET /api/books/all', () => {
    it('should get all books', async () => {
        bookService.getAll.mockResolvedValue(mockBookDataWithId);
        // Make a GET request using Supertest
        const response = await request(app)
            .get('/api/books/all')
            .expect(200);
        expect(response.body).toEqual(mockBookDataWithId);
    });
    it('should handle errors when getting all books', async () => {
        // Reject the bookService.getAll function with an error
        bookService.getAll.mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app)
            .get('/api/books/all')
            .expect(500);
        expect(response.body.error).toBe('Internal Server Error');
    });
});

//DELETE BY ID
describe('DELETE /api/books/deleteById/:id', () => {
    it('should delete a book by id', async () => {
        bookService.deleteById.mockResolvedValue();
        // Make a DELETE request using Supertest
        const response = await request(app)
            .delete('/api/books/deleteById/' + mockBookId)
            .expect(200);
        expect(response.body.message).toBe('Book deleted successfully');
    });
    it('should handle errors when deleting book', async () => {
        // Reject the bookService.delete function with an error
        bookService.deleteById.mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app)
            .delete('/api/books/deleteById/' + mockBookId)
            .expect(500);
        expect(response.body.error).toBe('Internal Server Error');
    });
});

//UPDATE BY ID 
describe('PUT /api/books/updateById/:id', () => {
    it('should update a book by id', async () => {
        bookService.updateById.mockResolvedValue(mockUpdatedBookData);
        // Make a PUT request using Supertest
        const response = await request(app)
            .put('/api/books/updateById/' + mockBookId)
            .send(mockUpdatedBookData)
            .expect(200)
        expect(response.body).toEqual(mockUpdatedBookData)
    });
    it('should handle errors when updating book', async () => {
        // Reject the bookService.update function with an error
        bookService.updateById.mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app)
            .put('/api/books/updateById/' + mockBookId)
            .send(mockUpdatedBookData)
            .expect(500)
        expect(response.body.error).toBe('Internal Server Error');
    });
});


