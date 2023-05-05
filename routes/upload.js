const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.post("/profile", upload.single("photo"), async (req, res) => {
  // console.log(req.file);
  try {
    console.log(req.file.path);
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong");
  }
});

var pdfUpload = multer({ storage: storage });

router.post("/pdf", pdfUpload.single("file"), async (req, res) => {
  try {
    let formData = req.body;
    const pdf = formData.file;
    // console.log("form data", pdf);
    const cvPDF = new Buffer.from(
      formData.file.substring(formData.file.indexOf("base64") + 7),
      "base64",
    );

    fs.writeFileSync(path.normalize(__dirname + "/../uploads/cv.pdf"), cvPDF);
    const upload = await cloudinary.v2.uploader.upload("uploads/cv.pdf");
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong");
  }
});
module.exports = router;
