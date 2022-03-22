const Models = require('../../../models');
const ProductModel = Models.product;
const ProductController = require('../../../controllers/product.controller');
const newProduct = require('../../mock-data/new-product.json');
const { mockRequest, mockResponse } = require('../interceptor');

let req, res;

beforeEach(() =>{
    req = mockRequest();
    res = mockResponse();
})


describe('ProductController.create', () => {
    beforeEach(() => {
        req.body = newProduct;
     });
  
     it('should call ProductController.create method and add new product in DB', async () => {
        const spy = jest.spyOn(ProductModel, 'create')
                       .mockImplementation(
                          (newProduct) => Promise.resolve(newProduct)
                       );
        await ProductController.create(req, res);
  
        expect(spy).toHaveBeenCalled();
        expect(ProductModel.create).toHaveBeenCalledWith(newProduct);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newProduct);
     });
  
     it('should call ProductController.create method and ends with a error', async () => {
        const spy = jest.spyOn(ProductModel, 'create')
                       .mockImplementation(() => Promise.reject(
                                                  Error("This is an error."))
                       );
        
        await ProductController.create(req, res);               
     
        await expect(spy).toHaveBeenCalled();
        expect(ProductModel.create).toHaveBeenCalledWith(newProduct);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
           message: "Some Internal error while storing the product!"
        });
     });
})

describe('ProductController.findAll', () => {

    it('should call ProductController.findAll method with empty query value', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll')
                        .mockImplementation(
                            () => Promise.resolve(newProduct)
                        );
 
        req.query= {
            name : '',
            minCost: 0,
            maxCost: 0
        };
        await ProductController.findAll(req, res);
    
        expect(spy).toHaveBeenCalled();
        expect(ProductModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });

    it('should call ProductController.findAll method with only minCost value', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll')
                        .mockImplementation(
                            () => Promise.resolve(newProduct)
                        );
 
        req.query= {
            name : '',
            minCost: 50,
            maxCost: 0
        };
        await ProductController.findAll(req, res);
    
        expect(spy).toHaveBeenCalled();
        expect(ProductModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });
 
    it('should call ProductController.findAll method with only maxCost value', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll')
                        .mockImplementation(
                            () => Promise.resolve(newProduct)
                        );
 
        req.query= {
            name : '',
            minCost: 0,
            maxCost: 1000
        };
        await ProductController.findAll(req, res);
    
        expect(spy).toHaveBeenCalled();
        expect(ProductModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });

    it('should call ProductController.findAll method with both minCost and maxCost value', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll')
                        .mockImplementation(
                            () => Promise.resolve(newProduct)
                        );
 
        req.query= {
            name : '',
            minCost: 50,
            maxCost: 1000
        };

        await ProductController.findAll(req, res);
    
        expect(spy).toHaveBeenCalled();
        expect(ProductModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });

    it('should call ProductController.findAll method with name value', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll')
                        .mockImplementation(
                            () => Promise.resolve(newProduct)
                        );
 
        req.query= {
            name : 'iPhone',
            minCost: 0,
            maxCost: 0
        };
        
        await ProductController.findAll(req, res);
    
        expect(spy).toHaveBeenCalled();
        expect(ProductModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });
 
    it('should call ProductController.findAll method and ends with a error', async () => {
        const spy = jest.spyOn(ProductModel, 'findAll')
                      .mockImplementation(() => Promise.reject(
                                                 Error("This is an error."))
                      );
       
        req.query= {
            name : '',
            minCost: 0,
            maxCost: 0
        };

        await ProductController.findAll(req, res);               
        
        await expect(spy).toHaveBeenCalled();
        expect(ProductModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some Internal error while fetching all the products"
        });
    });
 });
 
 describe('ProductController.findOne', () => {
    
    beforeEach(() => {
        req.params= {
            id : 1
        }
    });
 
    it('should call ProductController.findOne method ', async () => {
       const spy = jest.spyOn(ProductModel, 'findByPk')
                      .mockImplementation(
                         () => Promise.resolve(newProduct)
                      );
       await ProductController.findOne(req, res);
 
       expect(spy).toHaveBeenCalled();
       expect(ProductModel.findByPk).toHaveBeenCalledWith(1);
       expect(res.status).toHaveBeenCalledWith(200);
       expect(res.send).toHaveBeenCalledWith(newProduct);
    });
 
    it('should call ProductController.findOne method and ends with a error', async () => {
       const spy = jest.spyOn(ProductModel, 'findByPk')
                      .mockImplementation(() => Promise.reject(
                                                 Error("This is an error."))
                      );
       
       await ProductController.findOne(req, res);               
    
       await expect(spy).toHaveBeenCalled();
       expect(ProductModel.findByPk).toHaveBeenCalledWith(1);
       expect(res.status).toHaveBeenCalledWith(500);
       expect(res.send).toHaveBeenCalledWith({
          message: "Some Internal error while fetching the product based on the id"
       });
    });
 });
 
 describe('ProductController.update', () => {
    
    beforeEach(() => {
       req.body = newProduct;
       delete req.body.cost;
       req.params= {
          id : 1
       }
    });
 
    const queryParam = {
       returning: true,
       where: { id: 1 }
    };
 
    it('should call ProductController.update method and update product details in DB', async () => {
       const spyOnUpdate = jest.spyOn(ProductModel, 'update')
                      .mockImplementation(
                         () => Promise.resolve(newProduct)
                      );
       const spyOnFindByPk = jest.spyOn(ProductModel, 'findByPk')
                      .mockImplementation(
                         () => Promise.resolve(newProduct)
                      );
       await ProductController.update(req, res);
 
       await expect(spyOnUpdate).toHaveBeenCalled();
       await expect(spyOnFindByPk).toHaveBeenCalled();
       expect(ProductModel.update).toHaveBeenCalledWith(newProduct, queryParam);
       expect(res.status).toHaveBeenCalledWith(200);
       expect(res.send).toHaveBeenCalledWith(newProduct);
    });
 
    it('should call ProductController.update method and ends with a error thrown by findByPk method ', async () => {
       const spyOnUpdate = jest.spyOn(ProductModel, 'update')
                      .mockImplementation(
                         () => Promise.resolve(newProduct)
                      );
       const spyOnFindByPk = jest.spyOn(ProductModel, 'findByPk')
                      .mockImplementation(
                         () => Promise.reject(
                                  Error("This is an error."))
                      );
       
       await ProductController.update(req, res);               
    
       await expect(spyOnUpdate).toHaveBeenCalled();
       await expect(spyOnFindByPk).toHaveBeenCalled();
       expect(ProductModel.update).toHaveBeenCalledWith(newProduct, queryParam);
       expect(res.status).toHaveBeenCalledWith(500);
       expect(res.send).toHaveBeenCalledWith({
          message: "Some Internal error while fetching the product based on the id"
       });
    });
 
    it('should call ProductController.update method and ends with a error thrown by update method ', async () => {
       const spyOnUpdate = jest.spyOn(ProductModel, 'update')
                      .mockImplementation(
                         () => Promise.reject(
                                  Error("This is an error."))
                      );
       // no spy needed for findByPk method as the code will be unreachable once update methods throw an error 
       
       await ProductController.update(req, res);               
    
       await expect(spyOnUpdate).toHaveBeenCalled();
       expect(ProductModel.update).toHaveBeenCalledWith(newProduct, queryParam);
       expect(res.status).toHaveBeenCalledWith(500);
       expect(res.send).toHaveBeenCalledWith({
          message: "Some Internal error while fetching the product based on the id"
       });
    });
 });
 
 describe('ProductController.delete', () => {
    
    beforeEach(() => {
       req.params= {
          id : 1
       }
    });
 
    const queryParam = {
       where: {
          id: 1
       }
    };
 
    it('should call ProductController.delete method ', async () => {
       const spy = jest.spyOn(ProductModel, 'destroy')
                      .mockImplementation(
                         () => Promise.resolve()
                      );
       await ProductController.delete(req, res);
 
       expect(spy).toHaveBeenCalled();
       expect(ProductModel.destroy).toHaveBeenCalledWith(queryParam);
       expect(res.status).toHaveBeenCalledWith(200);
       expect(res.send).toHaveBeenCalledWith({
          message: "Successfully deleted the product"
       });
    });
 
    it('should call ProductController.delete method and ends with a error', async () => {
       const spy = jest.spyOn(ProductModel, 'destroy')
                      .mockImplementation(() => Promise.reject(
                                                 Error("This is an error."))
                      );
       
       await ProductController.delete(req, res);               
    
       await expect(spy).toHaveBeenCalled();
       expect(ProductModel.destroy).toHaveBeenCalledWith(queryParam);
       expect(res.status).toHaveBeenCalledWith(500);
       expect(res.send).toHaveBeenCalledWith({
          message: "Some Internal error while deleting the product based on the id"
       });
    });
 });

