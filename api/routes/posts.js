const router = require("express").Router();
const Post = require("../models/Post");


//Create Post
                                                      //creating user so use post && 
                                                      //create any user,connect DB and Create new one 
                                                      //its gonne return us response so we dont know this time duration so its ASYNC funct.
 router.post("/",async (req,res) => {
    const newPost=new Post(req.body); 

    try{
         const savedPost = await newPost.save();
         res.status(200).json(savedPost);
    } catch (err){
        res.status(500).json(err)
    }


 })     



//Update Post

router.put("/:id",async (req,res) => { 
   try{
    const post= await Post.findById(req.params.id);
    if(post.username===req.body.username){//validate userid
        try{ 
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                {
                $set:req.body,//update everthing inside req.body.
            },
             {new:true} //mongodbweb siteda refreshing için
            );
                res.status(200).json(updatedPost);
            }catch(err){          
               res.status(500).json(err)
}
                
            } else {
                res.status(401).json("Sadece kendi tarifinizi düzenleyebilirsiniz!")
            }

    
   }catch(err) {
    res.status(500).json(err)
}

 });

 //DeletePost
 router.delete("/:id",async (req,res) => { 
    try{
     const post= await Post.findById(req.params.id);
     console.log('Post:', post);

     if (post.username===req.body.username){//validate userid
         try{ 
                await Post.findByIdAndDelete(req.params.id);
                 res.status(200).json("Gönderiniz silindi..");
             }catch(err){
                   res.status(500).json(err)

             }
                 
             } else {
                 res.status(401).json("Sadece kendi tarifinizi silebilirsiniz!")
             }
 
     
    }catch(err) {
     res.status(500).json(err)
 }
 
  });


 // Get Special Post
 router.get("/:id",async (req,res) => {
    try{
        const post= await Post.findById(req.params.id)
        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err);

    }
 })

//Get All Post

router.get("/",async (req,res) => {
    const username=req.query.user; //? işaretinde sonra usera bak diyoruz req.query derken.
    const catName=req.query.cat;//? işaretinde sonra categorye bak diyoruz req.query derken.

    try{
        let posts; //using let because posts inside changable
        if(username){
            posts=await Post.find({username}) //username'e göre postları bul.
        }
        else if(catName){
            posts= await Post.find({
                categories:{
                    $in:[catName],  //in methodu categoriesteki catnamei içeren postları getir diyor.
            },
        });
     }   else{
                posts= await Post.find(); //all postsları getir
            }
        res.status(200).json(posts);

    }catch(err){
        res.status(500).json(err);

    }
 })
// Search Posts
router.get("/posts/search/:searchTerm", async (req, res) => {
    try {
      const searchTerm = req.params.searchTerm;
      console.log(searchTerm);
      const searchResults = await Post.find({
        title: { $regex: new RegExp(searchTerm, "i") }, // i: case-insensitive
      });
  
      res.status(200).json(searchResults);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
module.exports = router
