import express from "express";
import { imageDelete } from "../controllers/imageDelete.js";

const deleteRouters = express.Router();

deleteRouters.post("/", imageDelete);

export default deleteRouters;
