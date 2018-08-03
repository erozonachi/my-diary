/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
import nodemailer from 'nodemailer';

export default {
  messanger() {
    const transporter = nodemailer.createTransport({ // https://scotch.io/tutorials/nodejs-cron-jobs-by-examples
      service: "gmail",
      auth: {
        user: "noreply.appmydiary@gmail.com",
        pass: "09063912145"
      }
    });
    return transporter;
  }
}
