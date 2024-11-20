const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail(to, sub, msg) {
  try {
    await transporter.sendMail({
      to: to,
      subject: sub,
      html: msg,
    });
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendMail };