import express from 'express';
import { getAllBooks } from '../controllers/bookController.js';


const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
// bookRouter.put('/:id', updateBook);
// router.delete
// router.edit

export default bookRouter;