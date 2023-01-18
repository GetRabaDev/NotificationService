const nodemailer = require('nodemailer');
class EmailService {
  static transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  static sendmail = async (mailDetails, callback) => {
    try {
      const info = await this.transporter.sendMail(mailDetails);
      callback(info);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = {
  EmailService,
};
