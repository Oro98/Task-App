const express = require('express')
const multer = require('multer')
const sharp = require('sharp');
const User = require('../models/user')
const auth =  require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()


// User
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token  = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

// User Login
router.post('/users/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e){
        res.status(400).send()
    }
})

// User LogOut
router.post('/users/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// Logout All
router.post('/users/logoutall', auth, async(req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// Read users
// router.get('/users', auth, async(req,res) => {
//     try{
//         const users = await User.find({})
//         res.send(users)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id

//     try{
//         const user = await User.findById(_id)

//         if(!user){
//             return res.status(404).send()
//             }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })

// Update Users

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password', 'email']
    const isValidOperations = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperations){
        return res.status(400).send({error: 'Invalid update!'})
    }
    try{
        updates.forEach( (update) => req.user[update] = req.body[update] )
        await req.user.save()
        res.send(req.user)
    } catch(e){
        res.status(400).send(e)
    }
})

// Delete User
router.delete('/users/me',auth, async(req, res) => {
        try{
            await req.user.remove()
            sendCancelationEmail(req.user.email, req.user.name)
            res.send(req.user)
        }catch(e){
            res.status(500).send()
        }
    })

// Upload Image
const upload = multer({ 
    // dest: 'avators',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(null, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width : 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Delete User
router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// Loading Image
router.get('/users/:id/avatar', async(req, res) => {
   
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports = router





// const user = await User.findByIdAndDelete(req.user._id)
//             if(!user){
//                 return res.status(404).send()
//             }
// const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
