import nodemailer from "nodemailer";
import {config} from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: config.USER_EMAIL,
        refreshToken: config.OAUTH_REFREASH_TOKEN,
        clientId: config.OAUTH_CLIENT_ID,
        clientSecret: config.OAUTH_CLIENT_SECRET,
    },
});

transporter.verify((error, success) => {
    if(error){
        console.log("Error while connecting to email server", error);
    }else{
        console.log("SMTP server is ready to send emails");
    }
});

export async function sendEmail({to, subject, html}){
    const info = transporter.sendMail({
        from : `Myself, <${config.USER_EMAIL}>`,
        to,
        subject,
        html,
    })
}
