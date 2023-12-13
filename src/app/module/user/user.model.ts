import { Schema, model } from 'mongoose';
import { UserInterface } from './user.interface';


const userSchema = new Schema<UserInterface>({
    userId: {type:Number, required:true},
    username:{type:String, required:true},
    password: {type:String, required:true},
    fullName: {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true}
    },
    age: {type:Number, required:true},
    email: {type:String, required:true},
    isActive: {type:Boolean},
    hobbies: {type: [String]},
    address: {
        street: {type:String},
        city: {type:String},
        country: {type:String}
    },
    orders:[
        {
            productName: {type:String},
            price: {type:Number},
            quantity: {type:Number}
        }
    ]
  });

  export const UserModel = model<UserInterface>('UserModel', userSchema)