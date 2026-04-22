"use client";

import React from 'react';
import styles from './KanbanColumn.module.css';
import { Column } from '@/data/dummyData';
import CandidateCard from '../CandidateCard/CandidateCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Candidate } from '@/data/dummyData';

// Interface defining the properties required by the KanbanColumn
interface KanbanColumnProps {
  column: Column; // Data object representing the column and its candidates
  onMoveCandidate: (candidateId: string, sourceColId: string, destColId: string) => void; // Drag-and-drop handler
  onSelectCandidate: (candidate: Candidate) => void; // Handler for clicking a candidate to view details
  onUpdateRating: (candidateId: string, newRating: number) => void; // Handler to update candidate ratings
  onRemoveCandidate: (candidateId: string) => void; // Handler to process candidate deletion
  confirmDeleteId: string | null; // The ID of the candidate currently requiring delete confirmation
  onSetConfirmDeleteId: (id: string | null) => void; // Handler to trigger delete confirmation mode
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  column, 
  onMoveCandidate, 
  onSelectCandidate, 
  onUpdateRating,
  onRemoveCandidate,
  confirmDeleteId,
  onSetConfirmDeleteId
}) => {
  // Prevent default behavior during drag over to allow elements to be dropped here
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
  };

  // Process the drop event when a candidate card is released over this column
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Retrieve the data passed from the dragStart event
    const candidateId = e.dataTransfer.getData('candidateId');
    const sourceColId = e.dataTransfer.getData('sourceColId');
    
    // If the candidate was dragged from a different column, trigger the move handler
    if (candidateId && sourceColId) {
      onMoveCandidate(candidateId, sourceColId, column.id);
    }
  };

  return (
    // Main column container, hooked up with drag-and-drop event listeners
    <div className={styles.column} onDragOver={handleDragOver} onDrop={handleDrop}>
      
      {/* Column Header: Title, Count, and Options */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {/* Status pill colored dynamically based on column data */}
          <div 
            className={styles.titlePill} 
            style={{ backgroundColor: column.color }}
          >
            {column.title}
          </div>
          {/* Badge displaying the total number of candidates currently in the column */}
          <span className={styles.count}>{column.count}</span>
        </div>
        {/* Button for column specific actions (e.g., bulk email) */}
        <button className={styles.detailBtn}>
          Detail <ChevronRightIcon className={styles.iconTiny} />
        </button>
      </div>

      {/* List container that holds the individual CandidateCard components */}
      <div className={styles.cardList}>
        {/* Iterate through the candidates assigned to this column and render them */}
        {column.candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
            columnId={column.id} 
            onClick={() => onSelectCandidate(candidate)}
            onUpdateRating={onUpdateRating}
            onRemoveCandidate={onRemoveCandidate}
            // Determine if THIS specific card is the one asking for delete confirmation
            isConfirmingDelete={confirmDeleteId === candidate.id}
            onSetConfirmDelete={() => onSetConfirmDeleteId(candidate.id)}
            onCancelConfirmDelete={() => onSetConfirmDeleteId(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
