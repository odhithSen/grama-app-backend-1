// import dependencies
import Grama_Certificate_Details from "../models/grama-certificate-details.js";
import {send_slack_message} from "../utils/slack-message.js";


/* method to get the user entered address and nic imges and
add them to the gramasevaka certificate. */
export const address_check_api = async(req, res) =>{

    try {
        const user_nic = req.body.user_nic;
        const user_provided_address = req.body.user_provided_address;
        const user_nic_front_image = req.body.user_nic_front_image;
        const user_nic_back_image = req.body.user_nic_back_image;
        const user_address_proof_image = req.body.user_address_proof_image;
        // image upload code comes here.
    
        try {
            const filter = { user_nic: user_nic};
            const update = { 
                user_provided_address: user_provided_address,
                user_nic_front_image: user_nic_front_image,
                user_nic_back_image: user_nic_back_image,
                user_address_proof_image: user_address_proof_image,
                certificate_status: "2"
            };

            let result = await Grama_Certificate_Details.findOneAndUpdate(filter, update, {
                new: true
            })
            
            res.status(200).json({status: "success"});
                
            } catch (error) {
                send_slack_message("Address Check API failed. In Line number 35.", error.message)
                res.status(500).json({ message: "Internal Server Error"});
            }
            
    } catch (error) {
        res.status(400).json({status: "failed", message: "File upload failed"})
    }
};
