const jwt = require("jsonwebtoken");
const config = require('../../../configs/auth.config');
const AuthController = require('../../../controllers/auth.controller');
const Models = require('../../../models');
const UserModel = Models.user;
const RoleModel = Models.role;
const newUser = require('../../mock-data/new-user.json');
const userData = require('../../mock-data/user-data.json');
const { mockRequest, mockResponse } = require('../interceptor');
const bcrypt = require("bcryptjs");

let req, res;

beforeEach(() =>{
    req = mockRequest();
    res = mockResponse();
})

describe('AuthController.signup', () => {

    beforeEach(() => {
        req.body = newUser;
    });

    const resFromCreate = {
        setRoles: async () => Promise.resolve(),
    }

    it('should return user registered success message', async () => {
        const spyOnCreate = jest.spyOn(UserModel, 'create')
                                .mockImplementation(() => Promise.resolve(resFromCreate)
                                );
        const spyOnFindAll = jest.spyOn(RoleModel, 'findAll')
                                .mockImplementation(() => Promise.resolve()
                                );

        await AuthController.signup(req, res);
        
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(UserModel.create).toHaveBeenCalled();
        await expect(RoleModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ message: "User registered successfully!" });    
    });

    it('should return user registered success message when no roles is passed', async () => {
        const spyOnCreate = jest.spyOn(UserModel, 'create')
                                .mockImplementation(() => Promise.resolve(resFromCreate)
                                );
        const spyOnFindAll = jest.spyOn(RoleModel, 'findAll')
                                .mockImplementation(() => Promise.resolve()
                                );
        req.body.roles = null;

        await AuthController.signup(req, res);
        
        await expect(spyOnCreate).toHaveBeenCalled();
        //await expect(spyOnFindAll).not.toHaveBeenCalled();
        await expect(UserModel.create).toHaveBeenCalled();
        await expect(RoleModel.findAll).toHaveBeenCalledTimes(1);//in last test case
        await expect(res.send).toHaveBeenCalledWith({ message: "User registered successfully!" });    
    });

    it('should return error message', async () => {
        const spyOnCreate = jest.spyOn(UserModel, 'create')
                                .mockImplementation(() => Promise.reject(Error('This is an Error'))
                                );
        const spyOnFindAll = jest.spyOn(RoleModel, 'findAll')
                                .mockImplementation(() => Promise.resolve()
                                );
        req.body.roles = null;

        await AuthController.signup(req, res);
        
        await expect(spyOnCreate).toHaveBeenCalled();
        //await expect(spyOnFindAll).not.toHaveBeenCalled();
        await expect(UserModel.create).toHaveBeenCalled();
        //await expect(RoleModel.findAll).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: "This is an Error" });    
    });
});

describe('AuthController.signin', () => {

    beforeEach(() => {
        req.body = userData;
    });

    const hashedPass = bcrypt.hashSync(userData.password, 8);

    const roles = [
        {
            id: 1,
            name: 'user'
        }
    ];

    const resFromFindOne = {
        ...userData,
        password: hashedPass,
        getRoles: async () => Promise.resolve(roles),
    };

    const token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    const resFromSignIn = {
        accessToken: token,
        email: "test@email.com",
        id: 1,
        roles: [
          "ROLE_USER",
        ],
        username: "testuser",
    }

    it('should return user info with access token', async () => {
        const spyOnFindOne = jest.spyOn(UserModel, 'findOne')
                                .mockImplementation(() => Promise.resolve(resFromFindOne)
                                );
        const spyOnFindAll = jest.spyOn(RoleModel, 'findAll')
                                .mockImplementation(() => Promise.resolve()
                                );
        await AuthController.signin(req, res);
        
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(UserModel.findOne).toHaveBeenCalled();
        await expect(UserModel.findOne).toHaveBeenCalledTimes(1);
        //await expect(spyOnFindAll).not.toHaveBeenCalled();
        //await expect(RoleModel.findAll).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();    
    });

    it('should return user not found message', async () => {
        const spyOnFindOne = jest.spyOn(UserModel, 'findOne')
                                .mockImplementation(() => Promise.resolve(null)
                                );
        await AuthController.signin(req, res);
        
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(UserModel.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: "User Not found." });    
    });

    it('should return invalid password message', async () => {
        const spyOnFindOne = jest.spyOn(UserModel, 'findOne')
                                .mockImplementation(() => Promise.resolve(resFromFindOne)
                                );
        req.body.password = '12345'; //incoorect password
        await AuthController.signin(req, res);
        
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(UserModel.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            accessToken: null,
            message: "Invalid Password!"
        });    
    });

    it('should return error message', async () => {
        const spyOnFindOne = jest.spyOn(UserModel, 'findOne')
                                .mockImplementation(() => Promise.reject(Error('This is an Error'))
                                );
        await AuthController.signin(req, res);
        
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(UserModel.findOne).toHaveBeenCalled();
        await expect(UserModel.findOne).toHaveBeenCalledTimes(4);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: "This is an Error" });    
    });
});


