import express from 'express';
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
// orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Features
orderRouter.post('/userorders', authUser, userOrders);

// verify payment
orderRouter.post('/verifystripe', authUser, verifyStripe);

export default orderRouter; 