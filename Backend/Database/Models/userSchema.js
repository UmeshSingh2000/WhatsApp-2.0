const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    countryCode: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture:{
        type:String,
        default :""
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
})
const User = mongoose.model('User', userSchema);
module.exports = User;