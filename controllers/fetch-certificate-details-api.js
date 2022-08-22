// import dependencies
import Grama_Certificate_Details from "../models/grama-certificate-details.js";
import {send_slack_message} from "../utils/slack-message.js"


/* method to details of a gramasevaka certificate. */
export const fetch_certificate_details_api = async(req, res) =>{

    const user_nic = req.body.user_nic;

    try {
            const certificate_data = await Grama_Certificate_Details.findOne ({user_nic: user_nic});

            if(certificate_data != null){
                res.status(200).json({status: "sucess", certificate_data});
            } else{
                res.status(400).json({status: "failed", message: "No records exist for this NIC number"})
            }

      } catch (error) {
        send_slack_message("Fetch Certificate Details API failed. In Line number 21.", error.message);
        console.log(error.message);
        res.status(500).json({message: error.message});
      }
    
};