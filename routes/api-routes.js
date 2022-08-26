// import dependencies
import express from "express";
import Multer from "multer"
import { auth_user } from "../middlewares/user-middlewares.js";
import { auth_officer } from "../middlewares/officer-middlewares.js";
const router = express.Router();
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

import { id_check_api } from "../controllers/identity-check-api.js";
import { address_check_api } from "../controllers/address-check-api.js";
import { police_check_api } from "../controllers/police-check-api.js";
import { status_check_api } from "../controllers/status-check-api.js";
import { pending_certificate_request_api } from "../controllers/pending-certificate-request-api.js";
import { fetch_certificate_details_api } from "../controllers/fetch-certificate-details-api.js";
import { update_status_api } from "../controllers/update-status-api.js";
import { upload_image_api } from "../utils/image-upload.js";

//routes
router.post("/Identity-Check", auth_user, id_check_api);
router.post("/Address-Check", auth_user, address_check_api);
router.post("/Police-Check", auth_user, police_check_api);
router.post("/Status-Check", auth_user, status_check_api);
router.post("/Fetch-Pending-Requests", auth_officer,pending_certificate_request_api);
router.post("/Fetch-Certificate-Details", auth_officer, fetch_certificate_details_api);
router.put("/Update-Certificate-Status", auth_officer, update_status_api);
router.post("/Image-Upload", multer.array("imgfile"), upload_image_api);

export default router;
