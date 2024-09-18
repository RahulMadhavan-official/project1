import Product from '../../db/models/productSchema.js';
import express from 'express';


const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const products = await Product.find();
        return res.status(200).json(products);
    }catch(e) {
        return res.status(500).json(e);
    }
})

router.post('/create',async(req,res)=>{
    try{
        const body = req.body;
        const product = await Product.findOne({name : body.name})
        if(product){
           return res.status(200).json({message : 'product already exist // give another name'})
        }
        const newproduct = await Product.create(body);
        res.status(200).json(newproduct);
    }catch(e){
        return res.status(500).json(e)
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const body = {...req.body};
        const update = await Product.findByIdAndUpdate(id , body);
        res.status(200).json(update);
    }catch(e){
        return res.status(300).json(e)
    }
})

router.delete('/:id',async(req,res)=>{
   try{
    const {id} = req.params;
    const remove = await Product.findByIdAndDelete(id)
    res.status(200).json({message : 'product delete successfully',remove})
   }catch(error){
    return res.status(405).json(error);
   }
})

router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(e){
        return res.status(200).json(e);
    }
})

export default  router;