import { NextConnect } from 'next-connect';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const apiRoute = NextConnect();

apiRoute.use(upload.array('files')); // This line handles multiple file uploads

apiRoute.post((req, res) => {
    // Handle the file uploads and other logic here
    res.status(200).json({ success: true });
});

export default apiRoute;
