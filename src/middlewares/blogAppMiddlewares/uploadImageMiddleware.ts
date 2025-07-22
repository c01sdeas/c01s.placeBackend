import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import fs from 'fs';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/blogApp/'); 
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// const uploadImageMiddleware = multer({storage});

// export default uploadImageMiddleware;

function uploadImageMiddleware(type: 'blog' | 'tag') {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = `uploads/blogApp/${type}-images`;
      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const uploadImageMiddleware = multer({storage, limits: { fileSize: 20 * 1024 * 1024 }});

  return uploadImageMiddleware;

}

export default uploadImageMiddleware;