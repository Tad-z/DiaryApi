const express = require("express");
const { postBook, getBooks, getBook, patchBook } = require("../controllers/book");
const { deleteBook, deleteAllBooks } = require("../controllers/book");
const router = express.Router();

router.post('/', postBook);
router.get('/', getBooks);
router.get('/:id', getBook);
router.patch('/:id', patchBook);
router.delete('/:id', deleteBook);
router.delete('/', deleteAllBooks);


module.exports = router;