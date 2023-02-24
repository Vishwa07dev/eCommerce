
const { product } = require("../models");

const checkDuplicateProduct = (req, res, next) => {

    product.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(product => {
            if (product) {
                res.status(400).send({
                    message: "The product you are trying to store is already present in the database ! "
                })
            } else {
                next();
            }
        })
        .catch(err => {
            console.log("Error while finding product in middleware of function checkDuplicateProduct ! ", err);
        });

}

module.exports = {
    checkDuplicateProduct: checkDuplicateProduct
}