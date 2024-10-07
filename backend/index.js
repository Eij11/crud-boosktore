import express from "express";
import mongoose from "mongoose";
import { PORT, mongoCSTR } from "./config.js";
import bookRoute from "./routes/book.route.js";
import accountRoute from "./routes/account.route.js";
import cors from "cors";
import path from "path";

// import { fileURLToPath } from "url";

// // Get __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Optino 1: Allow All origins with Default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:5000/",
//     methods: ["GET", "PSOT", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join("public", "uploads")));

//Middleware: routes
app.use("/api/books", bookRoute);
app.use("/api/accounts", accountRoute);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack");
});

//=====================================================
//make sure db is connected first before the server
//paste connection string
mongoose
  .connect(mongoCSTR)
  .then(() => {
    console.log("Connected to the db!");

    //establish server: indicates it is running
    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);

    // console.log("Connection failed.");
  });
