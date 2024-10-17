import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

import * as studentsController from "../app/controllers/studentsController.js";
import * as fileController from "../app/controllers/fileController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";


//multer configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});




//students

router.post("/Registration", studentsController.Registration)
router.post("/Login", studentsController.Login)
router.get("/ProfileDetails", AuthMiddleware, studentsController.ProfileDetails)
router.post("/ProfileUpdate",AuthMiddleware, studentsController.ProfileUpdate)



//file

router.post("/FileUpload", upload.single('file'), fileController.FileUpload)
router.get("/FileRead/:filename", fileController.FileRead)
router.get("/FileDelete/:filename", fileController.FileDelete)



export default router;