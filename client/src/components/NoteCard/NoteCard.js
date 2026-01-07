import React, { useState } from 'react';
import {
    MoreVert as MoreVertIcon,
    PushPin as PushPinIcon,
    Archive as ArchiveIcon,
    Delete as DeleteIcon,
    Palette as PaletteIcon,
    Image as ImageIcon,
    PersonAdd as PersonAddIcon,
    AccessTime as AccessTimeIcon,
    Label as LabelIcon,
} from '@mui/icons-material';
import './NoteCard.scss';

const NoteCard = ({ note, onClick, onUpdate, onDelete, onArchive, onTrash, onPin }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handlePin = (e) => {
        e.stopPropagation();
        onPin(note._id);
    };

    const handleArchive = (e) => {
        e.stopPropagation();
        onArchive(note._id);
        setShowMenu(false);
    };

    const handleTrash = (e) => {
        e.stopPropagation();
        onTrash(note._id);
        setShowMenu(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(note._id);
        setShowMenu(false);
    };

    return (
        <div className="note-card" onClick={() => onClick(note)}>
            <div className="note-card-header">
                {note.title && <h3 className="note-title">{note.title}</h3>}
                <button
                    className={`pin-btn ${note.isPinned ? 'pinned' : ''}`}
                    onClick={handlePin}
                    title={note.isPinned ? 'Unpin note' : 'Pin note'}
                >
                    <PushPinIcon />
                </button>
            </div>

            <div className="note-content">
                {note.isChecklist && note.checklist && note.checklist.length > 0 ? (
                    <div className="note-checklist">
                        {note.checklist.map((item, i) => (
                            <div key={i} className="checklist-item-view">
                                <div className={`checkbox-preview ${item.isDone ? 'checked' : ''}`}>
                                    {item.isDone && '✓'}
                                </div>
                                <span className={item.isDone ? 'text-done' : ''}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="note-description">{note.description}</p>
                )}
            </div>

            {note.labels && note.labels.length > 0 && (
                <div className="note-labels">
                    {note.labels.map((label, index) => (
                        <span key={index} className="note-label">
                            {label.name}
                        </span>
                    ))}
                </div>
            )}

            {note.reminder && (
                <div className="note-reminder">
                    <AccessTimeIcon fontSize="small" />
                    <span>{new Date(note.reminder).toLocaleString()}</span>
                </div>
            )}

            {note.collaborators && note.collaborators.length > 0 && (
                <div className="note-collaborators">
                    <PersonAddIcon fontSize="small" />
                    <span>{note.collaborators.length} collaborator(s)</span>
                </div>
            )}

            <div className="note-actions">
                <button className="icon-btn" title="Remind me">
                    <AccessTimeIcon fontSize="small" />
                </button>
                <button className="icon-btn" title="Collaborator">
                    <PersonAddIcon fontSize="small" />
                </button>
                <button className="icon-btn" title="Background options">
                    <PaletteIcon fontSize="small" />
                </button>
                <button className="icon-btn" title="Add image">
                    <ImageIcon fontSize="small" />
                </button>
                <button className="icon-btn" onClick={handleArchive} title="Archive">
                    <ArchiveIcon fontSize="small" />
                </button>
                <div className="more-menu">
                    <button
                        className="icon-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        title="More"
                    >
                        <MoreVertIcon fontSize="small" />
                    </button>
                    {showMenu && (
                        <div className="more-dropdown">
                            <button onClick={handleTrash}>
                                <DeleteIcon fontSize="small" />
                                Move to trash
                            </button>
                            <button onClick={handleDelete}>
                                <DeleteIcon fontSize="small" />
                                Delete permanently
                            </button>
                            <button>
                                <LabelIcon fontSize="small" />
                                Add label
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
