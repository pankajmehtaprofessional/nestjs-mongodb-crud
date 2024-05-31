import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: String(process.env.MAIL_HOST || 'smtp.example.com'), // Replace with your SMTP host
      port: Number(process.env.MAIL_PORT || 587), // Replace with your SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: String(process.env.MAIL_USER || 'your-email@example.com'), // Replace with your email
        pass: String(process.env.MAIL_PASSWORD || 'your-email-password'), // Replace with your email password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: String(process.env.MAIl_FROM || 'test@test.com'), // Replace with your email
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
