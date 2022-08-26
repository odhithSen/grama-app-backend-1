// import dependencies
import dotenv from "dotenv";
import { send_slack_message } from "../utils/slack-message.js";
import { Storage} from "@google-cloud/storage";
dotenv.config();

let projectId = process.env.GCP_PROJECT_ID; 
let keyFilename = "./utils/gcp-key.json";
const storage = new Storage({
  projectId,  
  keyFilename,
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

/* method add user uploded images to the google bucket*/
export const upload_image_api = async (req, res) => {

    try {
        if (req.files) {
          const blob1 = bucket.file(req.files[0].originalname);
          const blobStream = blob1.createWriteStream();
    
          const blob2 = bucket.file(req.files[1].originalname);
          const blobStream2 = blob2.createWriteStream();
    
          const blob3 = bucket.file(req.files[2].originalname);
          const blobStream3 = blob3.createWriteStream();
    
          blobStream.end(req.files[0].buffer);
          blobStream.on("finish", () => {
            blobStream2.end(req.files[1].buffer);
            blobStream2.on("finish", () => {
              blobStream3.end(req.files[2].buffer);
              blobStream3.on("finish", () => {
                res.status(200).json({status: "success", message: "All images uploded"});
              });
            });
          });

        } else{
            res.status(400).json({status: "failed", message: "No image file found"});
        }
      } catch (error) {
        send_slack_message("Image Upload API failed. In Line number 49.", error.message);
        res.status(500).json({status: "failed", message: "Internal Server Error"});
      }
};
