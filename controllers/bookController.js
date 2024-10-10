import bookModel from "../models/bookModel.js"

//TEST GET ALL BOOKS
export const getAllBooks = async(req,res) => {
    try {
        const books = await bookModel.findAll();
        res.status(200).json(books);
        }
    catch(error)
        {
        console.error('Error al obtener los libros:', error);
        res.json({message: error.message});
        }
} 

//TEST POST BOOK
export const postBook = async(req,res) => {
    try {
        const {bookTitle, authorName, bookSinopsis} = req.body;
        const newBook = await bookModel.create({
            bookTitle,
            authorName,
            bookSinopsis,
        });
        res.status(201).json(newBook);
        } 
        catch (error) 
        {
        console.error('Error al crear el libro:', error);
        res.json({message: error.message});
    }
}

