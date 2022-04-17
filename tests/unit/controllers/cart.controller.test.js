const CartController = require('../../../controllers/cart.controller');
const Models = require('../../../models');
const CartModel = Models.cart;
const ProductModel = Models.product;
const newCartItems = require('../../mock-data/new-cart-items.json');
const cartUpdateItems = require('../../mock-data/cart-update-items.json');
const { mockRequest, mockResponse } = require('../interceptor');

let req, res;

beforeEach(() => {
   req = mockRequest();
   res = mockResponse();
});

describe('CartController.create', () => {
   
   beforeEach(() => {
      req.userId = 1;
      req.body = newCartItems;
   });

   const param = {
      userId: 1
   }

   it('should call CartController.create method and add new category in DB', async () => {
      const spy = jest.spyOn(CartModel, 'create')
                     .mockImplementation(
                        (param) => Promise.resolve(param)
                     );
      await CartController.create(req, res);

      expect(spy).toHaveBeenCalled();
      expect(CartModel.create).toHaveBeenCalledWith(param);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(param);
   });

   it('should call CartController.create method and ends with a error', async () => {
      const spy = jest.spyOn(CartModel, 'create')
                     .mockImplementation(() => Promise.reject(
                                                Error("This is an error."))
                     );
      
      await CartController.create(req, res);               
   
      await expect(spy).toHaveBeenCalled();
      expect(CartModel.create).toHaveBeenCalledWith(param);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
         message: "Some internal server error happened"
      });
   });
});

describe('CartController.getCart', () => {

   beforeEach(() => {
      req.params = {
         cartId: 1
      };
   });

   const resFromFindByPk = {
      id: 1,
      getProducts: () => Promise.resolve(newCartItems.Items)
   }

   const resFromGetCart = {
      id: 1,
      productsSelected: newCartItems.Items,
      cost: 130000
   }

   it('should call CartController.getCart method ', async () => {
      const spyOnFindByPk = jest.spyOn(CartModel, 'findByPk')
                     .mockImplementation(
                        () => Promise.resolve(resFromFindByPk)
                     );

      await CartController.getCart(req, res);

      await expect(spyOnFindByPk).toHaveBeenCalledWith(1);
      expect(CartModel.findByPk).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(resFromGetCart);
   });

});

describe('CartController.update', () => {
   
   beforeEach(() => {
      req.body = {
         productIds : 1
      };
      req.params= {
         id : 1
      }
   });

   const resFromFindByPk = {
      id: 1,
      getProducts: () => Promise.resolve(newCartItems.Items),
      setProducts: (newItems) => Promise.resolve()
   }

   const resFromFindAll = {
      items: [
         cartUpdateItems
      ]
   }

   const resFromUpdate = {
      id: 1,
      productsSelected: newCartItems.Items,
      cost: 130000
   }

   it('should call CartController.update method and update category details in DB', async () => {
      const spyOnFindByPk = jest.spyOn(CartModel, 'findByPk')
                     .mockImplementation(
                        () => Promise.resolve(resFromFindByPk)
                     );
      const spyOnFindAll = jest.spyOn(ProductModel, 'findAll')
                     .mockImplementation(
                        () => Promise.resolve(resFromFindAll)
                     );
            
      await CartController.update(req, res);

      await expect(spyOnFindAll).toHaveBeenCalled();
      await expect(spyOnFindByPk).toHaveBeenCalled();
      await expect(CartModel.findByPk).toHaveBeenCalled();
      await expect(res.send).toHaveBeenCalledWith(resFromUpdate);
      expect(res.status).toHaveBeenCalledWith(200);
   });

   it('should call CartController.update method and ends with a error thrown by Product.findAll method ', async () => {
      const spyOnFindByPk = jest.spyOn(CartModel, 'findByPk')
                     .mockImplementation(
                        () => Promise.resolve(resFromFindByPk)
                     );
      const spyOnFindAll = jest.spyOn(ProductModel, 'findAll')
                     .mockImplementation(
                        () => Promise.resolve(null)
                     );
            
      await CartController.update(req, res);

      await expect(spyOnFindAll).toHaveBeenCalled();
      await expect(spyOnFindByPk).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
         message: "item trying to be added doesn't exist"
     });
   });

});

