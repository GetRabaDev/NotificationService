const httpStatus = require('http-status');
const mongoose = require('mongoose');
// const { prayerRepo, testimonyRepo, userRepo } = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');
const {
  convertNigeriaPhoneNumberToInternationFormat,
} = require('@toluwap/phone-number-formatter');
const { TermiiService } = require('./termii.service');
const { EmailService } = require('./email.service');
const { EmailTemplates } = require('../utils/mailTemplate');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class NotificationService {
  static notificationSms = async (data) => {
    console.log(data);
    let response = await TermiiService.notificationSms(data);
    console.log(response);
    if (!response) {
      const number = convertNigeriaPhoneNumberToInternationFormat({
        phoneNumbers: [data.phonenumber],
        options: { prepend: '+' },
      });
      response = await client.messages
        .create({
          body: data.message,
          from: process.env.TWILIO_NUMBER,
          to: number[0],
        })
        .then((message) => {
          return message;
        });
    }
    console.log(response);
    return response;
  };

  static notificationEmail = async (data) => {
    // get the template
    const html_template = await EmailTemplates['AuthenticationTemplate'](data);
    const options = {
      from: 'Getraba <getraba@gmail.com>', // sender address
      to: data.email, // receiver email
      subject: data.subject,
      html: html_template,
    };
    const sender = await EmailService.sendmail(options, (info) => {
      console.log('Email sent successfully');
      console.log('MESSAGE ID: ', info.messageId);
    });

    console.log(sender);
  };
}

module.exports = {
  NotificationService,
};
