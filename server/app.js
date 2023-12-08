const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//Use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //urlencoded is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded()); */
app.use(bodyParser.json());

require('./db/connection');
require('./models/user.model');
const Users = require('./models/user.model');


//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);


//Signup
app.post("/api/register", async (req,res)=>{
    try{
        const {fullName,email,password} = req.body;

        if(!fullName || !email || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }else{
           const isAlready = await Users.findOne({email});
             if(isAlready){
                  return res.status(422).json({error:"User already exist"});
             }else{
                    const user = new Users({fullName,email,password});

                    //Hashing password
                    bcrypt.hash(password, 10, function(err, hash) {
                        // Store hash in your password DB.
                        if(err){
                            return res.status(422).json({error:"Something went wrong"});
                        }
                        user.password = hash;
                        user.save().then(()=>{
                            res.status(201).json({message:"User registered successfully"});
                        }).catch((err)=>{
                            res.status(500).json({error:"Failed to registered"});
                        });
                    });
                    }
             }
        
    }catch(err){
        console.log("error-->",err);
    }
});


//Login
app.post("/api/login", async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(422).json({error:"Please fill all the fields"});
        }else{
            const user = await Users.findOne({email});
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    // result == true
                    if(err){
                        return res.status(422).json({error:"Something went wrong"});
                    }
                    if(result){
                        res.status(201).json({message:"User logged in successfully"});
                    }else{
                        return res.status(422).json({error:"Invalid credentials"});
                    }
                });
            }else{
                return res.status(422).json({error:"Invalid credentials"});
            }
        }
    }catch(err){
        console.log("error-->",err);
    }
});



//Chat



app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})