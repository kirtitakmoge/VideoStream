// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where the files will be stored
        console.log(file)
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        // Define the filename for the uploaded file
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only image and PDF files
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false);
    }
};

// Export the configured multer instance
const upload = multer({ storage, fileFilter });
module.exports = upload;
