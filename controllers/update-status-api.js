// import dependencies
import dotenv  from "dotenv";
import Grama_Certificate_Details from "../models/grama-certificate-details.js";
import {send_slack_message} from "../utils/slack-message.js"
import {send_user_email} from "../utils/email-service.js"
dotenv.config();


// method to change the status of the certificate.
export const update_status_api = async(req, res) =>{

    const user_nic = req.body.user_nic;

    try {
        const filter = { user_nic: user_nic};
        const update = { certificate_status: "4"};

        let result = await Grama_Certificate_Details.findOneAndUpdate(filter, update, {
            new: true
        })
            if(result != null){
                //notifying user via e-mail
                const user_email = result.user_email;
                const user_full_name = result.user_full_name;
                const user_nic = result.user_nic;

                send_user_email (user_email, user_nic, user_full_name);
                res.status(200).json({status: "success", message: "completed"});

            } else{
                res.status(400).json({status: "failed", message: "Invalid nic number"})
            }

      } catch (error) {
        send_slack_message("Status Update API. In Line number 38.", error.message);
        res.status(500).json({message: "Internal Server Error"});
      }
    
};