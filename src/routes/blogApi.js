
import *as blogController from './../controllers/blogController.js';
import express from "express";

const router=express.Router();

router.get('/',blogController.getBlog);
router.post('/create',blogController.createBlog);
router.get('/:id',blogController.blogById);
router.put('/update/:id',blogController.updateBlog);
router.delete('/delete/:id',blogController.deleteBlog);



export default router;