import { Model } from "mongoose"

export type TfullNameType={
    firstName: string,
    lastName: string
}

export type  Torders= {
    productName: string,
    price: number,
    quantity: number
}

export type UserInterface = {
    userId: number,
    username: string,
    password: string,
    fullName: TfullNameType,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: string[],
    address: {
        street: string,
        city: string,
        country: string
    },
    orders: Torders[]
}


export type UserMethods ={
    isUserExists(userId:number):Promise<UserInterface | null>;
}

export type UserInstanceModel = Model<
    UserInterface,
    Record<string,never>,
    UserMethods
>;