export const pending_certificate_request_api = (req,res) =>{
    console.log("this is pending certificate requests api")
    res.status(200).json({ message: "this is pending certificate requests api" });
}