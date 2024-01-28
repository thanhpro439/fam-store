import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import { fetchUser } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/addtocart", fetchUser, addToCart);
cartRouter.post("/removefromcart", fetchUser, removeFromCart);
cartRouter.post("/getcart", fetchUser, getCart);

export default cartRouter;
