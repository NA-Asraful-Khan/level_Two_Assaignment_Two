import { Schema, model } from 'mongoose';
import { UserInstanceModel, UserInterface,  } from './user.interface';


const userSchema = new Schema<UserInterface,UserInstanceModel>({
    userId: {type:Number,unique: true, required:true},
    username:{type:String,unique: true, required:true},
    password: {type:String, required:true},
    fullName: {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true}
    },
    age: {type:Number, required:true},
    email: {type:String,unique: true, required:true},
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

  userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject._id;
    delete userObject.orders;
    return userObject;
  };

  userSchema.statics.isUserExists= async function(userId:number){
    const existingUser = await UserModel.findOne({userId})
    return !!existingUser
  }


  export const UserModel = model<UserInterface, UserInstanceModel>('UserModel', userSchema)