var express = require("express");
var router = express.Router();
var User = require("../model/user");
var Blog = require("../model/blog");
router.get("/", function(req,res){
    console.log("home");
    res.redirect("/blogs");
});
router.get("/blogs",function(req,res){
    Blog.find({}).sort('-created').exec(function(err, blogs) {
        if(err)
        {
            console.log("error");
        }
        else{
            res.render("home",{ blogs: blogs, currentUser: req.user});
        }

    });
  
   
  
});
// new route
router.get("/blogs/new",isLoggedIn,function(req,res){
    res.render("new");
});
// Create route 
router.post("/blogs",isLoggedIn,function(req,res){
    var author ={
        id: req.user._id,
        username: req.user.username
    }
    var newPost= {
        title: req.body.blog.title,
        image: req.body.blog.image,
        body: req.body.blog.body,
        author: author
    }
    //create blog 
    Blog.create(newPost, function(err, newBlog){
        if(err)
        {
            res.render("new")
        }
        else{
            console.log(newBlog);
            res.redirect("/blogs");
        }
    });
});
//show
router.get("/blogs/:id",isLoggedIn,function(req,res){
   
    Blog.findById(req.params.id,function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog : foundBlog});
        }
    });
});
//update
router.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
     if(err){
         res.redirect("/blogs");
     }else{
         res.render("edit",{blog: foundBlog});
     }
    });
    
})
//update
router.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err, updatedblog){
        if(err){
            res.redirect("/blogs");

        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
  
});
//delete
router.delete("/blogs/:id",isLoggedIn,isOwnedPost,function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    });
 });
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blogs/login");
}
function isOwnedPost (req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if (err) {
                console.log(err);
            } else {
                if(foundBlog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    conseole.log("cant delet its nor urs");
                    res.redirect("/blogs");
                  }
              }
        });
    }
   }
 module.exports = router;