import { Request, Response } from 'express';
import { UserServices } from './student.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to create User!',
      error: err,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch User!',
      data: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User Fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch User!',
      data: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const userId = parseInt(req.params.userId);

    const result = await UserServices.updateSingleUserFromDB(newUser, userId);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to Update User!',
      data: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserServices.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to Delete User!',
      data: err,
    });
  }
};

const newOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const userId = parseInt(req.params.userId);

    await UserServices.addNewOrderInUser(newOrder, userId);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to Insert Order!',
      data: err,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserServices.getAllOrder(userId);
    const orders = { orders: result };
    res.status(200).json({
      success: true,
      message: 'Orders Fetched successfully!',
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch Orders!',
      data: err,
    });
  }
};

const calculateOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserServices.calculateOrderPrice(userId);
    const total = { totalPrice: result };
    res.status(200).json({
      success: true,
      message: 'Orders Fetched successfully!',
      data: total,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch Orders!',
      data: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  newOrder,
  getOrders,
  calculateOrder,
};
