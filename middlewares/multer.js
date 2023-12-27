import multer from 'multer';
import path from 'path';
// Set up multer storage
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'uploads'), // Adjust the destination folder as needed
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
