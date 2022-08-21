// import dependencies
import nodemailer from "nodemailer";
import {google} from "googleapis";
import dotenv  from "dotenv";
dotenv.config();

// const user = "lakravidu1999@gmail.com";
const user = process.env.EMAIL_USER;
// const clientId = "716558741844-37obgppti0k3l2r75fp30m00b0ium9ht.apps.googleusercontent.com";
const clientId = process.env.CLIENT_ID;
// const clientSecret = "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";
const clientSecret = process.env.CLIENT_SECRET;
// const refreshToken = "1//04IwOXpXXjARLCgYIARAAGAQSNwF-L9IrXOgVF36-uOJuPAj9yJISitfDyuRT25EfeiJuXPRyOfb3ZKl7Zlt1rNBQRdN9AVz43vQ";
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

// /* method for sending e-mails for users */
// export function send_user_email (officer_full_name, officer_email, user_nic, user_full_name){
//     const accessToken = OAuth2_client.getAccessToken();

//     const transport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             type: "OAuth2",
//             user: user,
//             clientId: clientId,
//             clientSecret: clientSecret,
//             refreshToken: refreshToken,
//             accessToken: accessToken
//         }
//     })

//     const mail_Option = {
//         from: `noreply@Grama_Check<${user}>`,
//         to: officer_email,
//         subject: "[Grama Check] - New Certificate Request",
//         text: `Hi ${officer_full_name}, \nThere is a new Gramasevaka certificate request from: ${user_full_name} - (${user_nic}).`
//     }

//     transport.sendMail(mail_Option, function(err, result){
//         if(err){
//             console.log(err);
//             send_slack_message("Officer email service failed. In Line number 45.", err.message);
//         }else{
//             console.log("Email sent", result);
//         }
//     })

//     transport.close();

// }