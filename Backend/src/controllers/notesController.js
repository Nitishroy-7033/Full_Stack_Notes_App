
const {createNoteAsync, getAllNotesAsync, getNoteByIdAsync, deleteNoteByIdAsync, updateNoteAsync} = require('../services/notesService');
const logger = require('../utils/logger');
const createNote = async (req,res) =>{
    try{
        const {title,content,authorId} = req.body;
        const newTodo =await createNoteAsync(title,content,authorId);
        logger.info(`New note created: ${JSON.stringify(newTodo)}`);
        res.status(201).json(newTodo);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        logger.error(`Error: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const getAllNotes = async (req,res) =>{
    try{
        const notes = await getAllNotesAsync();
        logger.info(`Fetched all notes: ${JSON.stringify(notes)}`);
        res.status(200).json(notes);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        logger.error(`Error: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const getNoteById = async (req,res) =>{
    try{
        const id = req.params.id;
        const note = await getNoteByIdAsync(id);
        if(note){
            logger.info(`Fetched note with ID ${id}: ${JSON.stringify(note)}`);
            res.status(200).json(note);
        }
        else{
            logger.error(`Note with ID ${id} not found`);
            res.status(404).json({message: "Note not found"});
        }
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        logger.error(`Error: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const deleteNote = async (req,res) =>{
    try{
        const id = req.params.id;
        const deleted = await deleteNoteByIdAsync(id);
        if(deleted){
            res.status(204).send();
        }
        else{
            res.status(404).json({message: "Note not found"});
        }
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body; 

        const updatedNote = await updateNoteAsync(id, updatedFields);

        if (updatedNote) {
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    deleteNote,
    updateNote
};