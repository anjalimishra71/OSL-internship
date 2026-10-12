import nodemailer from "nodemailer";

export async function sendEmail(to,subject,text) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

 const info=await transporter.sendMail({
    from:'"My Auth App"<no-reply@example.com>',
    to,
    subject,
    text,
 });

 console.log("Preview URL:",nodemailer.getTestMessageUrl(info));
}