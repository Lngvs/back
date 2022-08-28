const userSchema = require("../models/userSchema")
const bcrypt = require('bcrypt')
module.exports = {
    register:async (req, res) => {
        const newUser = new userSchema
        newUser.username = req.body.username
        newUser.password = await bcrypt.hash(req.body.password,10)
        newUser.city = req.body.city
        newUser.gender = req.body.gender
        newUser.age = req.body.age
        try { newUser.save() }
        catch(e){console.log(e)}
        res.send({error:false, msg:'user saved'})
    },
    login: async (req, res) => {
        console.log(req.body.username)
        const user = await userSchema.findOne({ username: req.body.username })
        if (req.body.box) req.session.user=user
        res.send({error:false, msg:'user logged in', user})
    },
    picUpload: async (req, res) => {
        let newUser = await userSchema.findOneAndUpdate({ _id: req.body.user._id }, { $push: { pics: req.body.pic } }, { new: true })
        if (newUser.pics[0] === 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png') {
            newUser.pics.shift()
            await userSchema.findByIdAndUpdate(req.body.user._id, {pics:newUser.pics})
        }
        res.send({error:false, msg:'Picture Uploaded', user:newUser})
    },
    logout: (req, res) => {
        delete req.session.user
        res.send({error:false, msg:'succesfully logged out'})
    },
    allUsers: async (req, res) => {
        let users = await userSchema.find({ _id: { $ne: req.body._id } })
        res.send({error:false, msg:'All users found', users})
    },
    liked: async (req, res) => {
        if (!req.body.liker.liked.includes(req.body.liked._id)) user = await userSchema.findByIdAndUpdate(req.body.liker._id, { $push: { liked: req.body.liked._id }}, {new:true})
        if (!req.body.liked.likedBy.includes(req.body.liker._id)) await userSchema.findByIdAndUpdate(req.body.liked._id, { $push: { likedBy: req.body.liker._id }})
        res.send({error:false, msg:'You liked this person', user})
    },
    disLiked: async (req, res) => {
        if (!req.body.disliker.disliked.includes(req.body.disliked._id)) user = await userSchema.findByIdAndUpdate(req.body.disliker._id, { $push: { disliked: req.body.disliked._id }}, {new:true})
        res.send({error:false, msg:'You disliked this person', user})
    },
    filter: async (req, res) => { 
        console.log(req.body)
        const newFilter = {
            fCity:req.body.city,
            fGender:req.body.gender,
            fAge:req.body.sValue
        }
        const user = await userSchema.findByIdAndUpdate(req.body.user._id, newFilter, { new: true })
        res.send({ erorr: false, msg: 'Filter saved', user })
    },
    list: async (req, res) => {
        const users = await userSchema.find({ _id: req.body.list })
        res.send({ erorr: false, msg: 'List sent', users })
    },
    autoLogin: (req, res) => {
        if (req.session.user) return res.send({ error: false, msg: 'AutoLoggined', user: req.session.user })
        else res.send({error:true, msg:'Auto Login Failled'})
    }
}