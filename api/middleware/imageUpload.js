import multer from 'multer';
import Datauri from 'datauri';

import path from 'path';

// How do I get api route, so as to be able to modify folders

// upload to disk
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     const extArray = file.mimetype.split('/');
//     const extension = extArray[extArray.length - 1];
//     cb(null, `${file.originalname}-${Date.now()}.${extension}`);
//   },
// });

// Upload to memory
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
// export default multer({
//   multerUploads,
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10,
//   },
//   fileFilter,
// });
