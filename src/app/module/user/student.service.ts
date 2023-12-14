import { Torders, UserInterface } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (userData:UserInterface)=>{

    if(await UserModel.isUserExists(userData.userId)){
        throw new Error('User already exists!')
    }

    const result = await UserModel.insertMany(userData);

    return result;
}

const getAllUserFromDB = async()=>{
    const result = await UserModel.find({},{fullName:1,username:1,age:1,email:1,address:1,_id:0}).lean();
    return result;
}

const getSingleUserFromDB = async(userId:number)=>{
    if(await UserModel.isUserExists(userId)){
        const result = await UserModel.findOne({userId},{_id:0,password:0,orders:0}).lean();
        return result;
    }else{
        throw new Error('User Do not Exists!')
    }
    
}

const updateSingleUserFromDB = async(user:UserInterface,userId:number)=>{
    if(await UserModel.isUserExists(userId)){
        const result = await UserModel.findOneAndUpdate({userId},user,{ new: true, select: { password: 0, _id: 0,orders:0 } }).lean();
        return result
    }else{
        throw new Error('User Not Found!')
    }
    
    
}

const deleteSingleUserFromDB = async(userId:number)=>{

    if(await UserModel.isUserExists(userId)){
        const result = await UserModel.deleteOne({userId}).select('-password');
    return result
    }else{
        throw new Error('User Not Found!')
    }
    
}



const addNewOrderInUser= async (orderData:Torders,userId:number)=>{

    if(await UserModel.isUserExists(userId)){
        const result = await UserModel.findOneAndUpdate({userId},{ $push: { orders: orderData } },{ new: true}).lean();
        return result
    }else{
        throw new Error('User Not Found!')
    }
}


const getAllOrder= async(userId:number)=>{
    if(await UserModel.isUserExists(userId)){
        const result = await UserModel.findOne({userId}).lean();
        const allOrders = result?.orders || [];
        return allOrders;
        
    }else{
        throw new Error('User Do not Exists!')
    }
    
}

const calculateOrderPrice= async(userId:number)=>{
    if(await UserModel.isUserExists(userId)){
        const result = await UserModel.findOne({userId}).lean();
        const allOrders = result?.orders || [];
        const totalPrice = allOrders.reduce((acc, order) => {
            return acc + order.price * order.quantity;
          }, 0);
        return totalPrice;
        
    }else{
        throw new Error('User Do not Exists!')
    }
    
}

export const UserServices ={
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB,
    addNewOrderInUser,
    getAllOrder,
    calculateOrderPrice
}