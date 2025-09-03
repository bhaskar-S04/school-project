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
            if(error) {
                console.error("form parse error", error);
                return res.status(500).json({error:"File parse error"});
            }

            const nameValue = Array.isArray(fields.name) ? fields.name[0] : fields.name;
            const addressValue = Array.isArray(fields.address) ? fields.address[0] : fields.address;
            const cityValue = Array.isArray(fields.city) ? fields.city[0] : fields.city;
            const stateValue = Array.isArray(fields.state) ? fields.state[0] : fields.state;
            const contactValue = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
            const emailValue = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const filename = imageFile.newFilename || imageFile.originalFilename;
            const imageUrl = `/schoolImages/${filename}`;

            const query = `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            await db.execute(query, [nameValue, addressValue, cityValue, stateValue, contactValue, imageUrl, emailValue]);

            res.status(200).json({message:"School added", imageUrl});
        } catch(e) {
            console.error(e);
            res.status(500).json({error:"Server error"});
        }
    });
}