import React, { useState, useEffect } from 'react';
import { noteService } from '../../services/noteService';
import { labelService } from '../../services/labelService';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import CreateNote from '../../components/CreateNote/CreateNote';
import NoteCard from '../../components/NoteCard/NoteCard';
import NoteModal from '../../components/NoteModal/NoteModal';
import './Dashboard.scss';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [labels, setLabels] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
        fetchLabels();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await noteService.getNotes();
            setNotes(response.data || []);
        } catch (error) {
            console.error('Error fetching notes:', error);
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

    const handleCreateNote = async (noteData) => {
        try {
            const response = await noteService.createNote(noteData);
            setNotes([response.data, ...notes]);
        } catch (error) {
            console.error('Error creating note:', error);
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

    const handleArchiveNote = async (id) => {
        try {
            await noteService.toggleArchive(id);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error archiving note:', error);
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
            fetchNotes();
        } catch (error) {
            console.error('Error pinning note:', error);
        }
    };

    const handleSearch = async (query) => {
        if (!query.trim()) {
            fetchNotes();
            return;
        }

        try {
            const response = await noteService.searchNotes(query);
            setNotes(response.data || []);
        } catch (error) {
            console.error('Error searching notes:', error);
        }
    };

    const pinnedNotes = notes.filter((note) => note.isPinned && !note.isArchived && !note.isTrashed);
    const otherNotes = notes.filter((note) => !note.isPinned && !note.isArchived && !note.isTrashed);

    return (
        <div className="dashboard">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onSearch={handleSearch}
                onRefresh={fetchNotes}
            />

            <div className="dashboard-content">
                <Sidebar isOpen={sidebarOpen} labels={labels} />

                <main className="dashboard-main">
                    <CreateNote onCreateNote={handleCreateNote} />

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
                            {pinnedNotes.length > 0 && (
                                <div className="notes-section">
                                    <h3 className="section-title">PINNED</h3>
                                    <div className="notes-grid">
                                        {pinnedNotes.map((note) => (
                                            <NoteCard
                                                key={note._id}
                                                note={note}
                                                onClick={setSelectedNote}
                                                onUpdate={handleUpdateNote}
                                                onDelete={handleDeleteNote}
                                                onArchive={handleArchiveNote}
                                                onTrash={handleTrashNote}
                                                onPin={handlePinNote}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {otherNotes.length > 0 && (
                                <div className="notes-section">
                                    {pinnedNotes.length > 0 && <h3 className="section-title">OTHERS</h3>}
                                    <div className="notes-grid">
                                        {otherNotes.map((note) => (
                                            <NoteCard
                                                key={note._id}
                                                note={note}
                                                onClick={setSelectedNote}
                                                onUpdate={handleUpdateNote}
                                                onDelete={handleDeleteNote}
                                                onArchive={handleArchiveNote}
                                                onTrash={handleTrashNote}
                                                onPin={handlePinNote}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {notes.length === 0 && !loading && (
                                <div className="empty-state">
                                    <div className="empty-icon">💡</div>
                                    <p>Notes you add appear here</p>
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
                    onTrash={handleTrashNote}
                />
            )}
        </div>
    );
};

export default Dashboard;
