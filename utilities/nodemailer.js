const nodemailer = require('nodemailer');

 var code = null
class sendbymail {
  getMailMessage = () => {
 
      code = Math.random().toString(21).substring(3, 17)  
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:  'alapatiganesh31@gmail.com',
          pass: 'Ganeshalapati@1999 ',
        },  

      });
      let mailOptions = {
        from:'alapatiganesh31@gmail.com',
        to: 'alapatiganesh0@gmail.com' ,
        subject: 'Fundoo notes Password / resetpass testing',
        text: code
      };

  transporter.sendMail(mailOptions, function (error, data) {
    if (error) {
      console.log("Error " + error);     
    } else {
      console.log("Email sent successfully");
    }
  });
}
passcode =(data)=>{
if(data == code){
  console.log("correct-code");
  return "true"
}else{
  console.log("wrong-wrong")
  return "false"
}}}
module.exports = new sendbymail()