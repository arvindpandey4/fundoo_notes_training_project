import React, { useState, useEffect } from 'react';
import { noteService } from '../../services/noteService';
import { labelService } from '../../services/labelService';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import NoteCard from '../../components/NoteCard/NoteCard';
import NoteModal from '../../components/NoteModal/NoteModal';
import '../Dashboard/Dashboard.scss';

const Archive = () => {
    const [notes, setNotes] = useState([]);
    const [labels, setLabels] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArchivedNotes();
        fetchLabels();
    }, []);

    const fetchArchivedNotes = async () => {
        try {
            setLoading(true);
            const response = await noteService.getArchivedNotes();
            setNotes(response.data || []);
        } catch (error) {
            console.error('Error fetching archived notes:', error);
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

    const handleUnarchiveNote = async (id) => {
        try {
            await noteService.toggleArchive(id);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error unarchiving note:', error);
        }
    };

    const handleTrashNote = async (id) => {
        try {
            await noteService.toggleTrash(id);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error moving note to trash:', error);
        }
    };

    const handlePinNote = async (id) => {
        try {
            await noteService.togglePin(id);
            fetchArchivedNotes();
        } catch (error) {
            console.error('Error pinning note:', error);
        }
    };

    return (
        <div className="dashboard">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onRefresh={fetchArchivedNotes}
            />

            <div className="dashboard-content">
                <Sidebar isOpen={sidebarOpen} labels={labels} />

                <main className="dashboard-main">
                    <h2 className="page-title">Archive</h2>

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
                                                onArchive={handleUnarchiveNote}
                                                onTrash={handleTrashNote}
                                                onPin={handlePinNote}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">📦</div>
                                    <p>Your archived notes appear here</p>
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
                    onArchive={handleUnarchiveNote}
                    onTrash={handleTrashNote}
                />
            )}
        </div>
    );
};

export default Archive;
