import nodemailer from "nodemailer";
import 'dotenv/config'

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: String(process.env.MAILER_USER),
        pass: String(process.env.MAILER_PASSWORD),
      },
    });
  }

  async sendMessage(email: string, message: string, subject: string) {
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: String(process.env.MAILER_USER),
        to: email,
        subject,
        text: message,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("Error sending reset password email:", error);
      throw error;
    }
  }
}

export default new EmailService();
