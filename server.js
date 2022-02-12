const express = require('express');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');

// initiaizing express
const app = express();


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
 * Initializing the database
 */
const db = require("./models");
const Category = db.category;
const Product = db.product;

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
        }
    ];

    Category.bulkCreate(categories).then(() => {
        console.log("Categories table is initialized");
    }).catch(err => {
        console.log("Error while initializing ategories table");
    })

}

/**
 * Importing the routes and using it
 */
require('./routes/category.routes')(app);
require('./routes/product.routes')(app);


//Starting the server
app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port no : ${serverConfig.PORT}`);
})
