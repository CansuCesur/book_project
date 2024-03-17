const validateBookRequest = (req, res, next) => {
    if (typeof req.body === 'object' && req.body !== null) {
        const { title, authorInfo, price, ISBN, language, pageCount, publisher } = req.body;
        // Check for missing fields
        if (!title || !authorInfo || !authorInfo.name || !authorInfo.country || !authorInfo.birthDate || !price || !ISBN || !language || !pageCount || !publisher) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        // Check for invalid data types
        if (typeof title !== 'string' ||
            typeof authorInfo !== 'object' ||
            typeof authorInfo.name !== 'string' ||
            typeof authorInfo.country !== 'string' ||
            typeof authorInfo.birthDate !== 'string' ||
            typeof price !== 'number' ||
            typeof ISBN !== 'string' ||
            typeof language !== 'string' ||
            typeof pageCount !== 'number' ||
            typeof publisher !== 'string') {
            return res.status(400).json({ error: 'Invalid data types' });
        }
        next();
    }
};

const validateBookId = (req, res, next) => {
    // Check for book object id 
    const id = req.params.id;
    if (!id || typeof id !== 'string' || id.trim() === '' || id.length !== 24) {
        return res.status(400).json({ error: 'Invalid book id' });
    }
    next();
};


module.exports = {
    validateBookRequest,
    validateBookId
};