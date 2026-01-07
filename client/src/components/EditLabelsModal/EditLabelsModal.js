import React, { useState } from 'react';
import {
    Close as CloseIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Done as DoneIcon,
    Label as LabelIcon
} from '@mui/icons-material';
import { labelService } from '../../services/labelService';
import './EditLabelsModal.scss';

const EditLabelsModal = ({ isOpen, onClose, labels, onLabelsChange }) => {
    const [newLabelName, setNewLabelName] = useState('');
    const [editingLabelId, setEditingLabelId] = useState(null);
    const [editingName, setEditingName] = useState('');

    if (!isOpen) return null;

    const handleCreateLabel = async () => {
        if (!newLabelName.trim()) return;

        try {
            const response = await labelService.createLabel({ name: newLabelName });
            onLabelsChange([...labels, response.data]);
            setNewLabelName('');
        } catch (error) {
            console.error('Error creating label:', error);
        }
    };

    const handleDeleteLabel = async (id) => {
        try {
            await labelService.deleteLabel(id);
            onLabelsChange(labels.filter(l => l._id !== id));
        } catch (error) {
            console.error('Error deleting label:', error);
        }
    };

    const startEditing = (label) => {
        setEditingLabelId(label._id);
        setEditingName(label.name);
    };

    const handleUpdateLabel = async () => {
        if (!editingName.trim()) return;

        try {
            const response = await labelService.updateLabel(editingLabelId, { name: editingName });
            onLabelsChange(labels.map(l => l._id === editingLabelId ? response.data : l));
            setEditingLabelId(null);
            setEditingName('');
        } catch (error) {
            console.error('Error updating label:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="edit-labels-modal">
                <div className="modal-header">
                    <h3>Edit labels</h3>
                </div>

                <div className="modal-content">
                    {/* Create New Label */}
                    <div className="label-row new-label">
                        <div className="btn-icon mobile-hidden">
                            <CloseIcon className="icon-sm" onClick={() => setNewLabelName('')} />
                        </div>
                        <input
                            type="text"
                            placeholder="Create new label"
                            value={newLabelName}
                            onChange={(e) => setNewLabelName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateLabel()}
                        />
                        <button
                            className="btn-icon"
                            onClick={handleCreateLabel}
                            disabled={!newLabelName.trim()}
                        >
                            <DoneIcon />
                        </button>
                    </div>

                    {/* List Existing Labels */}
                    <div className="labels-list">
                        {labels.map(label => (
                            <div key={label._id} className="label-row">
                                {editingLabelId === label._id ? (
                                    <>
                                        <div className="btn-icon" onClick={() => handleDeleteLabel(label._id)}>
                                            <DeleteIcon />
                                        </div>
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateLabel()}
                                            autoFocus
                                        />
                                        <div className="btn-icon" onClick={handleUpdateLabel}>
                                            <DoneIcon />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="btn-icon">
                                            <LabelIcon className="icon-label" />
                                        </div>
                                        <span
                                            className="label-name"
                                            onClick={() => startEditing(label)}
                                        >
                                            {label.name}
                                        </span>
                                        <div className="btn-icon" onClick={() => startEditing(label)}>
                                            <EditIcon className="icon-edit" />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-done" onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default EditLabelsModal;
