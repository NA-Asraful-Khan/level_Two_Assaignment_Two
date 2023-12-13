
export type FullNameType={
    firstName: string,
    lastName: string
}

export type  Orders= {
    productName: string,
    price: number,
    quantity: number
}

export type UserInterface = {
    userId: number,
    username: string,
    password: string,
    fullName: FullNameType,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: string[],
    address: {
        street: string,
        city: string,
        country: string
    },
    orders: Orders[]
}