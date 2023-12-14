import { Model } from 'mongoose';

export type TfullNameType = {
  firstName: string;
  lastName: string;
};

export type Torders = {
  productName: string;
  price: number;
  quantity: number;
};

export type UserInterface = {
  userId: number;
  username: string;
  password: string;
  fullName: TfullNameType;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: Torders[];
};

export interface UserInstanceModel extends Model<UserInterface> {
  isUserExists(userId: number): Promise<UserInterface | null>;
}
