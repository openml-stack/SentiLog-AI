const multer= require("multer")
const fs = require("fs");
const path = require("path");

const tempDir = path.join(__dirname, "../public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log("Created public/temp directory at runtime");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempDir)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
 const upload = multer({ storage: storage,limits:{ fileSize: 5 * 1024 * 1024 } })
 module.exports={upload}