// import dependencies
import nodemailer from "nodemailer";
import {google} from "googleapis";
import dotenv  from "dotenv";
dotenv.config();


const user = process.env.EMAIL_USER;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(clientId, clientSecret);
OAuth2_client.setCredentials({refresh_token : refreshToken})

/* method for sending e-mails for grama officers. */
export function send_officer_email (officer_full_name, officer_email, user_nic, user_full_name){
    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: user,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    })

    const mail_Option = {
        from: `noreply@Grama_Check<${user}>`,
        to: officer_email,
        subject: "[Grama Check] - New Certificate Request",
        text: `Hi ${officer_full_name}, \nThere is a new Gramasevaka certificate request from: ${user_full_name} - (${user_nic}).`
    }

    transport.sendMail(mail_Option, function(err, result){
        if(err){
            console.log(err);
            send_slack_message("Officer email service failed. In Line number 45.", err.message);
        }else{
            console.log("Email sent", result);
        }
    })

    transport.close();
}

/* method for sending e-mails for users */
export function send_user_email (user_email, user_nic, user_full_name){
    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: user,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    })

    const mail_Option = {
        from: `noreply@Grama_Check<${user}>`,
        to: user_email,
        subject: "[Grama Check] - Gramasevaka Certificate Request",
        text: `Hi ${user_full_name}, \nYour Gramasevaka certificate (NIC- ${user_nic}), is ready to be collected at your gramasevaka office.`
    }

    transport.sendMail(mail_Option, function(err, result){
        if(err){
            console.log(err);
            send_slack_message("User email service failed. In Line number 78.", err.message);
        }else{
            console.log("Email sent", result);
        }
    })

    transport.close();

}