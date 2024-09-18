import User from '../../db/models/userSchema.js';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();

router.post('/signup', async(req,res)=>{
    try{
        const body = req.body;
        const user = await User.findOne({contact : body.contact, email: body.email})
        
        if(user){
            return ( res.status(200).json({message : 'user already exist'}))
        }
        
        if(body.password != body.confirmPassword){
           return  (res.status(200).json({message: 'password does not match'}))
        }
        const hashedPassword = await bcrypt.hash(body.password,2)
        body.password = hashedPassword;
        const adduser = await User.create(body);
        res.status(500).json(adduser)
    }
    catch(e){
         return( res.status(403).json({message: 'invalid contact Or email'}))
    }
})
router.post('/login',async(req,res)=>{
    try{
     const body = req.body;
     const user = await User.findOne({contact : body.contact})
     if(!user){
        return(res.status(200).json({message : 'password or contact is incorrect'}))
     }
     const isMatching = await bcrypt.compare(body.password,user.password)
     if(!isMatching){
        return(res.status(500).json({message : 'incorrect password'}))
     }
     const token = jwt.sign(
        {id: user._id , role: 'User'},
        'uftagkayf',
        {expiresIn : '7d'}

     )
     res.status(200).json({message : 'LoogedIn',token : token,user})
    }catch(e){
        return(res.status(500).json(e))
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const  user = await User.findById(id);
        res.status(200).json(user)
    }catch(e){
        res.status(200).json(e)
    }
})
router.get('/',async(req,res)=>{
    const users =await User.find();
    res.status(200).json(users)
})
router.get('/find',async(req,res)=>{
    if(req.query.contact){
        const user = await User.filter((item)=>{
            return item.contact == req.query.contact
            
        })
        res.status(200).json(user)
    }
   

    })
router.patch('/:id',async(req,res)=>{
   const {id}= req.params
   const body = {...req.body}
   const  user =await User.findByIdAndUpdate(id,body);
   res.status(200).json(user)
})
   

export default router;