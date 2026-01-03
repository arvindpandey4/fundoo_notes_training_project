import React, { useState, useEffect } from 'react';
import {
    PushPin as PushPinIcon,
    Archive as ArchiveIcon,
    Delete as DeleteIcon,
    Palette as PaletteIcon,
    Image as ImageIcon,
    PersonAdd as PersonAddIcon,
    AccessTime as AccessTimeIcon,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import './NoteModal.scss';

const NoteModal = ({ note, onClose, onUpdate, onDelete, onArchive, onTrash }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [collaboratorEmail, setCollaboratorEmail] = useState('');
    const [showCollaboratorInput, setShowCollaboratorInput] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setDescription(note.description || '');
        }
    }, [note]);

    const handleSave = async () => {
        if (title !== note.title || description !== note.description) {
            await onUpdate(note._id, { title, description });
        }
        onClose();
    };

    const handleAddCollaborator = async (e) => {
        e.preventDefault();
        if (collaboratorEmail.trim()) {
            // Call API to add collaborator
            setCollaboratorEmail('');
            setShowCollaboratorInput(false);
        }
    };

    if (!note) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={handleSave}></div>
            <div className="note-modal">
                <div className="note-modal-header">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="note-modal-title"
                    />
                    <button className="icon-btn pin-btn" title="Pin note">
                        <PushPinIcon />
                    </button>
                </div>

                <div className="note-modal-body">
                    <textarea
                        placeholder="Take a note..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="note-modal-description"
                        rows={6}
                    />

                    {showCollaboratorInput && (
                        <form onSubmit={handleAddCollaborator} className="collaborator-form">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                value={collaboratorEmail}
                                onChange={(e) => setCollaboratorEmail(e.target.value)}
                                className="collaborator-input"
                                autoFocus
                            />
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowCollaboratorInput(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    )}

                    {note.collaborators && note.collaborators.length > 0 && (
                        <div className="collaborators-list">
                            <h4>Collaborators:</h4>
                            {note.collaborators.map((collab, index) => (
                                <div key={index} className="collaborator-item">
                                    {collab}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="note-modal-footer">
                    <div className="note-modal-actions">
                        <button
                            className="icon-btn"
                            title="Remind me"
                            onClick={() => console.log('Add reminder')}
                        >
                            <AccessTimeIcon />
                        </button>
                        <button
                            className="icon-btn"
                            title="Collaborator"
                            onClick={() => setShowCollaboratorInput(!showCollaboratorInput)}
                        >
                            <PersonAddIcon />
                        </button>
                        <button className="icon-btn" title="Background options">
                            <PaletteIcon />
                        </button>
                        <button className="icon-btn" title="Add image">
                            <ImageIcon />
                        </button>
                        <button
                            className="icon-btn"
                            title="Archive"
                            onClick={() => {
                                onArchive(note._id);
                                onClose();
                            }}
                        >
                            <ArchiveIcon />
                        </button>
                        <button className="icon-btn" title="More">
                            <MoreVertIcon />
                        </button>
                        <button
                            className="icon-btn"
                            title="Delete"
                            onClick={() => {
                                onTrash(note._id);
                                onClose();
                            }}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                    <button className="btn-close" onClick={handleSave}>
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default NoteModal;
