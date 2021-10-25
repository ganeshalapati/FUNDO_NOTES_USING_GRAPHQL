const nodemailer = require('nodemailer');
const { callbackPromise } = require('nodemailer/lib/shared');
const usermodel = require('../models/usermodel');

 var code = null
class sendbymail {
  getMailMessage = (receiver,callbackPromise) => {
 
      code = Math.random().toString(21).substring(3, 17)  
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:  process.env.USER_MAIL,
          pass: process.env.USER_PASSWORD,
        },  

      });
      let mailOptions = {
        from:process.env.USER_MAIL,
        to: receiver,
        subject: 'Fundoo notes resetpassword testing',
        text: code
      };

  transporter.sendMail(mailOptions, function (error, data) {
    if (error) {
      console.log("Error " + error);     
    } else {
      console.log("Email sent successfully");
      const checkinguser =  usermodel.findOne({email: receiver});
      const mailmodel = new mailmodel({
        mail: checkinguser.email,
        tempcode: code
      })
       mailmodel.save();
      return callbackPromise(null, "email sent")
    }
  });
}
passcode =(data)=>{
if(data == code){
  console.log("correct code");
  return "true"
}else{
  console.log("wrong code")
  return "false"
}}}
module.exports = new sendbymail()