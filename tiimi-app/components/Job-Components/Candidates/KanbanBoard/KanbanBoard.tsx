"use client";

import React, { useState } from 'react';
import styles from './KanbanBoard.module.css';
import { pipelineData, Candidate } from '@/data/dummyData';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import CandidateModal from '../CandidateModal/CandidateModal';

interface KanbanBoardProps {
  searchTerm?: string; // Search text passed from FilterBar
  dateFilter?: string; // Date filter value passed from FilterBar
  scoreFilter?: string; // Score filter value passed from FilterBar
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  searchTerm = '', 
  dateFilter = 'All', 
  scoreFilter = 'All' 
}) => {
  // Initialize the local board state using the mock pipelineData
  const [boardData, setBoardData] = useState(pipelineData);
  
  // Track the ID of the candidate currently selected to display in the modal
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  // Track the ID of the candidate currently prompting for deletion confirmation
  // We lift this state up to the board level so only one candidate can confirm delete at a time
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Derive the active candidate object from the boardData using the selected ID
  const activeCandidate = selectedCandidateId 
    ? boardData.flatMap(col => col.candidates).find(c => c.id === selectedCandidateId)
    : null;

  // Handler to update the star rating of a specific candidate
  const handleUpdateRating = (candidateId: string, newRating: number) => {
    setBoardData(prev => {
      // Create a deep copy to ensure React detects the state change properly
      const newBoard = JSON.parse(JSON.stringify(prev));
      // Iterate through columns to find the candidate and update the rating
      for (const col of newBoard) {
        const candidate = col.candidates.find((c: any) => c.id === candidateId);
        if (candidate) {
          candidate.rating = newRating;
          break; // Stop searching once found
        }
      }
      return newBoard; // Return the mutated copy
    });
  };

  // Handler to permanently remove a candidate from the board
  const handleRemoveCandidate = (candidateId: string) => {
    setBoardData(prev => {
      // Deep copy the board state
      const newBoard = JSON.parse(JSON.stringify(prev));
      // Iterate through columns to find the candidate
      for (const col of newBoard) {
        const index = col.candidates.findIndex((c: any) => c.id === candidateId);
        if (index !== -1) {
          // Remove the candidate from the array
          col.candidates.splice(index, 1);
          // Update the column's candidate count to reflect the deletion
          col.count = col.candidates.length;
          break; // Stop searching once found
        }
      }
      return newBoard;
    });
    // Clear the confirmation state after successful deletion
    setConfirmDeleteId(null);
  };

  // Handler for drag-and-drop operations between columns
  const handleMoveCandidate = (candidateId: string, sourceColId: string, destColId: string) => {
    // Do nothing if dropping in the same column
    if (sourceColId === destColId) return;

    setBoardData(prev => {
      // Create a deep copy of the board data
      const newBoard = JSON.parse(JSON.stringify(prev));
      
      // Locate the source and destination columns
      const sourceColIndex = newBoard.findIndex((c: any) => c.id === sourceColId);
      const destColIndex = newBoard.findIndex((c: any) => c.id === destColId);
      
      // Fail safely if either column isn't found
      if (sourceColIndex === -1 || destColIndex === -1) return prev;

      // Locate the candidate within the source column
      const candidateIndex = newBoard[sourceColIndex].candidates.findIndex((c: any) => c.id === candidateId);
      if (candidateIndex === -1) return prev;

      // Remove the candidate from the source column array
      const [movedCandidate] = newBoard[sourceColIndex].candidates.splice(candidateIndex, 1);
      // Push the candidate into the destination column array
      newBoard[destColIndex].candidates.push(movedCandidate);

      // Recalculate candidate counts for both affected columns
      newBoard[sourceColIndex].count = newBoard[sourceColIndex].candidates.length;
      newBoard[destColIndex].count = newBoard[destColIndex].candidates.length;

      return newBoard;
    });
  };

  // Filter the board data dynamically based on the props received from the FilterBar
  const filteredData = boardData.map(column => {
    const lowerSearch = searchTerm.toLowerCase();
    const filteredCandidates = column.candidates.filter(c => {
      // Apply Search filter (by name)
      if (!c.name.toLowerCase().includes(lowerSearch)) return false;
      
      // Apply Score filter
      if (scoreFilter === '4.0+' && c.rating < 4.0) return false;
      if (scoreFilter === '3.0+' && c.rating < 3.0) return false;
      
      // Apply Date filter (this uses a simple string inclusion check on the mock data)
      if (dateFilter === 'Dec 2025' && !c.appliedDate.includes('Dec, 2025')) return false;
      if (dateFilter === 'Jan 2026' && !c.appliedDate.includes('Jan, 2026')) return false;

      // If it passes all checks, keep the candidate
      return true;
    });

    // Return the new column object with the filtered candidate list and updated count
    return {
      ...column,
      candidates: filteredCandidates,
      count: filteredCandidates.length // Count reflects filtered results, not total
    };
  });

  return (
    // Main container controlling the board height and layout
    <div className={styles.boardContainer}>
      {/* Scrollable area handling horizontal overflow for columns */}
      <div className={styles.boardScroll}>
        {/* Render each column based on the dynamically filtered data */}
        {filteredData.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onMoveCandidate={handleMoveCandidate} 
            // When a card is clicked, set its ID to active to open the modal
            onSelectCandidate={(c) => setSelectedCandidateId(c.id)}
            onUpdateRating={handleUpdateRating}
            onRemoveCandidate={handleRemoveCandidate}
            // Pass down the global delete confirmation state
            confirmDeleteId={confirmDeleteId}
            onSetConfirmDeleteId={setConfirmDeleteId}
          />
        ))}
      </div>
      
      {/* Conditionally render the modal if a candidate is currently selected */}
      {activeCandidate && (
        <CandidateModal 
          candidate={activeCandidate} 
          // Reset the selected ID to null to close the modal
          onClose={() => setSelectedCandidateId(null)} 
        />
      )}
    </div>
  );
};

export default KanbanBoard;
