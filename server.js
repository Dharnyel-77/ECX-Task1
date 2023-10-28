const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./bookModel");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const dbUri =
  "mongodb+srv://Dharnyel_77:Vj47Dwoyrj1Ietz0@cluster0.zovbnvc.mongodb.net/BooksAPI?retryWrites=true&w=majority";
try {
  mongoose.connect(dbUri).then(console.log("Connected to DB successfully!"));
} catch (error) {
  if (error) console.log(error);
}

app.get("/api", async (req, res) => {
  try {
    const book = await Book.find({});
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const options = { new: true };
    const book = await Book.findByIdAndUpdate(id, req.body, options);
    if (!book) {
      return res
        .status(404)
        .json({ message: `cannot find any book with ID:${id}` });
    }
    const updatedBook = await Book.findById(id);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res
          .status(404)
          .json({ message: `cannot find any book with ID:${id}` });
      }
      res
        .status(200)
        .json({ message: `Document with ID:${id} has been deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  

let PORT = 9000;
app.listen(PORT, () => {
  `Server is now active on port ${PORT}`;
});

//mongodb+srv://Dharnyel_77:<password>@cluster0.zovbnvc.mongodb.net/?retryWrites=true&w=majority
//Vj47Dwoyrj1Ietz0
