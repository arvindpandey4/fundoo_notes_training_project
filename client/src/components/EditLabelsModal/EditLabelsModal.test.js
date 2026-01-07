import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditLabelsModal from './EditLabelsModal';
import { labelService } from '../../services/labelService';

// Mock the labelService
jest.mock('../../services/labelService', () => ({
    labelService: {
        createLabel: jest.fn(),
        deleteLabel: jest.fn(),
        updateLabel: jest.fn(),
    },
}));

describe('EditLabelsModal Component', () => {
    const mockOnClose = jest.fn();
    const mockOnLabelsChange = jest.fn();
    const initialLabels = [
        { _id: '1', name: 'Personal' },
        { _id: '2', name: 'Work' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render nothing if isOpen is false', () => {
        render(
            <EditLabelsModal
                isOpen={false}
                onClose={mockOnClose}
                labels={initialLabels}
                onLabelsChange={mockOnLabelsChange}
            />
        );

        expect(screen.queryByText('Edit labels')).not.toBeInTheDocument();
    });

    test('should render modal when isOpen is true', () => {
        render(
            <EditLabelsModal
                isOpen={true}
                onClose={mockOnClose}
                labels={initialLabels}
                onLabelsChange={mockOnLabelsChange}
            />
        );

        expect(screen.getByText('Edit labels')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Create new label')).toBeInTheDocument();
        expect(screen.getByText('Personal')).toBeInTheDocument();
        expect(screen.getByText('Work')).toBeInTheDocument();
    });

    test('should allow typing in the new label input', () => {
        render(
            <EditLabelsModal
                isOpen={true}
                onClose={mockOnClose}
                labels={initialLabels}
                onLabelsChange={mockOnLabelsChange}
            />
        );

        const input = screen.getByPlaceholderText('Create new label');
        fireEvent.change(input, { target: { value: 'New Label' } });
        expect(input.value).toBe('New Label');
    });

    test('should call labelService.createLabel and update labels when create button is clicked', async () => {
        const newLabel = { _id: '3', name: 'New Label' };
        labelService.createLabel.mockResolvedValue({ data: newLabel });

        render(
            <EditLabelsModal
                isOpen={true}
                onClose={mockOnClose}
                labels={initialLabels}
                onLabelsChange={mockOnLabelsChange}
            />
        );

        const input = screen.getByPlaceholderText('Create new label');
        fireEvent.change(input, { target: { value: 'New Label' } });

        // Find the create button (it has the DoneIcon and is in the new-label row)
        // Since we can't easily select by icon, we'll select the button adjacent to the input
        // Or look for the button in the 'new-label' div.
        // A robust way is to click the button that is enabled.

        // In the component: 
        // <button className="btn-icon" onClick={handleCreateLabel} disabled={!newLabelName.trim()}>
        //    <DoneIcon />
        // </button>

        // We can get all buttons and find the one that is enabled and in the create row? 
        // Or simply assign a testId in strict adherence, but I can't modify the component now unless needed. 
        // Let's assume there are multiple checks/done icons.
        // The create button is the first one with DoneIcon if we look at the structure?
        // Actually, let's query the specific button.

        // The input is in `.label-row.new-label`. The button is a sibling.
        const createBtn = input.nextElementSibling;

        fireEvent.click(createBtn);

        await waitFor(() => {
            expect(labelService.createLabel).toHaveBeenCalledWith({ name: 'New Label' });
        });

        await waitFor(() => {
            expect(mockOnLabelsChange).toHaveBeenCalledWith([...initialLabels, newLabel]);
        });

        // Input should be cleared
        expect(input.value).toBe('');
    });

    test('should call onClose when Done button is clicked', () => {
        render(
            <EditLabelsModal
                isOpen={true}
                onClose={mockOnClose}
                labels={initialLabels}
                onLabelsChange={mockOnLabelsChange}
            />
        );

        fireEvent.click(screen.getByText('Done'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
