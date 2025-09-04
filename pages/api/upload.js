import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: false,
      uploadDir: path.join(process.cwd(), "/public/schoolImages"),
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });

      const filePath = files.image.filepath.replace(
        process.cwd() + "/public",
        ""
      );

      return res.status(200).json({
        ...fields,
        image: filePath,
      });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
