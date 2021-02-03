'use strict';
var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

let transporter = nodemailer.createTransport(smtpTransport({
      service: 'Godaddy',
      // host: 'smtpout.asia.secureserver.net',
      secureConnection: false,
      port: 25,

     auth: {
         user: 'sells@nityamedhall.com',
         pass: 'sandeep@0288'
     },
          // tls: {rejectUnauthorized: false},
          // debug:true
   }));
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

router.get('/', function (req, res, next) {

    var sendmailreq = "<html>\n\
                        <body>\n\
                        <p> Name: " +  req.param('name') + "</p>\n\
                        <p> Email: " +  req.param('email') + "</p>\n\
                        <p> Query: " +  req.param('msg') + "</p>\n\
                        <p> Newsletter: " +  req.param('newsletter') + "</p>\n\
                        </body>\n\
                        </html>";
    var sendmailrevemail = "<html>\n\
                        <body style='height:100%'>\n\
                        <h3>Thank you " +  req.param('name') + " for your query on Nitya Med Hall</h3>\n\
                        <h5>You can now login with follwing Credential :- </h5>\n\
                        <p> Email: <b>" +  req.param('email') + "</b></p>\n\
                        <p> Password: <b>" +  req.param('pass') + "</b></p>\n\
                        <p> Click on the below link to login:</p>\n\
                        <a href='https://nityamedhall.com/login/index.html'>LOGIN NOW </a>\n\
                        </body>\n\
                       </html>";

    var sender_email = req.param('email');

    let mailOptions = {
        from: 'sells@nityamedhall.com',
        to: sender_email,
        subject: "Your query on Nitya Med Hall",
        html: sendmailrevemail
    };

    // let mailreverse = {
    //     from: 'sells@nityamedhall.com',
    //     to: sender_email,
    //     subject: "Your query on Nitya Med Hall",
    //     html: sendmailrevemail
    // };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.send(info);
            return console.log(error);
        }
        res.send(info);

        console.log('Message %s sent: %s', info.messageId, info.response);
    });


    // transporter.sendMail(mailreverse, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    // });

});

module.exports = router;
