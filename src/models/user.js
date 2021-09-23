const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const Task = require('./task')
const { Schema } = require('mongoose')
const { Timestamp } = require('bson')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,

        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password is invalid')
            }
        }
    },
    age:{
        type: Number,
        default: 0,

        validate(value) {
            if( value < 0){
                throw new Error('Age must be a valid number');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    avatar:{
        type: Buffer
    }
}, {
    timestamps : true 
})

// Virtual
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// delete hiding private unnecessery data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// Generate Auth Token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
// find email and password
userSchema.statics.findByCredentials = async( email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password ,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain password before saving
userSchema.pre('save', async function (next) {
    const user =  this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete task with user
userSchema.pre('remove', async function (next) {
    const user =this

    await Task.deleteMany({ owner: user._id })

    next()
})

const User = mongoose.model('user', userSchema);


module.exports = User



// const me = new User({
//     name: '   Alo    ',
//     email:'ORIO@GMAIL.COM  ',
//     password: '  who am i',
//     age: 25
// });

// me.save().then(() => {
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// })