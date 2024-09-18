import Orderlist from '../../db/models/orderlist.js';
import express from 'express';


const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const products = await Orderlist.find();
        return res.status(200).json(products);
    }catch(e) {
        return res.status(500).json(e);
    }
})
router.post('/orders',async(req,res)=>{
    try{
        const body = req.body;
        const neworder = await Orderlist.create(body);
        res.status(200).json(neworder);
    }catch(e){
        res.status(300).json(e)
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const userId = req.params.id;
        const orders = await Orderlist.find({user : userId});
        res.status(200).json(orders);
    }catch(e){
        return res.status(401).json(e);
    }
});
router.delete('/:id',async(req,res)=>{
    try{
     const userId = req.params.id;
     const remove = await Orderlist.deleteMany({user : userId})
     res.status(200).json({message : 'product delete successfully',remove})
    }catch(error){
     return res.status(200).json(error);
    }
 })


export default  router;