const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book.js");

//-----------------------------Connect to mongodb-------------------------------------------

mongoose
  .connect(
    "mongodb+srv://safaabdi930:safa2001@cluster0.xjkro8v.mongodb.net/Book_Manager",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("success ! "))
  .catch((e) => console.log("Failed ! ", e));

const app = express();
app.use(express.json());

//-----------------------------Post Book  -------------------------------------------

app.post("/api/books", (req, res) => {
  const book = new Book(req.body);
  book.save().then(() =>
    res.status(201).json({
      model: book,
      message: "Book created !",
    })
  );
});

//-----------------------------Get Books -------------------------------------------

app.get("/api/books", (req, res) => {
  Book.find()
    .then((books) =>
      res.status(200).json({
        model: books,
        message: "success",
      })
    )

    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "List Books not found",
      });
    });
});

//-----------------------------Patch -------------------------------------------

app.patch("/api/books/:id", (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "Book not found ",
        });
        return;
      }
      res.status(200).json({
        model: book,
        message: "Book uploaded",
      });
    })
    .catch((error) =>
      res.status(400).json({
        error: error.message,
        message: "Id format of book not correct",
      })
    );
});

//-----------------------------Get Book By ID -------------------------------------------
app.get("/api/books/:id", (req, res) => {
  Book.find({ _id: req.params.id })
    .then((books) =>
      res.status(200).json({
        model: books,
        message: "Book not found",
      })
    )
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Id format not correct",
      });
    });
});
//-----------------------------Delete Book -------------------------------------------

app.delete("/api/books/:id", (req, res) => {
  Book.findByIdAndRemove({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Book to delete not found" }))
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Id format not correct ",
      });
    });
});
//-----------------------------Example of book-------------------------------------------
/*
{
    "title": "Le Nom du Vent",
    "Author": "Patrick Rothfuss",
    "Publication_Year": "2007-03-27T00:00:00.000Z",
    "Description": "L'histoire captivante de Kvothe, un jeune prodige de la magie.",
    "Number_of_Pages": 662, 
    "Language": "Français",
    "Genre_Category": ["Fantasy", "Aventure"] 
}


{
    "title": "Le Seigneur des Anneaux",
    "Author": "J.R.R. Tolkien",
    "Publication_Year": "1954-07-29T00:00:00.000Z",
    "Description": "Un chef-d'œuvre de la littérature de fantasy.",
    "Number_of_Pages": 1178,
    "Language": "Français",
    "Genre_Category": ["Fantasy"],
  }
*/
module.exports = app;
