import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: String,
  image: String,
  image_public_id: String,
  category: String, 
  new_price: Number,
  old_price: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
