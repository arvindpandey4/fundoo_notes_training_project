import React, { useState } from 'react';
import {
    CheckBox as CheckBoxIcon,
    Brush as BrushIcon,
    Image as ImageIcon,
} from '@mui/icons-material';
import './CreateNote.scss';

const CreateNote = ({ onCreateNote }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() && !description.trim()) {
            setIsExpanded(false);
            return;
        }

        try {
            await onCreateNote({ title, description });
            setTitle('');
            setDescription('');
            setIsExpanded(false);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const handleClose = () => {
        if (title.trim() || description.trim()) {
            handleSubmit({ preventDefault: () => { } });
        } else {
            setIsExpanded(false);
        }
    };

    return (
        <div className="create-note-container">
            <div className={`create-note ${isExpanded ? 'expanded' : ''}`}>
                {!isExpanded ? (
                    <div className="create-note-collapsed" onClick={() => setIsExpanded(true)}>
                        <input
                            type="text"
                            placeholder="Take a note..."
                            readOnly
                            className="create-note-input-collapsed"
                        />
                        <div className="create-note-icons">
                            <button className="icon-btn" title="New list">
                                <CheckBoxIcon />
                            </button>
                            <button className="icon-btn" title="New note with drawing">
                                <BrushIcon />
                            </button>
                            <button className="icon-btn" title="New note with image">
                                <ImageIcon />
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="create-note-form">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="create-note-title"
                            autoFocus
                        />
                        <textarea
                            placeholder="Take a note..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="create-note-description"
                            rows={3}
                        />
                        <div className="create-note-actions">
                            <div className="create-note-icons">
                                <button type="button" className="icon-btn" title="Remind me">
                                    <i className="material-icons">add_alert</i>
                                </button>
                                <button type="button" className="icon-btn" title="Collaborator">
                                    <i className="material-icons">person_add</i>
                                </button>
                                <button type="button" className="icon-btn" title="Background options">
                                    <i className="material-icons">palette</i>
                                </button>
                                <button type="button" className="icon-btn" title="Add image">
                                    <ImageIcon />
                                </button>
                                <button type="button" className="icon-btn" title="Archive">
                                    <i className="material-icons">archive</i>
                                </button>
                                <button type="button" className="icon-btn" title="More">
                                    <i className="material-icons">more_vert</i>
                                </button>
                            </div>
                            <button type="button" className="btn-close" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </form>
                )}
            </div>
            {isExpanded && <div className="backdrop" onClick={handleClose}></div>}
        </div>
    );
};

export default CreateNote;
