import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service:"Gmail",
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth:{
    user:process.env.USERMAILER,
    pass: process.env.PASSMAILER
  }
});

// Función para enviar un correo electrónico
const sendMail = async () => {
  try {
    const info = await transporter.sendMail(emailOptions);
    console.log("Correo electrónico enviado:", info);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
};

export { transporter, sendMail };



/*
  return await transporter.sendMail({
    from: `usuario <${user}>`,
    to: 'beatriz1712sc@gmail.com',
    subject: 'bienvenido',
    html: `<div>
    <h1>Bienvenidos a Ecommerce App!!</h1>
    </div>`,
    attachments: [
      {
        filename: "shopping cart imagen colores.jpg",
        path: __dirname + "/shopping cart imagen colores.jpg",
        cid: "shopping cart",
      },
    ],
  });
  */