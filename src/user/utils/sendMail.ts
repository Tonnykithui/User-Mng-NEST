import * as nodemailer from 'nodemailer';

export const sendEmail = async (email:string) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'apikey', // generated ethereal user
        pass: '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', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "TMK '<tonnykithui@gmail.com>'", // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  