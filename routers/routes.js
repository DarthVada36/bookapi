import express from 'express';
import { getAllBooks } from '../controllers/bookController.js';
import { postBook } from '../controllers/bookController.js';
import { deleteBook } from '../controllers/bookController.js';
import { updateBook } from '../controllers/bookController.js';


const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.post('/', postBook);
bookRouter.delete('/:id', deleteBook);
bookRouter.put('/:id', updateBook);

export default bookRouter;