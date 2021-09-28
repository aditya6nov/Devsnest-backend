const express = require("express");
const path = require("path");

const app = express();


// first need to set path for view engine 
app.set("views",path.join(__dirname,"views"))

// to use jade engine we use   ---- set
app.set("view engine","jade")
// to get static file directly using path 
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path of 'public' folder))

app.use("/hello",(req,res)=>{
    // res.sendFile("./public/hello.txt","test.txt")
    res.sendFile(path.join(__dirname, "public/hello.txt"),"test.txt");
})
app.use("/test", (req, res) => {
  // to send json file
  res.sendFile(path.join(__dirname, "public/test.json"));
});
app.use("/download", (req, res) => {
  // to download file
  res.download(path.join(__dirname, "public/hello.txt"), "test.txt");
});
app.use("/jade",(req,res)=>{
   res.render("index",{title:"Express"})
})
// for cookies checks 

app.use("/cookies",(req,res)=>{
res.status(201)
.cookie("toke","test",{
    expires:new Date(Date.now()+8*36000000)
})
.cookie("helo","hello")
.redirect(301,"/admin")
})











app.listen(3000, () => {
  console.log("connected")
})



//1. yaha direct html na use karke koi or view engine use kar sakte hain like 
// jade