describe('ProductController.getProductsUnderCategory', () => {
    
    beforeEach(() => {
        req.params= {
            categoryId : 1
        }
    });
 
    const queryParam = {
        where: {
            categoryId: 1
        }
    };
 
    it('should call ProductController.delete method ', async () => {
       const spy = jest.spyOn(ProductModel, 'findAll')
                      .mockImplementation(
                         () => Promise.resolve(newProduct)
                      );
       await ProductController.getProductsUnderCategory(req, res);
 
       expect(spy).toHaveBeenCalled();
       expect(ProductModel.findAll).toHaveBeenCalledWith(queryParam);
       expect(res.status).toHaveBeenCalledWith(200);
       expect(res.send).toHaveBeenCalledWith(newProduct);
    });
 
    it('should call ProductController.delete method and ends with a error', async () => {
       const spy = jest.spyOn(ProductModel, 'findAll')
                      .mockImplementation(() => Promise.reject(
                                                 Error("This is an error."))
                      );
       
       await ProductController.getProductsUnderCategory(req, res);               
    
       await expect(spy).toHaveBeenCalled();
       expect(ProductModel.findAll).toHaveBeenCalledWith(queryParam);
       expect(res.status).toHaveBeenCalledWith(500);
       expect(res.send).toHaveBeenCalledWith({
          message: "Some Internal error while fetching  products based on the category id "
       });
    });
 });
