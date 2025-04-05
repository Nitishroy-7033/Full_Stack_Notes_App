const express = require('express');
const { createNote, getAllNotes, getNoteById, deleteNote,updateNote } = require('../controllers/notesController');

const router = express.Router();


router.post("/",createNote);
router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.delete("/:id",deleteNote);
router.put("/",updateNote);


module.exports = router;