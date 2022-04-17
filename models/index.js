/**
 * This file will be used for the following purposes :
 * 1. Create the DB connection with the help of Sequelize
 * 2. Export all the functionalites of the models model through this file.
 * 
 * One of the advantage of using index.js file is, other file trying to import this files, just need
 * to provide the module name
 * 
 * For example : require(./models); // No need to specify the file name index.js
 */

const env = process.env.NODE_ENV || 'development';
const config = require("../configs/db.config")[env];
const Sequelize = require("sequelize");

//console.log("ENV: " + env);
 
/**
 * Creating the DB connection
 */
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model.js')(sequelize, Sequelize);
db.product = require('./product.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.cart = require('./cart.model.js')(sequelize, Sequelize);


/**
   * Establishing the relationship between Role and User
   */
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

/**
 * Establishing the relationship between Cart and User
 */
 db.user.hasMany(db.cart);

 /**
  * Establishing the relationship between Cart and Items : Many to Many
  */
  db.product.belongsToMany(db.cart, {
    through: "cart_products",
    foreignKey: "productId",
    otherKey: "cartId"
});
db.cart.belongsToMany(db.product, {
    through: "cart_products",
    foreignKey: "cartId",
    otherKey: "productId"
});

db.ROLES = ["user", "admin"];


module.exports = db;