export const status_check_api = (req,res) =>{
    console.log("this is status check api")
    res.status(200).json({ message: "this is status check api" });
}