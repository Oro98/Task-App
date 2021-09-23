const mongoose = require('mongoose')
// const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// start

// 
// end



// const User = mongoose.model('Password', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email:{
//         type:String,
//         required: true,
//         trim: true,
//         lowercase: true,

//         validate(value) {
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
        
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password is invalid')
//             }
//         }
//     },
//     age:{
//         type: Number,
//         default: 0,

//         validate(value) {
//             if( value < 0){
//                 throw new Error('Age must be a valid number');
//             }
//         }
//     }
// });
// const me = new User({
//     name: '   Robin    ',
//     email:'ORIO@GMAIL.COM  ',
//     password: '  who am i',
//     age: 25
// });

// me.save().then(() => {
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// })






// const workToDo = new task ({
    //     description: 'Fall_Work',
    //     // completed: false
    // })
    
    // workToDo.save().then(()=>
    //     console.log(workToDo)
    // ).catch((e)=>
    //     console.log('Error',error)
    // )
    