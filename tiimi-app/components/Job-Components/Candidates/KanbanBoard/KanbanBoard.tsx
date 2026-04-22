"use client";

import React, { useState } from 'react';
import styles from './KanbanBoard.module.css';
import { pipelineData, Candidate } from '@/data/dummyData';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import CandidateModal from '../CandidateModal/CandidateModal';

interface KanbanBoardProps {
  searchTerm?: string;
  dateFilter?: string;
  scoreFilter?: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  searchTerm = '', 
  dateFilter = 'All', 
  scoreFilter = 'All' 
}) => {
  const [boardData, setBoardData] = useState(pipelineData);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const activeCandidate = selectedCandidateId 
    ? boardData.flatMap(col => col.candidates).find(c => c.id === selectedCandidateId)
    : null;

  const handleUpdateRating = (candidateId: string, newRating: number) => {
    setBoardData(prev => {
      const newBoard = JSON.parse(JSON.stringify(prev));
      for (const col of newBoard) {
        const candidate = col.candidates.find((c: any) => c.id === candidateId);
        if (candidate) {
          candidate.rating = newRating;
          break;
        }
      }
      return newBoard;
    });
  };

  const handleMoveCandidate = (candidateId: string, sourceColId: string, destColId: string) => {
    if (sourceColId === destColId) return;

    setBoardData(prev => {
      // Create a deep copy of the board data
      const newBoard = JSON.parse(JSON.stringify(prev));
      
      const sourceColIndex = newBoard.findIndex((c: any) => c.id === sourceColId);
      const destColIndex = newBoard.findIndex((c: any) => c.id === destColId);
      
      if (sourceColIndex === -1 || destColIndex === -1) return prev;

      const candidateIndex = newBoard[sourceColIndex].candidates.findIndex((c: any) => c.id === candidateId);
      if (candidateIndex === -1) return prev;

      // Remove from source and push to destination
      const [movedCandidate] = newBoard[sourceColIndex].candidates.splice(candidateIndex, 1);
      newBoard[destColIndex].candidates.push(movedCandidate);

      // Update counts
      newBoard[sourceColIndex].count = newBoard[sourceColIndex].candidates.length;
      newBoard[destColIndex].count = newBoard[destColIndex].candidates.length;

      return newBoard;
    });
  };

  const filteredData = boardData.map(column => {
    const lowerSearch = searchTerm.toLowerCase();
    const filteredCandidates = column.candidates.filter(c => {
      // Search filter
      if (!c.name.toLowerCase().includes(lowerSearch)) return false;
      
      // Score filter
      if (scoreFilter === '4.0+' && c.rating < 4.0) return false;
      if (scoreFilter === '3.0+' && c.rating < 3.0) return false;
      
      // Date filter (dummy check based on the mocked strings)
      if (dateFilter === 'Dec 2025' && !c.appliedDate.includes('Dec, 2025')) return false;
      if (dateFilter === 'Jan 2026' && !c.appliedDate.includes('Jan, 2026')) return false;

      return true;
    });

    return {
      ...column,
      candidates: filteredCandidates,
      count: filteredCandidates.length // Update column count based on results
    };
  });

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardScroll}>
        {filteredData.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onMoveCandidate={handleMoveCandidate} 
            onSelectCandidate={(c) => setSelectedCandidateId(c.id)}
            onUpdateRating={handleUpdateRating}
          />
        ))}
      </div>
      
      {activeCandidate && (
        <CandidateModal 
          candidate={activeCandidate} 
          onClose={() => setSelectedCandidateId(null)} 
        />
      )}
    </div>
  );
};

export default KanbanBoard;
