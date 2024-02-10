const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
    const { email, name } = req.body; 
    
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port:587,
        secure: false,
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      
      console.log(transporter);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Gracias por contactarte con nosotros',
        text: `aaaaaaaaaaaaaaa`,
      };
      //console.log(mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.error("Error al enviar el correo:", error);
          res.status(500).json({error})
        }else{
          console.log("email enviado");
          res.status(200).json(req.body)
        }
      });
    } catch (error) {
      res.status(500).json({message: 'Email sent wrongly'})
    }
}

module.exports = { sendEmail };