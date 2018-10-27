var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../model/user");
var Blog = require("../model/blog");
//sign up
router.get("/blogs/register",function(req,res){
    res.render("register");
   });
   
   router.post("/blogs/register",function(req,res){
        var newUser=new User({
           username: req.body.username,
           name: req.body.name,
           email:req.body.email,
           avatar: req.body.avatar
       });
        //eval(require("locus"));
       User.register(newUser,req.body.password,function(err,user){
            if(err){
                console.log(err);
                return res.render("register");
            } 
            passport.authenticate("local")(req,res,function(){
               res.redirect("/blogs/");
            });      
       });
      });
   
   //login
   
   router.get("/blogs/login",function(req,res){
       
    if(req.isAuthenticated()){
       
        res.redirect("/");
       }else{
        res.render("login");
      }
    
   });
   
   //logout
   router.get("/blogs/logout",function(req,res){
       req.logout();
       res.redirect("/");
     });
   // restful routes
   router.post("/blogs/login",passport.authenticate("local",{
               successRedirect: "/blogs/dashboard",
               failureRedirect: "/blogs/login"
   }),function(req,res){
   
   });
  
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blogs/login");
}

   module.exports = router;