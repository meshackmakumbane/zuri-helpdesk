import { verificationCodeTemplate } from './templates.js'
import transporter from './transporter.js'

export const sendVerificationCode = async(name, email, code)=>{
    try {
  const info = await transporter.sendMail({
    from: `Zuri Helpdesk" ${process.env.SMTP_USER}`,
    to: email, 
    subject: "Verify Your Email", 
    text: "Verify Your Email", 
    html: verificationCodeTemplate(name, code), 
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}