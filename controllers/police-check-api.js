// import dependencies
import axios from "axios";
import dotenv  from "dotenv";
import Grama_Certificate_Details from "../models/grama-certificate-details.js";
import {send_slack_message} from "../utils/slack-message.js"
import {send_officer_email} from "../utils/email-service.js"
dotenv.config();

// Gov. police database url 
const policeDatabaseUrl = process.env.POLICE_DATABASE_URL;
// Gov. grama officer database url 
const gramaOfficerDatabaseUrl = process.env.GRAMA_OFFICER_DATABASE_URL;
 
/* method to check police database and add them to the 
gramasewaka certificate*/
export const police_check_api = async(req, res) =>{

    const user_nic = req.body.user_nic;

    try {
        const response = await axios.get(`${policeDatabaseUrl}/${user_nic}`);
        const PoliceData = response.data.fields;
        const policeReport = {
            suspect_severity: PoliceData.suspect_severity.stringValue,
            police_officer_id: PoliceData.police_officer_id.stringValue,
            criminal_history: PoliceData.criminal_history.stringValue,
            report_number:PoliceData.report_number.stringValue,
        }
        handdlePoliceData(policeReport, user_nic, res);

    } catch (error) {

        if (error.response.status == 404){
            const policeReport = {
                suspect_severity: "",
                police_officer_id: "",
                criminal_history: "",
                report_number: ""
            }
            handdlePoliceData(policeReport, user_nic, res);

        } else{
            send_slack_message("Police Check API failed. In Line number 42.", error.message);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
};

async function handdlePoliceData(policeReport, user_nic, res){
    try {
        const filter = { user_nic: user_nic};
        const update = { 
            police_data:{
                suspect_severity: policeReport.suspect_severity,
                police_officer_id: policeReport.police_officer_id,
                criminal_history: policeReport.criminal_history,
                report_number: policeReport.report_number,
            },
            certificate_status: "3"
        };

        let result = await Grama_Certificate_Details.findOneAndUpdate(filter, update, {
            new: true
        })

        const officer_id = result.officer_id;

        /* notifying gramasewaka via email */
        try {
            const response = await axios.get(`${gramaOfficerDatabaseUrl}/${officer_id}`);

            const officer_email = response.data.fields.officer_email.stringValue;
            const officer_full_name = response.data.fields.officer_full_name.stringValue;
            const user_full_name = result.user_full_name;
            const user_nic = result.user_nic;

            send_officer_email (officer_full_name , officer_email, user_nic, user_full_name);
            res.status(200).json({status: "success"});
        
        } catch (error) {
            send_slack_message("Police Check API failed. In Line number 84.", error.message);
            res.status(500).json({message: "Internal Server Error"});
        }

    } catch (error) {
        res.status(400).json({status: "failed", message: "Invalid nic number"});
    }
}

