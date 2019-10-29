const nodemailer = require('nodemailer');

function configMail(emailId,message,response){
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: '20shivamchauhan@gmail.com',
        pass: '$#iv@mC#20'
    }
    });

    // https://myaccount.google.com/lesssecureapps?pli=1

    // setup email data with unicode symbols
    let mailOptions = {
        from: '20shivamchauhan@gmail.com', // sender address
        to: emailId, // list of receivers
        subject: 'Bug Occured', // Subject line
        text:message, // plain text body
        html: `<b>${message}` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Mail NOT Send ERROR.....",error);
            response.json({"msg":"Can't Send Mail , Some Error"});
            return console.log(error);
        }
        console.log("Mail Send SuccessFully.....");
       response.json({"msg":"Mail Send SuccessFully....."});
    });
});
}
module.exports = configMail;