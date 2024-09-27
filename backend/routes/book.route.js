import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

import {
  postBookCreate,
  getAllBooks,
  getBookById,
  putBookUpdate,
  deleteBooks,
} from "../controllers/book.controller.js";

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.fieldname + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//Controller Function
// can add separately in a file
// POST route to create a book with image upload
router.post("/", upload.single("bookImage"), postBookCreate);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", putBookUpdate);
router.delete("/:id", deleteBooks);

export default router;
