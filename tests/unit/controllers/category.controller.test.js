const CategoryController = require('../../../controllers/category.controller');
const Models = require('../../../models');
const CategoryModel = Models.category;
const newCategory = require('../../mock-data/new-category.json');
const { mockRequest, mockResponse } = require('../interceptor');

let req, res;

beforeEach(() => {
   req = mockRequest();
   res = mockResponse();
});

describe('CategoryController.create', () => {
   
   beforeEach(() => {
      req.body = newCategory;
   });

   it('should call CategoryController.create method and add new category in DB', async () => {
      const spy = jest.spyOn(CategoryModel, 'create')
                     .mockImplementation(
                        (newCategory) => Promise.resolve(newCategory)
                     );
      await CategoryController.create(req, res);

      expect(spy).toHaveBeenCalled();
      expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(newCategory);
   });

   it('should call CategoryController.create method and ends with a error', async () => {
      const spy = jest.spyOn(CategoryModel, 'create')
                     .mockImplementation(() => Promise.reject(
                                                Error("This is an error."))
                     );
      
      await CategoryController.create(req, res);               
   
      await expect(spy).toHaveBeenCalled();
      expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
         message: "Some Internal error while storing the category!"
      });
   });
});

describe('CategoryController.findAll', () => {

   it('should call CategoryController.findAll method with empty query value', async () => {
      const spy = jest.spyOn(CategoryModel, 'findAll')
                     .mockImplementation(
                        () => Promise.resolve(newCategory)
                     );

      req.query= {
         name : ''
      };
      await CategoryController.findAll(req, res);

      expect(spy).toHaveBeenCalled();
      expect(CategoryModel.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(newCategory);
   });

   it('should call CategoryController.findAll method with a query value', async () => {
      const queryParam = {
         where: {
            name: 'Electronics'
         }
      };
      const spy = jest.spyOn(CategoryModel, 'findAll')
                     .mockImplementation(
                        (queryParam) => Promise.resolve(newCategory)
                     );
                     
      req.query= {
         name : 'Electronics'
      }
      await CategoryController.findAll(req, res);

      expect(spy).toHaveBeenCalled();
      expect(CategoryModel.findAll).toHaveBeenCalledWith(queryParam);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(newCategory);
   });

   it('should call CategoryController.findAll method and ends with a error', async () => {
      const spy = jest.spyOn(CategoryModel, 'findAll')
                     .mockImplementation(() => Promise.reject(
                                                Error("This is an error."))
                     );
      
      await CategoryController.findAll(req, res);               
   
      await expect(spy).toHaveBeenCalled();
      expect(CategoryModel.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
         message: "Some Internal error while fetching all the categories"
      });
   });
});

describe('CategoryController.findOne', () => {
   
   beforeEach(() => {
      req.params= {
         id : 1
      }
   });

   it('should call CategoryController.findOne method ', async () => {
      const spy = jest.spyOn(CategoryModel, 'findByPk')
                     .mockImplementation(
                        () => Promise.resolve(newCategory)
                     );
      await CategoryController.findOne(req, res);

      expect(spy).toHaveBeenCalled();
      expect(CategoryModel.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(newCategory);
   });

   it('should call CategoryController.findOne method and ends with a error', async () => {
      const spy = jest.spyOn(CategoryModel, 'findByPk')
                     .mockImplementation(() => Promise.reject(
                                                Error("This is an error."))
                     );
      
      await CategoryController.findOne(req, res);               
   
      await expect(spy).toHaveBeenCalled();
      expect(CategoryModel.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
         message: "Some Internal error while fetching the category based on the id"
      });
   });
});

describe('CategoryController.update', () => {
   
   beforeEach(() => {
      req.body = newCategory;
      req.params= {
         id : 1
      }
   });

   const queryParam = {
      returning: true,
      where: { id: 1 }
   };

   it('should call CategoryController.update method and update category details in DB', async () => {
      const spyOnUpdate = jest.spyOn(CategoryModel, 'update')
                     .mockImplementation(
                        () => Promise.resolve(newCategory)
                     );
      const spyOnFindByPk = jest.spyOn(CategoryModel, 'findByPk')
                     .mockImplementation(
                        () => Promise.resolve(newCategory)
                     );
      await CategoryController.update(req, res);

      await expect(spyOnUpdate).toHaveBeenCalled();
      await expect(spyOnFindByPk).toHaveBeenCalled();
      expect(CategoryModel.update).toHaveBeenCalledWith(newCategory, queryParam);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(newCategory);
   });

   it('should call CategoryController.update method and ends with a error thrown by findByPk method ', async () => {
      const spyOnUpdate = jest.spyOn(CategoryModel, 'update')
                     .mockImplementation(
                        () => Promise.resolve(newCategory)
                     );
      const spyOnFindByPk = jest.spyOn(CategoryModel, 'findByPk')
                     .mockImplementation(
                        () => Promise.reject(
                                 Error("This is an error."))
                     );
      
      await CategoryController.update(req, res);               
   
      await expect(spyOnUpdate).toHaveBeenCalled();
      await expect(spyOnFindByPk).toHaveBeenCalled();
      expect(CategoryModel.update).toHaveBeenCalledWith(newCategory, queryParam);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
         message: "Some Internal error while fetching the category based on the id"
      });
   });

   it('should call CategoryController.update method and ends with a error thrown by update method ', async () => {
      const spyOnUpdate = jest.spyOn(CategoryModel, 'update')
                     .mockImplementation(
                        () => Promise.reject(
                                 Error("This is an error."))
                     );
      // no spy needed for findByPk method as the code will be unreachable once update methods throw an error 
      
      await CategoryController.update(req, res);               
   
      await expect(spyOnUpdate).toHaveBeenCalled();
      expect(CategoryModel.update).toHaveBeenCalledWith(newCategory, queryParam);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
         message: "Some Internal error while fetching the category based on the id"
      });
   });
});

describe('CategoryController.delete', () => {
   
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

   it('should call CategoryController.delete method ', async () => {
      const spy = jest.spyOn(CategoryModel, 'destroy')
                     .mockImplementation(
                        () => Promise.resolve()
                     );
      await CategoryController.delete(req, res);

      expect(spy).toHaveBeenCalled();
      expect(CategoryModel.destroy).toHaveBeenCalledWith(queryParam);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
         message: "Successfully deleted the category"
      });
   });

   it('should call CategoryController.delete method and ends with a error', async () => {
      const spy = jest.spyOn(CategoryModel, 'destroy')
                     .mockImplementation(() => Promise.reject(
                                                Error("This is an error."))
                     );
      
      await CategoryController.delete(req, res);               
   
      await expect(spy).toHaveBeenCalled();
      expect(CategoryModel.destroy).toHaveBeenCalledWith(queryParam);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
         message: "Some Internal error while deleting the category based on the id"
      });
   });
});