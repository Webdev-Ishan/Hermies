import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, images, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
