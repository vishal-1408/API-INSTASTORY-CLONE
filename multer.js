var multer = require("multer");
var i = 0;                                    //called only once as upload is just multer function

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads")
    },                                       //destination also optional.... if not given just put empty dict in diskStorage!!!!!!
    filename: (req, file, cb) => {

      cb(null, file.fieldname + i++);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') cb(null, true); //mimetype === type/subtype
    else cb(new Error("file is not supported"), false);
  }
});
