// import dependencies
import axios from "axios";
import dotenv  from "dotenv";
import Grama_Certificate_Details from "../models/grama-certificate-details.js";
import {send_slack_message} from "../utils/slack-message.js"
dotenv.config();

// Gov. user database url 
const userDatabaseUrl = process.env.USER_DATABASE_URL;

 /* method to get the user entered Nic number and check it against the Gov.
 database and initiate the creation of the gramasevaka certificate. */
export const id_check_api  = async(req, res) =>{

    const user_nic = req.body.user_nic;

    try {
        const response = await axios.get(`${userDatabaseUrl}/${user_nic}`);
        const userData = response.data.fields;
        const currentDate = getDate();

        try {
                const id_details = {
                    user_nic: userData.user_nic.stringValue,
                    user_full_address: userData.user_full_address.stringValue,
                    user_district: userData.user_district.stringValue,
                    user_date_of_birth: userData.user_date_of_birth.stringValue,
                    officer_id: userData.officer_id.stringValue,
                    user_full_name: userData.user_full_name.stringValue,
                    user_gender: userData.user_gender.stringValue,
                    user_phone_number: userData.user_phone_number.stringValue,
                    user_sec_division: userData.user_sec_division.stringValue,
                    user_email: userData.user_email.stringValue,
                }

                const cert = {
                    user_nic: id_details.user_nic,
                    user_date_of_birth: id_details.user_date_of_birth,
                    officer_id: id_details.officer_id,
                    certificate_status: "1",
                    application_date: currentDate,
                    user_full_name: id_details.user_full_name,
                    user_gender: id_details.user_gender,
                    user_provided_address: "",
                    user_district: id_details.user_district,
                    user_sec_division: id_details.user_sec_division,
                    user_nic_front_image: "",
                    user_address_proof_image: "",
                    user_nic_back_image: "",
                    user_full_address: id_details.user_full_address,
                    user_email: id_details.user_email,
                    user_phone_number: id_details.user_phone_number,
                    police_data:{
                        suspect_severity: "",
                        police_officer_id: "",
                        criminal_history: "",
                        report_number: "",
                    },
                }
                const newCertificate = new Grama_Certificate_Details (cert);
                const certificateData = await newCertificate.save();
                res.status(200).json({status: "sucess"});
                
            } catch (error) {
                send_slack_message("Identity Check API failed. In Line number 66.", error.message)
                console.log(error.message);
                res.status(500).json({ message: "error.message" })
            }
            
    } catch (error) {
        res.status(400).json({status: "failed", message: "Invalid nic number"})
    }
};

// method to generate current date.
function getDate(){
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
let stringDate = today.toString();
return(stringDate);
}
