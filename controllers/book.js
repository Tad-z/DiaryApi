const Book = require("../models/book");

// creating a new book
exports.postBook = async (req,res) => {
  try{
    const bookDetails = req.body
    // if (!bookDetails) {
    //     res.status(400).json({ message: "Content can not be empty!" });
    //     return;
    //   };
    // const checkBook = Book.find({ title: bookDetails.title.toLowerCase() })
    // if(checkBook){
    //   return res.status(400).json({ message: "Book already exist" });
    // } else {
      const book = new Book({
        title: bookDetails.title.toLowerCase(),
        author: bookDetails.author.toLowerCase(),
        genre: bookDetails.genre.toLowerCase(),
      });
      const newBook = await book.save();
      return res.status(201).json(newBook);
    }
   catch (err) {
    console.log(err.message);
  }  
}

// fecthing all books
exports.getBooks = async (req,res) => {
  try{
      const books = await Book.find()
      console.log(books);
      return res.status(200).json(books);
  }catch(err){
      console.log(err.message);
      
  }
}

// fetching one book
exports.getBook = async (req,res) => {
  try{
    const id = req.params.id;
    const book = await Book.findById(id);
    console.log(book);
    if(!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  }catch(err){
    console.log(err.message);
  }
}

// updating the book details
exports.patchBook = async(req,res) => {
    try{
      if(Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Body cannot be empty" });
      }
        const id = req.params.id;
        await Book.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
              res.json({
                message: `Cannot update book with id=${id}. Maybe diary was not found!`
              });
            } else 
            res.json({ message: "book was updated successfully." });
          })      
    }catch(err){
        console.log();(err.message)
    }
}


// Delete a diary
exports.deleteBook = async(req,res) => {
    try{
        const id = req.params.id;
        await Book.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
              res.status(404).json({
                message: `Cannot delete book with id=${id}. Maybe Book was not found!`
              });
            } else {
             res.status(204).json({ message: "Book was deleted successfully!" });
            }
          })
    }catch(err){
        console.log(err.message);
    }
}
exports.deleteAllBooks = async (req, res) => {
  try {
    await Book.deleteMany({}).then((data) => {
      res.json({
        message: `${data.deletedCount} books were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message || "Some error occurred while removing all Books.",
    });
  }
};