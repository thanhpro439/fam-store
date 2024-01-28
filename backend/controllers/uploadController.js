import cloudinary from "../utils/cloudinary.js";

export const imageUpload = (req, res) => {
  cloudinary.uploader.upload(
    req.file.path,
    { folder: "fam_store" },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "error",
        });
      }

      res.json({
        success: true,
        message: "Uploaded",
        data: result,
      });
    }
  );
};
