// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare...";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque...";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien...";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const input_content = [];

// Handle the form submission if needed in the future
app.post("/", function (req, res) {
  // Handle the form submission here if needed
});

app.get("/about", function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render('contact', { contactContent: contactContent });
});

app.get("/posts/:post_name", function(req, res) {
  const requested_post = _.lowerCase(req.params.post_name);
  let foundPost = null;

  input_content.forEach(function(post) {
    const stored_title = _.lowerCase(post.title);
    if (requested_post === stored_title){
      res.render('post',{post_title: post.title,post_body:post.content})
    }else{
      console.log("no match")
    }
  });
});

app.get("/compose", function (req, res) {
  res.render('compose');
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.title,
    content: req.body.post_content
  };
  input_content.push(post); 
  res.redirect("/");
});

app.get("/", function (req, res) {
  res.render('home', { startingContent: homeStartingContent, posts: input_content });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});