const express = require('express');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');

// initiaizing express
const app = express();
const cors = require('cors');


/**
 * Using the body-parser middleware
 * 
 * Using for parsing the request. 
 * Parsing the request of the type json and convert that to object
 * 
 * */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Configuring CORS
 */
app.use(cors());



/**
 * Initializing the database
 */
const db = require("./models");
const userModel = require('./models/user.model');
const { user } = require('./models');
const Category = db.category;
const Product = db.product;
const Role = db.role;

//Setting the One to Many relationship between Category and Product
Category.hasMany(Product); // This will create a foreign key column( categoryId) in Pr


console.log(Category);
db.sequelize.sync({ force: true }).then(() => {
    console.log('tables dropped and recreated');
    init();
})

function init() {

    //Initializing few Categories
    var categories = [
        {
            name: "Electronics",
            description: "This category will contain all the electronic products"
        },
        {
            name: "KitchenItems",
            description: "This category will contain all the Kitchen related products"
        },
        {
            name: "Sports",
            description: "This category will contain all the Sports related products"
        }
    ];

    Category.bulkCreate(categories).then(() => {
        console.log("Categories table is initialized");
    }).catch(err => {
        console.log("Error while initializing ategories table");
    })

    /**
     * Creating products
     */
    Product.create({
        name : "iPhone15",
        description : "Apple product",
        cost : 89000,
        categoryId : 1

    });
    Product.create({
        name : "s21",
        description : "Samsung product",
        cost : 65000,
        categoryId : 1

    });
    Product.create({
        name : "Mi12",
        description : "Redme product",
        cost : 15000,
        categoryId : 1

    });
    Product.create({
        name : "Prestige Stove",
        description : "Cooking stove",
        cost : 14500,
        categoryId : 2

    });
    Product.create({
        name : "PrestigeKitchenSet",
        description : "All you need for cooking",
        cost : 25500,
        categoryId : 2

    });
    Product.create({
        name : "SG Bat",
        description : "Cricket bat",
        cost : 25500,
        categoryId : 3

    });
    Product.create({
        name : "SG Bal",
        description : "Cricket ball",
        cost : 500,
        categoryId : 3

    });
    Product.create({
        name : "Cricket Batting Pad",
        description : "Batting pad",
        cost : 1500,
        categoryId : 3

    });

    /**
     * Adding roles
     */
     Role.create({
        id:1,
        name:"user"
    });
    Role.create({
        id:2,
        name:"admin"
    })

}

/**
 * Importing the routes and using it
 */
require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);


//Starting the server
app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port no : ${serverConfig.PORT}`);
})
