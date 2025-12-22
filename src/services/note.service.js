const Note = require('../models/note.model');

// Create note
const createNote = async (userId, body) => {
    return await Note.create({ ...body, user: userId });
};

// Get user notes
const getAllNotes = async (userId) => {
    return await Note.find({ user: userId }).sort({ createdAt: -1 });
};

// Get note by ID
const getNoteById = async (id, userId) => {
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== userId.toString()) return null;
    return note;
};

// Update note
const updateNote = async (id, userId, body) => {
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== userId.toString()) return null;
    return await Note.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

// Delete note
const deleteNote = async (id, userId) => {
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== userId.toString()) return null;
    await Note.findByIdAndDelete(id);
    return true;
};

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
