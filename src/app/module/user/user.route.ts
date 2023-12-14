import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/',UserControllers.createUser)

router.get('/', UserControllers.getAllUser)

router.get('/:userId',UserControllers.getSingleUser)
router.get('/:userId/orders',UserControllers.getOrders)
router.get('/:userId/orders/total-price',UserControllers.calculateOrder)

router.put('/:userId',UserControllers.updateUser)
router.put('/:userId/orders',UserControllers.newOrder)

router.delete('/:userId',UserControllers.deleteUser)



export const UserRoutes=router