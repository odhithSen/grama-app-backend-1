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

                // certificate_data.forEach(object => {
                //     delete object[officer_id, certificate_status, application_date, user_date_of_birth,
                //      user_gender, user_district, user_sec_division, user_email, user_full_address, 
                //      user_nic_front_image, user_address_proof_image, user_nic_back_image, police_data];
                //   });

                res.status(200).json({status: "sucess", certificate_data});

            } else{
                res.status(400).json({status: "failed", message: "Invalid officer id or no new records exists"});
            }

      } catch (error) {
        send_slack_message(" Pending Certificate Requests API failed. In Line number 31.", error.message);
        console.log(error.message);
        res.status(500).json({message: error.message});
      }
    
};