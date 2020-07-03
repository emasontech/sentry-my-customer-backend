<<<<<<< HEAD
require("dotenv").config();
const Response = require('../util/response_manager'),
=======
 const Response = require('../util/response_manager'),

>>>>>>> 67f6a57971459773016eb5ee87c5294ba0416fc3
            HttpStatus = require('../util/http_status'),
            express = require('express'),
            nodemailer = require('nodemailer'),
            Customer = require("../models/customer");
<<<<<<< HEAD


const router = express.Router();
const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_SERVICE } = process.env;
=======
            const mailGun = require('nodemailer-mailgun-transport');
            const router = express.Router();
            var config = process.env;
>>>>>>> 67f6a57971459773016eb5ee87c5294ba0416fc3

router.use(require("body-parser").urlencoded({extended: true}));

module.exports = {
    sendMail(req, res){
<<<<<<< HEAD
        const transporter = nodemailer.createTransport({
            service: MAIL_SERVICE,
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD
=======

            const auth = {
            auth: {
                api_key:config.API_KEY,//'17726828da711eda89dcdcc3e664a678-468bde97-fab6abad',
                domain:config.DOMAIN//'sandbox0a73b939b71e45058d32906c13c2b7e4.mailgun.org'
>>>>>>> 67f6a57971459773016eb5ee87c5294ba0416fc3
            }
        };
        
  
        const transporter = nodemailer.createTransport(mailGun(auth))
          //Find a customer and get the email
        let id = req.params.customer_id;
        Customer.findById(id, (err, foundCustomer)=>{
            if(err){
                res.status(404).json({
                    success: false,
                    message: "Customer not found",
                    error: {
                        statusCode: 404,
                        description: "Could not find a customer with the id: " + id
                    }
                });
            }else{
<<<<<<< HEAD
                if(foundCustomer.email  && foundCustomer.email != "Not set" || undefined){
                    const recipient = foundCustomer.email,
                        subject = req.body.subject,
                        text = req.body.text;
=======
>>>>>>> 67f6a57971459773016eb5ee87c5294ba0416fc3

                if(!foundCustomer==""||undefined){
                    let myobj = JSON.stringify(foundCustomer);
                    let data= JSON.parse(myobj)
                    const recipient = data.email
                    if(recipient === null || recipient === undefined){
                         return res.status(401).json({
                             message:"customer has no email",
                             code:401
                        });
                    }
                     let subject = req.body.subject;
                     let text = req.body.text; 
                    const params = {
<<<<<<< HEAD
                        from: MAIL_USERNAME,
                        to: recipient,
                        subject: subject,
                        text: text
=======
                        from: "example@gmail.com",
                        to: recipient,
                        subject: subject,
                        text:text 
>>>>>>> 67f6a57971459773016eb5ee87c5294ba0416fc3
                    };
                    console.log(params);// loginging out params after testing pls delete
                    transporter.sendMail(params, function (error, result) {
                        if (error) {
                            res.status(401).json({
                                success: false,
                                message: "Bad request",
                                error:{
                                    statusCode: 401,
                                    description: error
                                }
                            })
                        } else {
<<<<<<< HEAD
                            res.status(200).json({
                                success: true,
                                message: "Email sent successfully",
                                data: {
                                    statusCode: 200,
                                    description: info
                                }
=======
                            console.log('Email sent: ' + result.message);
                            res.status(200).json({
                                status: "success",
                                message: result
>>>>>>> 67f6a57971459773016eb5ee87c5294ba0416fc3
                            })
                        }
                    });
                }else{
                    res.status(400).json({
                        success: false,
                        message: "Bad request",
                        error: {
                            statusCode: 400,
                            description: "Please update customer email address in order to send emails"
                        }
                    })
                }
            }
        })
    }
}
