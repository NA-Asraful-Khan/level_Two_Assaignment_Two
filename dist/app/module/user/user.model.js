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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    age: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    isActive: { type: Boolean },
    hobbies: { type: [String] },
    address: {
        street: { type: String },
        city: { type: String },
        country: { type: String },
    },
    orders: [
        {
            productName: { type: String },
            price: { type: Number },
            quantity: { type: Number },
        },
    ],
});
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject._id;
    delete userObject.orders;
    return userObject;
};
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.UserModel.findOne({ userId });
        return !!existingUser;
    });
};
exports.UserModel = (0, mongoose_1.model)('UserModel', userSchema);
