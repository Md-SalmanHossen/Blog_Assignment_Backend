
let blogs=[];

export const createBlog=(req,res)=>{
  try{
    const {title,content,author}=req.body;
   if(!title || !content){
      return res.status(400).json({
         message:"title and content required"
      })
   }
   const newBlog={
      id:Date.now().toString(),
      title,
      content,
      author: author || "Anonymous",
      createdAt:new Date()
   }
   blogs.push(newBlog);

   res.status(201).json({
      message:"Blog Created successfully",
      blog:newBlog
   })

  }catch(error){
   res.status(500).json({
      message:"Server error",
      error:error.message
   })
  }
}

export const getBlog=(req,res)=>{
  try{
    if(blogs.length===0){
      return res.status(404).json({
         message:"No Blog found"
      });
   }else{
      return res.status(200).json({
         message:"All Blogs Fetched successfully",
         blog:blogs,
      });
   }
  }catch(error){
   res.status(500).json({
      message:"Server error",
      error:error.message
   })
  }
}

export const blogById=(req,res)=>{
  try{
      const {id}=req.params;
      const getBlog=blogs.find(blog=>blog.id===id);
   if(!getBlog){
      return res.status(404).json({
         message:"blog not found"
      })
   }else {
      return res.status(200).json({
         message:"get blog successfully",
         blog:getBlog,
      })
   }

  }catch(error){
   res.status(500).json({
      message:"server error",
      message:error.message
   })
  }
}

export const updateBlog=(req,res)=>{
   try {
      const {id}=req.params
      const blog=blogs.find(blog=>blog.id===id);
   if(!blog){
      return res.status(404).json({
         message:"not found"
      });
   }
      const {title,content}=req.body;
      if(title) blog.title=title;
      if(content) blog.content=content;
   
   
      return res.status(200).json({
         message:"updated successfully",
         blog:blog,
      })
   } catch (error) {
      res.status(500).json({
         message:'Server error',
         error:error.message
      })
   }
}

export const deleteBlog=(req,res)=>{
   try {
      const {id} =req.params;
      const index=blogs.findIndex(blog=>blog.id===id);
   if(index===-1){
      return res.status(404).json({
      message: "Blog not found"
    }); 
   }

   const deletedBlog=blogs.splice(index,1)[0];

   return res.status(200).json({
    message: "Blog deleted successfully",
    blog:deletedBlog
  });
   } catch (error) {
      res.status(500).json({
         message:"Server error",
         error:error.message
      })
   }
}

