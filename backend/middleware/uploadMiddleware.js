const multer = require("multer");
const path = require("path");

// configure storage location and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // files will be stored in uploads folder
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // unique filename using timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// allow only csv and excel files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".csv", ".xlsx", ".xls"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and Excel files allowed"), false);
  }
};

// multer upload configuration
const upload = multer({ storage, fileFilter });

module.exports = upload;
