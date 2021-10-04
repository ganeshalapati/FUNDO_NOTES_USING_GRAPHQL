const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Address: {
        type: String,
        required: true,
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref: 'User' 
    }
});

module.exports = mongoose.model('Event', eventSchema);