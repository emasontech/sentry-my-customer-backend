 const Response = require('../util/response_manager'),

            HttpStatus = require('../util/http_status'),
            express = require('express'),
            nodemailer = require('nodemailer'),
            Customer = require("../models/customer");
            const mailGun = require('nodemailer-mailgun-transport');
            const router = express.Router();
            var config = process.env;

router.use(require("body-parser").urlencoded({extended: true}));

module.exports = {
    sendMail(req, res){

            const auth = {
            auth: {
                api_key:config.API_KEY,//'17726828da711eda89dcdcc3e664a678-468bde97-fab6abad',
                domain:config.DOMAIN//'sandbox0a73b939b71e45058d32906c13c2b7e4.mailgun.org'
            }
        };
        
  
        const transporter = nodemailer.createTransport(mailGun(auth))
          //Find a customer and get the email
        let id = req.params.customer_id;
        Customer.findById(id, (err, foundCustomer)=>{
            if(err){
                res.status(404).json({
                    status: "fail",
                    message: "Customer not found"
                });
            }else{

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
                        from: "example@gmail.com",
                        to: recipient,
                        subject: subject,
                        text:text 
                    };
                    console.log(params);// loginging out params after testing pls delete
                    transporter.sendMail(params, function (error, result) {
                        if (error) {
                            console.log(error);
                            res.status(401).json({
                                status: "Bad request",
                                message: error
                            })
                        } else {
                            console.log('Email sent: ' + result.message);
                            res.status(200).json({
                                status: "success",
                                message: result
                            })
                        }
                    });
                }
            }
        })
    }
}
