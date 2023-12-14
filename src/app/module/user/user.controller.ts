import { Request, Response } from "express";
import { UserServices } from "./student.service";


const createUser = async(req:Request,res:Response)=>{
    try{
        const user = req.body

        const result = await UserServices.createUserIntoDB(user)
    
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        })
    }catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to create User!",
            data: err
        })
    }
}

const getAllUser = async(req:Request, res:Response)=>{
    try{
        const result = await UserServices.getAllUserFromDB()
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })
    }catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to fetch User!",
            data: err
        })
    }
}

const getSingleUser= async(req:Request, res:Response)=>{
    try{
        const userId = parseInt(req.params.userId);
        const result = await UserServices.getSingleUserFromDB(userId)
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        })
    }catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to fetch User!",
            data: err
        })
    }
}

const updateUser = async(req:Request,res:Response)=>{
    try{
        const newUser = req.body
        const userId = parseInt(req.params.userId);

        const result = await UserServices.updateSingleUserFromDB(newUser,userId)

        if(result){
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result
            })
        }else{
            res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        }
    
        
    }catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to Update User!",
            data: err
        })
    }
}


export const UserControllers ={
    createUser,
    getAllUser,
    getSingleUser,
    updateUser
}