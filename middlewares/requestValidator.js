const db = require("../models");
const Category = db.category;

const validateCategoryRequest = (req, res, next) =>{

    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the category can't be empty !"
        })
        return;
    }
    next();
}

const validateProductRequest = (req, res, next) => {

    /**
     * Validation of the request body
     */

    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the product can't be empty !"
        })
        return;
    }

    if (req.body.categoryId) {
        //Check if the category exists, if not return the proper error message
        Category.findByPk(req.body.categoryId).then(category => {
            if (!category) {
                res.status(400).send({
                    message: `category id passed is not available : ${req.body.categoryId}`
                });
                return;
            }
            next();
        }).catch(err => {
            res.status(500).send({
                message: "Some Internal error while storing the product!"
            });
        });
    } else {
        res.status(400).send({
            message: `category id passed is not available `
        })

        return;
    }

}


const validateCategoryPassedInReqParam = (req, res, next) => {
    const categoryId = parseInt(req.params.categoryId);
    if (categoryId) {
        //Check if the category exists, if not return the proper error message
        Category.findByPk(categoryId).then(category => {
            if (!category) {
                res.status(400).send({
                    message: `category id passed is not available : ${categoryId}`
                })
                return;
            }
            next();
        }).catch(err => {
            res.status(500).send({
                message: "Some Internal error while storing the product!"
            });
            return;
        });
    } else {
        res.status(400).send({
            message: `category id passed is not available `
        })

        return;

    }
}

module.exports = {
    validateProductRequest: validateProductRequest,
    validateCategoryPassedInReqParam: validateCategoryPassedInReqParam,
    validateCategoryRequest : validateCategoryRequest
}