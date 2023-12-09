const mongoose = require('mongoose');

const url = "mongodb+srv://pratapsinghabhay999:meerut123@cluster0.tjoaebt.mongodb.net/chat-app"


mongoose.connect(url,{
    useNewUrlParser: true, //to avoid deprecation warning
    useUnifiedTopology: true, //to avoid deprecation warning 
   

}).then(()=>{
    console.log(`Connection Successful!`);
}).catch((e)=>{
    console.log(`No Connection`);
})