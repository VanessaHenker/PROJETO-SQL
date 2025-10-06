import multer from "multer";
import path from "path";
import fs from "fs";

// 🔹 Define o destino onde as imagens serão salvas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), "src", "uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
