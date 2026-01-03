import React, { useState, useEffect } from 'react';
import { noteService } from '../../services/noteService';
import { labelService } from '../../services/labelService';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import NoteCard from '../../components/NoteCard/NoteCard';
import NoteModal from '../../components/NoteModal/NoteModal';
import '../Dashboard/Dashboard.scss';

const Trash = () => {
    const [notes, setNotes] = useState([]);
    const [labels, setLabels] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrashedNotes();
        fetchLabels();
    }, []);

    const fetchTrashedNotes = async () => {
        try {
            setLoading(true);
            const response = await noteService.getTrashedNotes();
            setNotes(response.data || []);
        } catch (error) {
            console.error('Error fetching trashed notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLabels = async () => {
        try {
            const response = await labelService.getLabels();
            setLabels(response.data || []);
        } catch (error) {
            console.error('Error fetching labels:', error);
        }
    };

    const handleUpdateNote = async (id, noteData) => {
        try {
            const response = await noteService.updateNote(id, noteData);
            setNotes(notes.map((note) => (note._id === id ? response.data : note)));
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await noteService.deleteNote(id);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleRestoreNote = async (id) => {
        try {
            await noteService.toggleTrash(id);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error restoring note:', error);
        }
    };

    const handleArchiveNote = async (id) => {
        try {
            await noteService.toggleArchive(id);
            fetchTrashedNotes();
        } catch (error) {
            console.error('Error archiving note:', error);
        }
    };

    const handlePinNote = async (id) => {
        try {
            await noteService.togglePin(id);
            fetchTrashedNotes();
        } catch (error) {
            console.error('Error pinning note:', error);
        }
    };

    return (
        <div className="dashboard">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onRefresh={fetchTrashedNotes}
            />

            <div className="dashboard-content">
                <Sidebar isOpen={sidebarOpen} labels={labels} />

                <main className="dashboard-main">
                    <h2 className="page-title">Trash</h2>
                    <p className="page-subtitle">
                        Notes in Trash are deleted after 7 days.
                    </p>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
                            {notes.length > 0 ? (
                                <div className="notes-section">
                                    <div className="notes-grid">
                                        {notes.map((note) => (
                                            <NoteCard
                                                key={note._id}
                                                note={note}
                                                onClick={setSelectedNote}
                                                onUpdate={handleUpdateNote}
                                                onDelete={handleDeleteNote}
                                                onArchive={handleArchiveNote}
                                                onTrash={handleRestoreNote}
                                                onPin={handlePinNote}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">🗑️</div>
                                    <p>No notes in Trash</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {selectedNote && (
                <NoteModal
                    note={selectedNote}
                    onClose={() => setSelectedNote(null)}
                    onUpdate={handleUpdateNote}
                    onDelete={handleDeleteNote}
                    onArchive={handleArchiveNote}
                    onTrash={handleRestoreNote}
                />
            )}
        </div>
    );
};

export default Trash;
