import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";

export const imageDelete = async (req, res) => {
  const product = await Product.find({ id: req.body.id });
  const image_public_id = product[0].image_public_id;
  cloudinary.uploader.destroy(image_public_id, function (err) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "File not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted",
    });
  });
};
