const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { email, name } = req.body; 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Gracias por contactarte con nosotros',
      text: `Querido ${name},\n\nGracias por contactarnos. Nos comunicaremos con usted lo antes posible.\n\nAtentamente,\nSale Fulbo'?`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({message: 'Email sent wrongly'})
    }
}

module.exports = { sendEmail };