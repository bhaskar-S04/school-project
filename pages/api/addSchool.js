import formidable from "formidable";
import fs from "fs";
import path from "path";
import db from "../../utils/db";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    const uploadDir = path.join(process.cwd(), "/public/schoolImages");
    await fs.promises.mkdir(uploadDir, {recursive:true});

    const form = formidable({uploadDir, keepExtensions: true, maxFilesize: 5 * 1024 * 1024});
    
    form.parse(req, async(error, fields, files)=> {
        try{
            if(err) {
                console.error("form parse error", err);
                return res.status(500).json({error:"File parse error"});
            }

            const {name, address, city, state, contact, email_id}=fields;
            const imageFile = files.image;

            const filename = path.basename(imageFile.filepath || imageFile.path || imageFile.newFilename);
            const imageUrl = `/schoolImages/${filename}`;

            const query = `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            await db.execute(query, [name, address, city, state, contact, imageUrl, email_id]);

            res.status(200).json({message:"School added", imageUrl});
        } catch(e) {
            console.error(e);
            res.status(500).json({error:"Server error"});
        }
    });
}