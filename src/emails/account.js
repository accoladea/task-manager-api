const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENGRID_API_KEY)

const origin = 'ahmedovislam00@gmail.com'

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from: origin,
        to: email,
        subject: 'Task App',
        text: `Welcome to the website, ${name}`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        from: origin,
        to: email,
        subject: 'Sorry to lose you',
        text: `Why are cancelling this account? You, ${name}, were the best user of our website! It is so sad to lose you!`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}