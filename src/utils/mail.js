import nodemailer from 'nodemailer'

const gmailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'marcoos.av95@gmail.com',
    pass: 'wwelttxaeydzcith'
  }
}


export const sendMailHandler = async (mailContent) => {
  const transporter = nodemailer.createTransport(gmailConfig);
  await transporter.sendMail(mailContent);
}