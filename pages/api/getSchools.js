import db from "../../utils/db";

export default async function handler(req, res) {
    try {
        const[rows]=await db.execute("SELECT id, name, address, city, image FROM schools ORDER BY id DESC");
        res.status(200).json(rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({error:"DB error"});
    }
}