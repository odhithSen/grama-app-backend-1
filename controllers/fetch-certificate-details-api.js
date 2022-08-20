export const fetch_certificate_details_api = (req,res) =>{
    console.log("this is certificate details api")
    res.status(200).json({ message: "this is certificate details api" });
}