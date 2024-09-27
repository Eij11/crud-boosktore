//Import book schema
import { Book } from "../models/book.model.js";

import multer from "multer";

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.fieldname + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//=====================================================
//CREATE API: nasasave ang data sa db
//await and async since it takes time
//POST
export const postBookCreate = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Input all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      genre: req.body.genre,
      publishYear: req.body.publishYear,
      bookImage: req.file ? req.file.filename : null,
      // bookImage: req.file.filename,
      // bookImage: `http://localhost:5000/public/uploads/${req.file.filename}`,
    };

    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.error("Error in postBookCreate:", error); // Log detailed error
    res.status(500).json({ message: error.message });
  }
};

//=====================================================
//GET API ALL: retrieve/read/view
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=====================================================
//GET API by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=====================================================
//UPDATE API
//put/patch - command to update
//update book by id
//book: singular
export const putBookUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedBook = await Book.findById(id);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=====================================================
//DELETE PRODUCT API
export const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted succesfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
