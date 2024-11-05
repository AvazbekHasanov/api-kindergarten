import Router from 'express';
import multer from 'multer';
import path from 'path';

const router = Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  // fileFilter: function(req, file, cb) {
  //   checkFileType(file, cb);
  // }
}).single('file');


function checkFileType(file, cb) {
  // return cb(null, true);
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Define the upload route
router.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ msg: err });
    }

    if (req.file === undefined) {
      return res.status(400).json({ msg: 'No file selected!' });
    } else {
      return res.json({
        msg: 'File uploaded!',
        file: `uploads/${req.file.filename}`
      });
    }
  });
});

export default router;
