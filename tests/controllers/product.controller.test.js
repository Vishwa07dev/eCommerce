const db = require('../../models');
const ProductModel = db.product;
const ProductController = require('../../controllers/product.controller');
const { mockRequest, mockResponse } = require('../interceptor');

let req, res;

beforeEach(() =>{
    req = mockRequest();
    res = mockResponse();
})

const testPayload = 
    {
        name: "Sony Bravia",
        description: "This is an amazing TV",
        cost: 10000,
        categoryId: 1
    };

describe('Product controller create method', () => {
    it('should return success message with product details', async () => {
        const spy = jest.spyOn(ProductModel, 'create').mockImplementation(
            (testPayload) => new Promise(function (resolve, reject) {
                resolve(testPayload);
        }));

        req.body = testPayload;

        await ProductController.create(req, res);
        
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(testPayload);    
    });
});

describe('Product controller create method', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(ProductModel, 'create').mockImplementation(
            () => Promise.reject(new Error("This is an error"))
        );

        await ProductController.create(req, res);

        expect(spy).toHaveBeenCalled();
        // expect(res.status).toHaveBeenCalledWith(500);
        // expect(res.send).toHaveBeenCalledWith({
        //     message: "Some Internal error while storing the product!"
        // });    
    });
})

describe('Product controller findOne method', () => {
    it('should return product details', async () => {
        const spy = jest.spyOn(ProductModel, 'findByPk').mockImplementation(
            () => new Promise(function (resolve, reject) {
                resolve(testPayload);
        }));
        req.params.id = 1;
        await ProductController.findOne(req, res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(testPayload);    
    });
})

describe('Product controller findOne method', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(ProductModel, 'findByPk').mockImplementation(
            () => new Promise(function (resolve, reject) {
                reject(new Error('This is an error'));
        }));
        req.params.id = 1;
        await ProductController.findOne(req, res);

        expect(spy).toHaveBeenCalled();   
    });
})

describe('Product controller update method', () => {
    it('should return product details', async () => {
        const spy1 = jest.spyOn(ProductModel, 'findByPk').mockImplementation(
            () => new Promise(function (resolve, reject) {
                resolve(testPayload);
        }));
        const spy2 = jest.spyOn(ProductModel, 'update').mockImplementation(
            (data) => new Promise(function (resolve, reject) {
                resolve("product updated");
        }));

        req.params.id = 1;
        await ProductController.update(req, res);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();   
    });
})

describe('Product controller update method', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(ProductModel, 'update').mockImplementation(
            () => new Promise(async function (resolve, reject) {
                await reject(new Error('This is an error'));
        }));

        req.params.id = 1;
        await ProductController.update(req, res);

        expect(spy).toHaveBeenCalled();  
    });
})

describe('Product controller delete method', () => {
    it('should return success message', async () => {
        const spy = jest.spyOn(ProductModel, 'destroy').mockImplementation(
            (data) => new Promise(function (resolve, reject) {
                resolve("product deleted");
        }));

        req.params.id = 1;
        await ProductController.delete(req, res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith( {
            message: "Successfully deleted the product"
        });    
    });
})

describe('Product controller delete method', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(ProductModel, 'destroy').mockImplementation(
            () => new Promise(function (resolve, reject) {
                reject(new Error('This is an error'));
        }));

        await ProductController.delete(req, res);

        expect(spy).toHaveBeenCalled();   
    });
})

describe('Product controller getProductsUnderCategory method', () => {
    it('should return success message', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll').mockImplementation(
            (data) => new Promise(function (resolve, reject) {
                resolve(testPayload);
        }));

        req.params.categoryId = 1;
        await ProductController.getProductsUnderCategory(req, res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(testPayload);    
    });
})

describe('Product controller getProductsUnderCategory method', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll').mockImplementation(
            () => new Promise(function (resolve, reject) {
                reject(new Error('This is an error'));
        }));

        await ProductController.getProductsUnderCategory(req, res);

        expect(spy).toHaveBeenCalled();   
    });
})

