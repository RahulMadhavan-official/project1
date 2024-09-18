import multer from "multer";
import express from "express";

const router = express.Router();
router.use(express.static('public'));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/')
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null,file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/',upload.single('file'),(req,res)=>{
    res.status(200).json({ url:`http://localhost:3000/image/${req.file.originalname}`})
})
  
  export default router


