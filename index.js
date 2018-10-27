var bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    methodOverride =require("method-override"),
    sanitizer=require("express-sanitizer"),
    mongoose = require("mongoose"),
    Blog =require("./model/blog"),
    passport=require("passport"),
    strategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    User =require("./model/user")

    
    
    
//app config
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost:27017/restfulBlogApp',{useNewUrlParser: true});
mongoose.Promise =Promise;
   


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(sanitizer());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//passport
passport.use(new strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var blogsRoute = require("./routes/blogs_route"),
dashboardRoute = require("./routes/dashboard_route"),
userRoute = require("./routes/user_route"),
api= require("./routes/api")
//mongoose/model
app.use(function(req,res,next){
    res.locals.currentUser =req.user;
    next();
});


app.use('/api',api);
app.use(dashboardRoute);
app.use(userRoute);
app.use(blogsRoute);






function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blogs/login");
}


// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp Server Has Started!");
// });
app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});