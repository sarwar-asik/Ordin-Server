import nodemailer from 'nodemailer';
import config from '../config';



export async function senMailer(subject:string,to:string,html:string) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
      
          user: config.nodeMailer.FromEmail,
          pass: config.nodeMailer.appPassword,
        },
      });

   await transporter.sendMail({
    from:  config.nodeMailer.FromEmail,
    to, 
    subject, 
    text: 'Hello world?', 
    html: '<b>Hello world?</b>', 
  });


}

main().catch(console.error);
