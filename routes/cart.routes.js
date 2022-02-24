const orderController = require("../controllers/cart.controller")
const {authJwt, requestValidator } = require("../middlewares");

module.exports = function(app){
    
    //Route for the POST request to create the cart
    app.post("/ecomm/api/v1/carts",[authJwt.verifyToken], orderController.create);

    //Route for the PUT request to create the product
    app.put("/ecomm/api/v1/carts/:id",[authJwt.verifyToken], orderController.update);


    //Route for the GET request to get the product
    app.get("/ecomm/api/v1/carts/:cartId",[authJwt.verifyToken], orderController.getCart);

}