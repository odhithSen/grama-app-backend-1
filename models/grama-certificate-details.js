import mongoose from "mongoose";

const CertificateSchema = mongoose.Schema({
    user_nic: String,
    officer_id: String,
    certificate_status: String,
    application_date: String,
    user_full_name: String,
    user_date_of_birth: String,
    user_gender: String,
    user_district: String,
    user_sec_division: String,
    user_full_address: String,
    user_email: String,
    user_phone_number: String,
    user_provided_address: String,
    user_nic_front_image: String,
    user_address_proof_image: String,
    user_nic_back_image: String,
    police_data:{
        suspect_severity: String,
        police_officer_id: String,
        criminal_history: String,
        report_number: String,
    },
})

const Grama_Certificate_Details = mongoose.model("Grama_Certificate_Details", CertificateSchema );
export default Grama_Certificate_Details;