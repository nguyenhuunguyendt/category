const Joi = require('joi');

const schema = {
    CreateProduct: Joi.object({
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        idProduct: Joi.string()
    }),
    UpdateProduct: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().trim().max(255),
        image: Joi.string().trim().max(255),
        idProduct: Joi.string()
    }),
    DeleteProduct: Joi.object({
        id: Joi.string().required(),
    }),
};

module.exports = {
    addProductValidation: async (req, res, next) => {
        try {
            const resJoi = schema.CreateProduct.validate(req.body);
            if (resJoi.error) {
                res.status(400).json({
                    errCode: 2,
                    message: resJoi.error.details[0].message
                })
            } else {
                req.bodyCategories = resJoi.value
                next();
            }

        } catch (error) {
            console.log
        }
    },
    updateProductValidation: async (req, res, next) => {
        try {

            const resJoi = schema.UpdateProduct.validate(req.body);
            if (resJoi.error) {
                res.status(400).json({
                    errCode: 2,
                    message: resJoi.error.details[0].message
                })
            } else {
                req.bodyCategories = resJoi.value
                next();
            }

        } catch (error) {
            console.log(error)
        }
    },
    deleteUserValidation: async (req, res, next) => {
        try {
            const resJoi = schema.DeleteProduct.validate(req.params);
            if (resJoi.error) {
                res.status(400).json({
                    errCode: 2,
                    message: resJoi.error.details[0].message
                })
            } else {
                req.bodyCategories = resJoi.value
                next();
            }

        } catch (error) {
            console.log
        }
    },
};