const express = require ('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT 
// || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//Server 
app.listen(port, () => {
    console.log(' Server is up on port '+ port)
})




// const multer = require('multer')
// const upload = multer({ 
//     dest: 'images',
//     limits: { fileSize: 1000000 },
//     fileFilter(req, file, cb) {
//         // if(!file.originalname.endsWith('.pdf')){
//         //     return cb(new Error('Please upload a PDF'))
//         // }
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a Word document'))
//         }
//         cb(undefined, true)
//     }
// })
// app.post('/upload', upload.single('upload'), (req,res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

// const User = require('./models/user')
// const Task = require('./models/task')

// const main = async() => {
//     // const task = await Task.findById('61472458a74cbc23285eb1d4')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('614723e5a74cbc23285eb1d1')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()




// jsonwebtoken

// const jwt = require('jsonwebtoken')
// const { ServerClosedEvent } = require('mongodb')
// const myFunction = async() => {
//     const token = jwt.sign({_id: '123erc'}, 'mynewcourse', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'mynewcourse')
//     console.log(data)
// }
// myFunction()





// middleware
// app.use( (req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('Disabled GET')
//     }else{
//         next()
//     }
// })

// app.use( (req, res, next) => {
//     if(req.method === 'GET'){
//         res.status(503).send('Site is under maintainence ,Check back soon!')
//     }
// })




// bcryptjs
// const bcrypt = require('bcryptjs')
// const password = "ran12345"
//     const hashPass = await bcrypt.hash(password, 8)

//     console.log('Pass:',password)
//     console.log('cryptedPass:',hashPass)

//     const match = await bcrypt.compare('ran12345',hashPass)
//     console.log(match)