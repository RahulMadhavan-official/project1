import userRoutes from './userRoutes/index.js'
import productRoutes from "./productRoutes/index.js";
import orderRoutes from './orderRoutes/index.js';
import imageRoutes from './imageRoutes/index.js'
import orderlistRoutes from './orderlistRoutes/index.js'
import db from '../db/dbConnection.js';
import express from "express";

const router = express.Router();

router.use('/user',userRoutes);
router.use('/products',productRoutes);
router.use('/order',orderRoutes);
router.use('/orderlist',orderlistRoutes)
router.use('/image',imageRoutes);

export default router;