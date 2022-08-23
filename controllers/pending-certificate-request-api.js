// import dependencies
import Grama_Certificate_Details from "../models/grama-certificate-details.js";
import {send_slack_message} from "../utils/slack-message.js"

/* method to get all new certificates that
 belongs to the specific gramasewaka.*/
export const pending_certificate_request_api = async(req, res) =>{

    const officer_id= req.body.officer_id;

    try {
            const certificate_data = await Grama_Certificate_Details.find ({officer_id : officer_id, certificate_status: "3"}).exec();

            if(certificate_data.length > 0){

                let filterd_certificate_data = [];
                certificate_data.forEach(object => {

                  let user_data = {
                    user_nic: object.user_nic,
                    user_full_name: object.user_full_name,
                    user_provided_address: object.user_provided_address,
                    user_phone_number: object.user_phone_number
                  }

                  filterd_certificate_data.push(user_data);
                });

                res.status(200).json({status: "success", filterd_certificate_data});

            } else{
                res.status(400).json({status: "failed", message: "Invalid officer id or No new records exists"});
            }

      } catch (error) {
        send_slack_message(" Pending Certificate Requests API failed. In Line number 31.", error.message);
        res.status(500).json({message: "Internal Server Error"});
      }
  
};