//import dependancies
import dotenv  from "dotenv";
import axios from "axios";
dotenv.config();


/* Authorization middleware for officer APIs*/
export const auth_officer = (req,res,next) => {
    const authorization_header = req.headers.authorization;
    const Asgardeo_Url = process.env.ASGARDEO_URL;

    if (typeof(authorization_header) != "undefined"){

        axios.get(Asgardeo_Url, {
            headers: {
                'Authorization': authorization_header
            }
        })
        .then((response) => {

            if (response.data.groups != "undefined" && response.data.groups == "gramaGroup"){

                if (response.data.gramaIdentification == req.body.officer_id){
                    next();
                }else{
                    res.status(401).json({status: "failed", message:"Authentication failed"});
                }

            }else{
                res.status(403).json({status: "failed", message:"You don't have permission to access this API"});
            }
        })
        .catch((error) => {
            res.status(401).json({status: "failed", message:"Access token validation failed"});
        })

    }else{
        res.status(401).json({status: "failed", message:"Not Authorized"});
    }
}