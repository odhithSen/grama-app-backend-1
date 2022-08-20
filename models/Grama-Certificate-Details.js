import mongoose from "mongoose";

const CertificateSchema = mongoose.Schema({
    id_number: String,
    grama_id: String,
    certificate_number: String,
    status: String,
    application_date: String,
    full_name: String,
    division: String,
    sec_division: String,
    full_address: String,
    user_email: String,
    police_data:{
        case_number: String,
        severity: String,
        case_date: String,
        reporting_officer: String,
        summary: String,
},
    user_phone_number: String,
}
)

const Grama_Certificate_Details = mongoose.model("Grama_Certificate_Details", CertificateSchema );

export default Grama_Certificate_Details;