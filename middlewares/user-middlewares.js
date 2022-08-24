//import dependancies
import dotenv  from "dotenv";
import axios from "axios";
dotenv.config();


/* Authorization middleware for user APIs*/
export const auth_user = (req,res,next) => {
    const authorization_header = req.headers.apple;
    const Asgardeo_Url = process.env.ASGARDEO_URL;

    if (typeof(authorization_header) != "undefined"){

        axios.get(Asgardeo_Url, {
            headers: {
                'Authorization': authorization_header
            }
        })
        .then((response) => {

            if (response.data.groups != "undefined" && response.data.groups == "gramaGroup"){

                res.status(403).json({status: "failed", message:"You don't have permission to access this API"});
                
            }else{

                if (response.data.National_ID == req.body.user_nic){
                    next();
                }else{
                    res.status(401).json({status: "failed", message:"Authentication failed"}); 
                }
            }
        })
        .catch((error) => {
            res.status(401).json({status: "failed", message:"Access token validation failed"});
        })

    }else{
        res.status(401).json({status: "failed", message:"Not Authorized"});
    }
}