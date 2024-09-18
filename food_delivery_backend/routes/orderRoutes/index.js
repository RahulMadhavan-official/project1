import Order from "../../db/models/orderSchema.js";
import Product from "../../db/models/productSchema.js";
import express from 'express';


const router = express.Router();

router.get('/:id',async(req,res)=>{
    try{
        const userId = req.params.id;
        const orders = await Order.find({user : userId});
        res.status(200).json(orders);
    }catch(e){
        return res.status(401).json(e);
    }
});

router.patch('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const body = {...req.body};
        const update = await Order.findByIdAndUpdate(id , body);
        res.status(200).json(update);
    }catch(e){
        return res.status(300).json(e)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
     const {id} = req.params;
     const remove = await Order.findByIdAndDelete(id)
     res.status(200).json({message : 'product delete successfully',remove})
    }catch(error){
     return res.status(400).json(error);
    }
 })
router.post('/neworder',async(req,res)=>{
   try{
    const body = req.body;
   const order = await Order.create(body);
   res.status(200).json(order);
   }catch(e){
    return res.status(400).json(e)
   }
})
 export default router;