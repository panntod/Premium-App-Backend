import fs from 'fs';
import path from 'path';
import multer from 'multer';

const createDirectory = (directoryPath: string): void => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
};

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const destinationPath = path.join(__dirname, "../images");
    createDirectory(destinationPath);
    cb(null, destinationPath);
  },

  filename: (_, file, cb) => {
    cb(null, `images-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const acceptedType = ["image/jpg", "image/jpeg", "image/png"];
    if (!acceptedType.includes(file.mimetype)) {
      cb(null, false);
      return cb(new Error(`Tidak menerima tipe file (${file.mimetype})`));
    }

    const fileSize = parseFloat(req.headers["content-length"] || "");
    const maxSize = 1 * 1024 * 1024;
    
    if (isNaN(fileSize) || fileSize > maxSize) {
      cb(null, false);
      return cb(new Error(`Ukuran file terlalu besar`));
    }    

    cb(null, true);
  },
});

export default upload;
