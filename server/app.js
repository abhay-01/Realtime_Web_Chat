const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//Use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //urlencoded is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded()); */
app.use(bodyParser.json());

require('./db/connection');
require('./models/user.model');



//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);


app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})