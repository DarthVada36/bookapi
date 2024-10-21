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

//TEST GET BOOK BY ID
export const getBookById = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await bookModel.findByPk(id);
        if (!book) {
            return res.status(404).json({message: 'Libro no encontrado'});
        }
        res.json(book);
        }
        catch (error)
        {
        console.error('Error al obtener el libro:', error);
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


//TEST DELETE BOOK
export const deleteBook = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await bookModel.findByPk(id);
        if (!book) {
            return res.status(404).json({message: 'Libro no encontrado'});
        }
        await book.destroy();
        res.status(200).json({message: 'Libro eliminado correctamente'});
        }
        catch (error)
        {
        console.error('Error   al eliminar el libro:', error);
        res.json({message: error.message});
        }
    }


//TEST UPDATE BOOK
export const updateBook = async(req,res) => {
    try {
        const {id} = req.params;
        const {bookTitle, authorName, bookSinopsis} = req.body;
        const book = await bookModel.findByPk(id);
        if (!book) {
            return res.status(404).json({message: 'Libro no encontrado'});
        }
        book.bookTitle = bookTitle;
        book.authorName = authorName;
        book.bookSinopsis = bookSinopsis;
        await book.save();
        res.status(200).json(book);
        }
        catch (error)
        {
        console .error('Error al actualizar el libro:', error);
        res.json({message: 'No se pudo actualizar el libro 🎃'});
        }
}