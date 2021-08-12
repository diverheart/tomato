var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var mongoose=require('mongoose');
var fs = require('fs');
var path = require('path');
require('dotenv/config');



// mongoose.connect(process.env.MONGO_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true }, err => {
//         console.log('mongoose connected')
//     });

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (err) {
    console.log('error: ' + err)
    
  }
})()



app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.static("public"));

var Us=require('./model.js');

app.post("/signup",function(req,res)
{
	
	const Person ={
    mail:req.body.mail,
    password:req.body.pass
  }
    

      console.log(Person);
    
      Us.create(Person,(err,item) =>
      {
        if(err)
        {
          console.log(err);
          res.redirect('/error');
        }

        else
        {
          item.save();
          console.log("Saved");
          res.redirect('/login')
        }
      });
  });

var port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})

app.get("/login",function(req,res)
{
	res.sendFile(path.join(__dirname+'/login.html'));
});

app.get("/",function(req,res)
{
	res.sendFile(path.join(__dirname+'/home.html'));
});

app.get("/signup",function(req,res)
{
	res.sendFile(path.join(__dirname+'/signup.html'));
});

app.get("/home",function(req,res)
{
	res.sendFile(path.join(__dirname+'/home.html'));
});

app.post("/login",function(req,res)
{
	var m=req.body.mail;
	var p=req.body.pass;

	Us.find({mail:m,password:p}).then((doc)=>{
    console.log(doc);
    if(doc.length)
    {
    res.redirect("/success");
}

else
{ 
	res.redirect("/error")
}


 })
	.catch((err)=>{
    console.log(err);
    res.redirect("/error")
});

});

app.get("/success",function(req,res)
{
	res.sendFile(path.join(__dirname+'/success.html'));
});

app.get("/error",function(req,res)
{
	res.sendFile(path.join(__dirname+'/error.html'));
});

	
