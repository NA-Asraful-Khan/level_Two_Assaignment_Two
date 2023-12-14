"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const order_validation_1 = __importDefault(require("./order.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParsedData = user_validation_1.default.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to create User!',
            error: err,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch User!',
            data: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User Fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to fetch User!',
            data: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const zodParsedData = user_validation_1.default.parse(newUser);
        const userId = parseInt(req.params.userId);
        const result = yield user_service_1.UserServices.updateSingleUserFromDB(zodParsedData, userId);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to Update User!',
            data: err,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_service_1.UserServices.deleteSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User Deleted successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to Delete User!',
            data: err,
        });
    }
});
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = req.body;
        const zodParsedData = order_validation_1.default.parse(newOrder);
        const userId = parseInt(req.params.userId);
        yield user_service_1.UserServices.addNewOrderInUser(zodParsedData, userId);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to Insert Order!',
            data: err,
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_service_1.UserServices.getAllOrder(userId);
        const orders = { orders: result };
        res.status(200).json({
            success: true,
            message: 'Orders Fetched successfully!',
            data: orders,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to fetch Orders!',
            data: err,
        });
    }
});
const calculateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_service_1.UserServices.calculateOrderPrice(userId);
        const total = { totalPrice: result };
        res.status(200).json({
            success: true,
            message: 'Orders Fetched successfully!',
            data: total,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to fetch Orders!',
            data: err,
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    newOrder,
    getOrders,
    calculateOrder,
};
