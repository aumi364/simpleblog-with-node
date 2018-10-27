var express = require("express");
var router = express.Router();
var User = require("../model/user");
var Blog = require("../model/blog");

router.get("/", function(req,res){
      res.render("api");
});
router.get("/users", function(req,res){
    User.find()
    .then(function(userdata){
        res.json(userdata);
    }).catch(function(){
        res.send(err);
    });
    
});

router.get("/blogs", function(req,res){
    Blog.find()
    .then(function(blogdata){
        res.json(blogdata);
    console.log(JSON.stringify(blogdata));
    }).catch(function(){
        res.send(err);
    });
    
});
router.post("/blogs", function(req,res){
    Blog.create(req.body)
    .then(function(newPost){
        res.status(201).json(newPost);
        console.log(newPost);
    }).catch(function(err){
        console.log(err);
    })
});
router.put("/blogs/:id", function(req,res){
      Blog.findOneAndUpdate({_id: req.params.id}, req.body,{new: true})
      .then(function(editBlog){
            res.json(editBlog)
      }).catch(function(err){
          console.log(err);
      })
});
router.delete("/blogs/:id", function(req,res){
    Blog.remove({_id: req.params.id})
    .then(function(){
          res.json({message : "deleted"});
    }).catch(function(err){
        console.log(err);
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blogs/login");
}
module.exports = router;