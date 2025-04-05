const Note = require('../models/notes');



const createNoteAsync = async (title,content,authorId) =>{
    const newNote = new Note({
        title: title,
        content: content,
        authorId: authorId
    });
    await newNote.save();
    return newNote;
};

const getAllNotesAsync = async () => {
    return await Note.find();
};

const getNoteByIdAsync = async (id) => {
    const note = await Note.findById(id);
    return note;
}

const deleteNoteByIdAsync = async (id) => {
    await Note.findByIdAndDelete(id);
    return true;
}
const updateNoteAsync = async (id, updatedNotes) => {
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        { $set: updatedNotes },  // Only update provided fields
        { new: true, runValidators: true } // Return updated note and apply validation
    );
    return updatedNote;
};


module.exports = {
    createNoteAsync,
    getAllNotesAsync,
    getNoteByIdAsync,
    deleteNoteByIdAsync,
    updateNoteAsync
};