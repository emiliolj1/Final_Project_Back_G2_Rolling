const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
    const { email, name } = req.body; 
    
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port:587,
        secure: true,
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Gracias por contactarte con nosotros',
        text: `${name}`,
      };

      //console.log(transporter)
      const info = transporter.sendMail(mailOptions);
      console.log("Correo enviado:", info.messageId)
      res.status(200).json({message: 'Correo enviado correctamente', messageId: info.messageId })
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      res.status(500).json({message: 'Email sent wrongly', error: error.message })
    }
}


module.exports = { sendEmail };
