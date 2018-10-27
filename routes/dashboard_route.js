var express = require("express");
var router = express.Router();
var User = require("../model/user");
var Blog = require("../model/blog");
router.get("/blogs/dashboard",function(req,res){
    res.render("dashboard",{ user: req.user});
   });
 //public profile
 
 
 //update dashboard
 router.get("/blogs/dashboard/edit_dashboard",function(req,res){
      res.render("edit_dashboard",{user: req.user});
    
 });
 router.put("/blogs/dashboard",function(req,res){
     console.log("put");
     // User.findByIdAndUpdate(req.params.id,req.user,function(err){
     //     if(err){
     //         res.redirect("/blogs/dashboard/edit_dashboard");
 
     //     }
     //     else{
     //         res.redirect("/blogs/dashboard");
     //     }
     // });
 });
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blogs/login");
}

 module.exports = router;