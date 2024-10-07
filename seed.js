const mongoose = require('mongoose');
const Book = require('./src/models/Book');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected for seeding');

    const books = [
        {
            title: 'The Great Gatsby',
            authorInfo: {
                name: 'F. Scott Fitzgerald',
                country: 'United States',
                birthDate: new Date('1896-09-24')
            },
            price: 10.99,
            ISBN: '978-0743273565',
            language: 'English',
            pageCount: 180,
            publisher: 'Scribner'
        },
        {
            title: 'One Hundred Years of Solitude',
            authorInfo: {
                name: 'Gabriel Garcia Marquez',
                country: 'Colombia',
                birthDate: new Date('1927-03-06')
            },
            price: 14.99,
            ISBN: '978-0060883287',
            language: 'Spanish',
            pageCount: 417,
            publisher: 'Harper & Row'
        },
        {
            title: '1984',
            authorInfo: {
                name: 'George Orwell',
                country: 'United Kingdom',
                birthDate: new Date('1903-06-25')
            },
            price: 9.99,
            ISBN: '978-0451524935',
            language: 'English',
            pageCount: 328,
            publisher: 'Signet Classic'
        }
    ];

    Book.insertMany(books)
        .then(() => {
            console.log('Data seeded successfully');
            mongoose.connection.close();
        })
        .catch(err => {
            console.log('Error while seeding data:', err);
            mongoose.connection.close();
        });

}).catch(err => console.log.error('MongoDB connection error:', err));
