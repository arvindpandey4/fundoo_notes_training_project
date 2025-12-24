const Label = require('../models/label.model');

// Create label
const createLabel = async (userId, body) => {
    return await Label.create({ ...body, user: userId });
};

// Get all labels for user
const getAllLabels = async (userId) => {
    return await Label.find({ user: userId }).sort({ createdAt: -1 });
};

// Get label by ID
const getLabelById = async (id, userId) => {
    const label = await Label.findById(id);
    if (!label || label.user.toString() !== userId.toString()) return null;
    return label;
};

// Update label
const updateLabel = async (id, userId, body) => {
    const label = await Label.findById(id);
    if (!label || label.user.toString() !== userId.toString()) return null;
    return await Label.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

// Delete label
const deleteLabel = async (id, userId) => {
    const label = await Label.findById(id);
    if (!label || label.user.toString() !== userId.toString()) return null;
    await Label.findByIdAndDelete(id);
    return true;
};

module.exports = { createLabel, getAllLabels, getLabelById, updateLabel, deleteLabel };
