const sgMail = require('@sendgrid/mail')
// const sendgridAPIkey = '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'

sgMail.setApiKey(process.env.SANDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
      to: email,
      from: {
        name: 'Robin007',
        email: 'orioahr@gmail.com'
      },
      subject: 'This is my App',
      text: 'I hope you will get it too, ${name}.',
      html: '<h1>Noooo</h1>'
    })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'orioahr@gmail.com',
    subject: 'Sorry to see you go',
    text: 'Goodbye, ${name}. Hope to see you soon!',
    // html: '<h1>Noooo</h1>'
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}

// const msg = {
//     to: 'orioahr@gmail.com',
//     from: 'orioahr@gmail.com',
//     subject: 'This is my first creation',
//     text: 'I hope you will get it too.',
//     html: '<h1>Hello from Robin</h1>'
// }

// sgMail.send(msg).then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })