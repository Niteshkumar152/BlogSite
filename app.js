//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');
const mongoose=require("mongoose");

const homeStartingContent="";
const aboutContent = "";

const contactContent = "Feel Free To Contact Us";
mongoose.connect("mongodb+srv://admin-niteshk:test123@cluster0-pzygo.mongodb.net/blogDB", {useNewUrlParser: true});
const app = express();

const postSchema = {
title: String,
content: String
};
const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts=[];


app.get("/",function(req,res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});
app.get("/twitter.com",function(req,res){
  res.redirect('http://twitter.com');
});
app.get("/facebook.com",function(req,res){
  res.redirect('http://facebook.com');
});
app.get("/instagram.com",function(req,res){
  res.redirect('http://instagram.com');
});
app.get("/github.com",function(req,res){
  res.redirect('http://github.com');
});
app.post("/compose",function(req,res){
  // const post={
  //   title:req.body.postTitle,
  //   content:req.body.postBody
  // };
  // posts.push(post);
  const post = new Post ({
  title: req.body.postTitle,
  content: req.body.postBody

});
post.save(function(err){
if (!err){
res.redirect("/");
  }

 });

});
app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;


  // posts.forEach(function(post){
  //   const storedTitle=_.lowerCase(post.title);
  //   if(storedTitle===requestedTitle){
  //     res.render("post",{
  //       title:post.title,
  //       content:post.content
  //     });
  //   }
  //
  // });
  Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     title: post.title,

     content: post.content

   });

 });

});

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
