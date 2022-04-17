/**
 * This file contains the controller logic for the category resource.
 * Everytime any CRUD request come for the Category, methods defined in this
 * controller file will be executed.
 */

const { category } = require("../models");
const db = require("../models");
const Category = db.category;

/**
 * Create and save a new Category
 */
exports.create = (req, res) => {

    /**
     * Creation of the Category object to be stored in the DB
     */
    const category = {
        name: req.body.name,
        description: req.body.description
    };

    /**
     * Storing the Category object in the DB
     */
    Category.create(category).then(category => {
        console.log(`category name: [ ${category.name}] got inserted in DB`)
        res.status(201).send(category);
    }).catch(err => {
        console.log(`Issue in inserting category name: [ ${category.name}]. Error message : ${err.message}`)
        res.status(500).send({
            message: "Some Internal error while storing the category!"
        })
    })
}

/**
 * Get a list of all the Categories
 */
exports.findAll = (req, res) => {

    //Supporting the query param
    let categoryName = req.query.name;
    let promise;
    if (categoryName) {
        promise = Category.findAll({
            where: {
                name: categoryName
            }
        });
    } else {
        promise = Category.findAll();
    }
    promise.then(categories => {
        res.status(200).send(categories);
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching all the categories"
        })
    })
}

/**
 * Get a category based on the category id
 */
exports.findOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(category => {
        res.status(200).send(category);
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching the category based on the id"
        })
    })
}


/**
 * Update an existing category
 */
exports.update = (req, res) => {

    /**
     * Creation of the Category object to be stored in the DB
     */
    const category = {
        name: req.body.name,
        description: req.body.description
    };
    const categoryId = req.params.id;

    Category.update(category, {
        returning: true,
        where: { id: categoryId }
    }).then(updatedCategory => {

        Category.findByPk(categoryId).then(category => {
            res.status(200).send(category);
        }).catch(err => {
            res.status(500).send({
                message: "Some Internal error while fetching the category based on the id"
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching the category based on the id"
        })
    })
}

/**
 * Delete an existing category based on the category name
 */
exports.delete = (req, res) => {
    const categoryId = req.params.id;

    Category.destroy({
        where: {
            id: categoryId
        }
    }).then(result => {
        res.status(200).send(
            {
                message: "Successfully deleted the category"
            }
        );
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while deleting the category based on the id"
        })
    })


}