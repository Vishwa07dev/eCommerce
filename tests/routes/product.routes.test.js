const db = require('../../models');
const request = require('supertest');
const app = require('../../app');

const api_v1_endpoint = "/ecomm/api/v1";

describe('Post details of products endpoint', () => {

   it('should add new product', async () => {
      const res = await request(app)
         .post(api_v1_endpoint + '/categories')
         .send({
            name: "Electronics",
            description: "Category on eletronic items",
         })
      expect(res.statusCode).toEqual(201);
   })
   it('should add new product', async () => {
      const res = await request(app)
         .post(api_v1_endpoint + '/products')
         .send({
            name: "Sony Bravia",
            description: "This is an amazing TV",
            cost: 10000,
            categoryId: 1
         })
      expect(res.statusCode).toEqual(201);
   })
})
describe('Get details of products endpoint', () => {
   it('should get details of product', async () => {
      const res = await request(app)
         .get(api_v1_endpoint + '/products')
      expect(res.statusCode).toEqual(200);
   })
})

describe('Get details of one product endpoint', () => {
   it('should get details of one product', async () => {
      const res = await request(app)
         .get(api_v1_endpoint + '/products/2')
      expect(res.statusCode).toEqual(200);
   })
})

// describe('Put details of a product endpoint', () => {
//    it('should update details of a product', async () => {
//       const res = await request(app)
//          .put(api_v1_endpoint + '/products/1')
//          .send({
//             name: "Sony Bravia",
//             description: "This is an amazing TV",
//             cost: 11000,
//             categoryId: 1
//          })
//       expect(res.statusCode).toEqual(200);
//    })
// })

// describe('Get details of products under one category endpoint', () => {
//    it('should get details of all the products in given category', async () => {
//       const res = await request(app)
//          .get(api_v1_endpoint + '/categories/1/products')
//       expect(res.statusCode).toEqual(200);
//    })
// })

// describe('Delete product endpoint', () => {
//    it('should delete one product', async () => {  
//       const res = await request(app)
//          .delete(api_v1_endpoint + '/products/1')
//       expect(res.statusCode).toEqual(200);
//    })
// })




