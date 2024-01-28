import express from "express";
import { imageUpload } from "../controllers/uploadController.js";
import upload from "../middleware/multer.js";

const uploadRouters = express.Router();

uploadRouters.post("/", upload.single("product"), imageUpload);

export default uploadRouters;
