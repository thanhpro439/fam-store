import express from "express";
import {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollection,
  getPopularProducts,
  getCategory,
  searchProductByName,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.get("/allproducts", getAllProducts);
router.get("/newcollection", getNewCollection);
router.get("/popular", getPopularProducts);
router.get("/search/:name", searchProductByName);
router.get("/category", getCategory);

export default router;
