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


export const UserControllers ={
    createUser
}