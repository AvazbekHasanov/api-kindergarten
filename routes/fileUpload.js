import Router from 'express';
import multer from 'multer';
import path from 'path';

import iconv from 'iconv-lite'

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
  limits: { fileSize: 30 * 1024 * 1024 },
}).single('file');



router.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ msg: err });
    }

    if (req.file === undefined) {
      return res.status(400).json({ msg: 'No file selected!' });
    } else {
      return res.json({
        path: `/uploads/${req.file.filename}`,
        extension: req.file.mimetype.split('/').length>0? req.file.mimetype.split('/')[1]:  req.file.mimetype,
         filename: iconv.decode(Buffer.from(req.file.originalname, 'binary'), 'utf-8'),
        size: (req.file.size/(1024 * 1024)).toFixed(2),
      });
    }
  });
});

export default router;
