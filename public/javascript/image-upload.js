const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const helpers = require("../../utils/helpers");
require("dotenv").config();

//configuring aws config with access keys and region
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2",
});

//fileFilter to do error checks for file type (will be moved into helpers)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/JPEG" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/PNG" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/JPG"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only image files are allowed!"), false);
  }
};

//creating an s3 instance
const s3 = new aws.S3();

//create an upload object from multer
const upload = multer({
  fileFilter,
  //using multer-s3 as our storage
  storage: multerS3({
    s3,
    //using our bucket name created on AWS
    bucket: process.env.S3_BUCKET_NAME,
    //enable public access to the bucket object
    acl: "public-read",
    // meta data for creating the fieldname
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "Testing meta data" });
    },
    // set or modify original filename
    key: function (req, file, cb) {
      //use date string as the key for unique name for the uploaded image on s3
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
