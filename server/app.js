const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //urlencoded is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded()); */
app.use(bodyParser.json());

require('./db/connection');
require('./models/user.model');

const Users = require('./models/user.model');
const Conversation = require('./models/conversation.model');
const Message = require('./models/messages.models');


//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);


//Signup
app.post("/api/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        } else {
            const isAlready = await Users.findOne({ email });
            if (isAlready) {
                return res.status(422).json({ error: "User already exist" });
            } else {
                const user = new Users({ fullName, email, password });

                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        return res.status(422).json({ error: "Something went wrong" });
                    }
                    user.password = hash;
                    user.save().then(() => {
                        res.status(201).json({ message: "User registered successfully" });
                    }).catch((err) => {
                        res.status(500).json({ error: "Failed to registered" });
                    });
                });
            }
        }

    } catch (err) {
        console.log("error-->", err);
    }
});


//Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        } else {
            const user = await Users.findOne({ email });
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    // result == true
                    if (err) {
                        return res.status(422).json({ error: "Something went wrong" });
                    }
                    if (result) {
                        const payload = {
                            id: user._id,
                            email: user.email
                        }

                        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "mysecretkey";

                        jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }, async (err, token, next) => {

                            await Users.updateOne({ _id: user._id },
                                {
                                    $set: {
                                        token
                                    }
                                })
                            user.save();
                            return res.status(200).json({ message: "Login successfully", user, token: token });
                            next();
                        });

                    } else {
                        return res.status(422).json({ error: "Invalid credentials" });
                    }
                });
            } else {
                return res.status(422).json({ error: "Invalid credentials" });
            }
        }
    } catch (err) {
        console.log("error-->", err);
    }
});


//Conversation

app.post("/api/conversation", async (req,res)=>{

    const {senderId,receiverId} = req.body;

    const conversation = new Conversation({
        members:[senderId,receiverId]
    });

    try{
        const savedConversation = await conversation.save();
        res.status(201).json({message:"Conversation created successfully",savedConversation});
    }
    catch(err){
        res.status(500).json({error:"Something went wrong"});
    }
});


//conversation by userId    
app.get("/api/conversation/:userId", async (req,res)=>{
    try{
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        });
            
        const conversationUserData = Promise.all(conversation.map(async(conversation)=>{
            const receiverId =   conversation.members.find(member=>member!== req.params.userId);
            const user = await Users.findById(receiverId);
            return {
                user:{email:user.email,fullName:user.fullName},
                conversationId:conversation._id
            }
        }));
        console.log("conversationUserData-->",await conversationUserData);
        res.status(200).json(await conversationUserData);
    }
    catch(err){
        res.status(500).json({error:"Something went wrong"});
    }
}
);


//Message

app.post("/api/message", async (req,res)=>{
    const {conversationId,senderId,message,receiverId=''} = req.body;

    if(!senderId || !message){
        return res.status(422).json({error:"Please fill all the fields"});
    }

    if(!conversationId && receiverId){
        const conversation = new Conversation({
            members:[senderId,receiverId]
        });

        await conversation.save();
        const newMessage = new Message({
            conversationId:conversation._id,
            senderId,
            message
        });
        await newMessage.save();
        return res.status(201).json({message:"Message saved successfully",newMessage}); 
    }else if(!conversationId && !receiverId){
        return res.status(422).json({error:"Please fill all the fields"});
    }

    const newMessage = new Message({
        conversationId,
        senderId,
        message
    });

    try{
        const savedMessage = await newMessage.save();
        res.status(201).json({message:"Message saved successfully",savedMessage});
    }
    catch(err){
        res.status(500).json({error:"Something went wrong"});
    }
});


//Get message by conversationId

app.get('/api/message/:conversationId', async(req,res)=>{
    try{
        if(req.params.conversationId === "undefined"){
            req.status(200).json([]);
        }
        const messages = await Message.find({conversationId:req.params.conversationId});

        res.status(200).json({messages});
    }
    catch(err){
        res.status(500).json({error:"Something went wrong"});
    }
});


//Get all users

app.get("/api/users", async(req,res)=>{

    try{
        const users = await Users.find().select("-password");

        const userData = Promise.all(users.map(async(user)=>{
            return {
                user:{
                    email:user.email,
                    fullName:user.fullName
                },
                userId:user._id
            }
        }));

        res.status(200).json(await userData);

    }catch(err){
        console.log("error-->",err);
    }
})


app.listen(8000, ()=>{
    console.log("Server is running at port 8000");
})
