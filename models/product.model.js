/**
 * This file will be used to represent the Product Schema
 * 
 * Product  fields :
 * 1. id
 * 2. name
 * 3. description
 * 4. cost
 * 
 * Category Schema object being created will be exported to be used by other modules
 */


 module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        cost:{
            type: Sequelize.INTEGER,
            allowNull : false
        }
        
    },{
        tableName: 'products'
         
        /**
         * This helps you to provie a custom name to the table
         * If above is not provided, model name is converted into plural and set as the table name
         * 
         * If we want to just use the model name provided, we can provide the below option :
         * 
         * freezeTableName: true
         */
    });
    return Product;
}