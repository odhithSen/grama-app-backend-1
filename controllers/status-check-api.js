// import dependencies
import Grama_Certificate_Details from "../models/grama-certificate-details.js";
import {send_slack_message} from "../utils/slack-message.js"

/* method to check the status of the gramasevaka certificate. */
export const status_check_api = async(req, res) =>{

    const user_nic = req.body.user_nic;

    try {
            const certificate_data = await Grama_Certificate_Details.findOne ({user_nic: user_nic});

            if(certificate_data != null){
                const certificate_status = certificate_data.certificate_status;
                let res_message;

                if (certificate_status == "1"){
                    res_message = "Submitted";
                }else if(certificate_status == "2"){
                    res_message = "Pending Police Check";
                }else if(certificate_status == "3"){
                    res_message = "At Grama Sevaka";
                }else{
                    res_message = "Completed";
                }

                res.status(200).json({status: certificate_status, message: res_message});

            } else{
                res.status(400).json({status: "failed", message: "Invalid nic number"})
            }

      } catch (error) {
        send_slack_message("Status Check API failed. In Line number 22.", error.message);
        res.status(500).json({message: "Internal Server Error"});
      }
};
