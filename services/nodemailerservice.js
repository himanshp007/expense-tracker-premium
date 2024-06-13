const nodemailer = require("nodemailer");
require('dotenv').config();

exports.nodemailerMail = (email , id) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      
      async function main() {
    
        const info = await transporter.sendMail({
          from: process.env.NODEMAILER_USER,
          to: email,
          subject: "Password Reset", 
          html: `<p>Here is the link to reset your password: <a href="http://16.171.53.53:3000/password/resetpassword/${id}">Reset Password</a></p>`
        });
      
        console.log("Message sent: %s", info.messageId);
      }
      
      main().catch(console.error);
}