import mongoose from "mongoose";

//this will contain every objects
const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    bookImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// This line creates a Mongoose model named Book based on the BookSchema. A model is a class with which we construct documents. In this case, each document will be a product with the defined schema.
export const Book = mongoose.model("Book", BookSchema);
