const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },
    pics: {
        type: Array,
        rquired: true,
        default:['https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png']
    },
    liked: {
        type: Array,
        rquired: true
    },
    disliked: {
        type: Array,
        rquired: true
    },
    likedBy: {
        type: Array,
        rquired: true
    },
    fCity: {
        type: String,
        required: true,
        default:'Vilnius'
    },
    fGender: {
        type: String,
        required: true, 
        default: 'male'
    },
    fAge: {
        type: Number,
        required: true,
        default:50,
    },



})

module.exports = mongoose.model('myUser', userSchema)