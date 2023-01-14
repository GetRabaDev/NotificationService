const httpStatus = require('http-status');
const mongoose = require('mongoose');
const {
  convertNigeriaPhoneNumberToInternationFormat,
} = require('@toluwap/phone-number-formatter');
// const { prayerRepo, testimonyRepo, userRepo } = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');
const { axiosPOST } = require('../utils/request');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class TermiiService {
  static notificationSms = async (data) => {
    const number = convertNigeriaPhoneNumberToInternationFormat({
      phoneNumbers: [data.phonenumber],
    });
    const payload = {
      to: number[0],
      from: 'getraba',
      sms: data.message,
      type: 'plain',
      api_key: process.env.TERMII_API_KEY,
      channel: 'generic',
      //   media: {
      //     url: 'https://media.example.com/file',
      //     caption: 'your media file',
      //   },//
    };
    const response = await axiosPOST(
      `${process.env.TERMII_BASE_URL}/api/sms/send`,
      payload,
      {
        'Content-Type': ['application/json', 'application/json'],
      }
    );
    return response;
  };
}

module.exports = {
  TermiiService,
};
