const userSchema=require('../models/userSchema')
const bcrypt = require('bcrypt')

module.exports = {
    regValid:async (req, res, next) => {
        const check = await userSchema.find({ username: req.body.username }) 
        if (check.length >= 1)
            return res.send({ error: true, msg: 'This username is allready used' })
        if (req.body.username === req.body.username.toLowerCase())
            return res.send({ error: true, msg: 'Username needs atleast one uppercase letter' })
        if (req.body.username.lenght < 5)
            return res.send({ error: true, msg: 'Username has to be atleast 5 symbols long' })
        
        const cities = [
            'Vilnius',
            'Kaunas',
            'Klaipeda',
            'Kretinga'
        ]
        if (!cities.includes(req.body.city))
            return res.send({ error: true, msg: 'Bad city' })
        
        const genders = [
            'male',
            'female'
        ]
        if (!genders.includes(req.body.gender))
            return res.send({ error: true, msg: 'There is only 2 genders' })
        if (!(18<=req.body.age && req.body.age<=85))
            return res.send({ error: true, msg: 'Bad age' })
        next()
    },
    logValid: async (req, res, next) => {
        const user = await userSchema.find({ username: req.body.username })
        if (user.length===0)
            return res.send({ error: true, msg: 'Bad credentials' })
        console.log(user)
        const passVal = await bcrypt.compare(req.body.password, user[0].password)
        if (passVal) return next() 
        else res.send({ error: true, msg: 'Bad pass' })
    },
    picValid: (req, res, next) => {
        if (!(req.body.pic.length>0)) return res.send({ error: true, msg: 'no url provided' })
        next()
    }
}