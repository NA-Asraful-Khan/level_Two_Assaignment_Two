import { UserInterface } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user:UserInterface)=>{
    const result = await UserModel.insertMany(user);

    return result;
}

const getAllUserFromDB = async()=>{
    const result = await UserModel.find({},{fullName:1,username:1,age:1,email:1,address:1,_id:0}).lean();
    return result;
}

const getSingleUserFromDB = async(userId:number)=>{
    const result = await UserModel.findOne({userId},{_id:0,password:0,orders:0}).lean();
    return result;
}

const updateSingleUserFromDB = async(user:UserInterface,userId:number)=>{
    const result = await UserModel.findOneAndUpdate({userId},user,{ new: true }).select('-password');
    return result
}

export const UserServices ={
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB
}