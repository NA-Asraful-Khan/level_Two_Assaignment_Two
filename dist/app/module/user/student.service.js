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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_model_1.UserModel.insertMany(userData);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({}, { fullName: 1, username: 1, age: 1, email: 1, address: 1, _id: 0 }).lean();
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.findOne({ userId }, { _id: 0, password: 0, orders: 0 }).lean();
        return result;
    }
    else {
        throw new Error('User Do not Exists!');
    }
});
const updateSingleUserFromDB = (user, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, user, {
            new: true,
            select: { password: 0, _id: 0, orders: 0 },
        }).lean();
        return result;
    }
    else {
        throw new Error('User Not Found!');
    }
});
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.deleteOne({ userId }).select('-password');
        return result;
    }
    else {
        throw new Error('User Not Found!');
    }
});
const addNewOrderInUser = (orderData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, { $push: { orders: orderData } }, { new: true }).lean();
        return result;
    }
    else {
        throw new Error('User Not Found!');
    }
});
const getAllOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.findOne({ userId }).lean();
        const allOrders = (result === null || result === void 0 ? void 0 : result.orders) || [];
        return allOrders;
    }
    else {
        throw new Error('User Do not Exists!');
    }
});
const calculateOrderPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExists(userId)) {
        const result = yield user_model_1.UserModel.findOne({ userId }).lean();
        const allOrders = (result === null || result === void 0 ? void 0 : result.orders) || [];
        const totalPrice = allOrders.reduce((acc, order) => {
            return acc + order.price * order.quantity;
        }, 0);
        return totalPrice;
    }
    else {
        throw new Error('User Do not Exists!');
    }
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB,
    addNewOrderInUser,
    getAllOrder,
    calculateOrderPrice,
};
