const express = require('express');
const app   = express();
const  cors   = require('cors');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://mongodbUser:mongodbUser@cluster0.cllzq.mongodb.net/signup?retryWrites=true&w=majority' , {useNewUrlParser: true ,useUnifiedTopology: true});
var conn  = mongoose.connection;
conn.on('error' , console.log.bind(console, "connection error"));
conn.once('open', function(callback){
  console.log("DB connection succeded");
})

const hostname = 'localhost';
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false }))

app.use(bodyParser.json());


app.post('/signup', function(req , res){

  var firstname  = req.body.firstname;
  var lastname  = req.body.lastname;
  var email = req.body.email;
  var mobile = req.body.mobile;

 // console.log('-=-=-=-=-----=-=-=-=-', req.body);
  
 //define Schema
 var SignUpSchema = mongoose.Schema({
   firstname : String,
   lastname : String,
   email : String ,
   mobile: Number

 });

 var User = mongoose.model('User' , SignUpSchema, 'Registration');

 var User1 = new User({
   firstname: firstname,
   lastname : lastname,
   email : email,
   mobile : mobile
 });

 User1.save(function(err , data){
   if(err) 
   {
     res.send({status:0 , result: err})
   }
   else
   {
    res.send({status:1 , result: data})
   }
 });

})


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});