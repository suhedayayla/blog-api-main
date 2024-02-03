const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const Post = require("../models/Post");


//Update
                                                      //creating user so use post && 
                                                      //create any user,connect DB and Create new one 
                                                      //its gonne return us response so we dont know this time duration so its ASYNC funct.
 router.put("/:id",async (req,res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }   
    try{  
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set:req.body, //update everthing inside req.body.
        }, {new:true});
        res.status(200).json(updatedUser);       

    } catch (err){
        res.status(500).json(err);
    } } else{
        res.status(401).json("Yalnızca kendi hesabınızı güncelleyebilirsiniz.")
    ;
}
 })     



//Delete

router.delete("/:id",async (req,res) => {  //aşağıdaki req.params.iddeki id burdan geliyor.
    if(req.body.userId === req.params.id){
        try{

            const user = await User.findById(req.params.id);
  
      
    try{  
        await Post.deleteMany({username:user.username});
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Kullanıcı silindi.");       

    } catch (err){
        res.status(500).json(err);
    }
      } catch(err){
        res.status(404).json("Kullanıcı bulunamadı");

      }
} else{
        res.status(401).json("Yalnızca kendi hesabınızı silebilirsiniz.")
    ;
}
 });

 //Get User

 router.get("/:id",async (req,res) => {
    try{
        const user= await User.findById(req.params.id)
        const {password, ...others}=user._doc;
        res.status(200).json(others);

    }catch(err){
        res.status(500).json(err);

    }
 })


module.exports = router
