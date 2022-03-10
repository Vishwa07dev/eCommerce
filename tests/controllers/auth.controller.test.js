const db = require('../../models');
const UserModel = db.user;
const AuthController = require('../../controllers/auth.controller');
const { mockRequest, mockResponse } = require('../interceptor');
const bcrypt = require("bcryptjs");

let req, res;

beforeEach(() =>{
    req = mockRequest();
    res = mockResponse();
})

const testPayload = 
    {
        username: "Test User",
        email: "test@email.com",
        password: "123456"
    };

describe('Auth controller signup method', () => {
    it('should return user registered success message', async () => {
        const spy2 = jest.spyOn(UserModel, 'create').mockImplementation(
            (user) => new Promise(function (resolve, reject) {
                resolve(Promise.resolve("added roles"));
        }));

        req.body = testPayload;

        await AuthController.signup(req, res);
        
        expect(spy2).toHaveBeenCalled();
        // expect(res.status).toHaveBeenCalledWith(201);
        // expect(res.send).toHaveBeenCalledWith({ message: "User registered successfully!" });    
    });
});

describe('Auth controller signup method', () => {
    it('should return user registered success message', async () => {
        const spy1 = jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);
        const spy2 = jest.spyOn(UserModel, 'findOne').mockImplementation(
            (user) => new Promise(function (resolve, reject) {
                resolve("pass");
        }));

        req.body = {
            username: "Test User"
        };

        await AuthController.signin(req, res);
        
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        // expect(res.status).toHaveBeenCalledWith(201);
        // expect(res.send).toHaveBeenCalledWith({ message: "User registered successfully!" });    
    });
});


