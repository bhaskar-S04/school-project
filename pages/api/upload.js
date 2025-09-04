import cloudinary from "../../lib/cloudinary";
import multer from "multer";
import nextConnect from "next-connect";

const upload = multer ({storage: multer.memoryStorage()});

const apiRoute = nextConnect ({
    onError(error, req, res) {
        res.status(501).json({error:`Something went wrong! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single("file"));
apiRoute.post(async(req,res)=> {
    try {
        const file = req.file;
        const result = await cloudinary.uploader.upload_stream(
            {folder: "schools"},
            (error, result)=> {
                if (error) return res.status(500).json({error:error.message});
                res.status(200).json({url:result.secure_url});
            }
        );
        file.stream.pipe(result);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
});

export default apiRoute;

export const config={
    api:{
        bodyParser: false,
    },
};