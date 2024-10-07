const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    authorInfo: Joi.object({
        name: Joi.string().required(),
        country: Joi.string().required(),
        birthDate: Joi.string().required(),
    }).required(),
    price: Joi.number().required(),
    ISBN: Joi.string().length(13).required(),
    language: Joi.string().required(),
    pageCount: Joi.number().integer().min(1).required(),
    publisher: Joi.string().required(),
});

const validateBookRequest = (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateBookId = (req, res, next) => {
    const id = req.params.id;
    const idSchema = Joi.string().length(24).required();
    const { error } = idSchema.validate(id);
    if (error) {
        return res.status(400).json({ error: 'Invalid book id' });
    }
    next();
};

module.exports = {
    validateBookRequest,
    validateBookId,
};
