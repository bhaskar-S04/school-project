import db from "../../utils/db";

export default async function handler(req, res) {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );

    const schools = rows.map((s)=> ({
        ...s,
        image: s.image.startsWith("/schoolImages") ? s.image : `/schoolImages/${s.image}`
    }));

    res.status(200).json(schools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
}
