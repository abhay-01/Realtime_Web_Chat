const mongoose = require('mongoose');
const { comments } = require('moongose/models');


const conversationSchema = mongoose.Schema({
    members: {
        type: Array,
        required: true,
    }
});


const Conversation =  mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;