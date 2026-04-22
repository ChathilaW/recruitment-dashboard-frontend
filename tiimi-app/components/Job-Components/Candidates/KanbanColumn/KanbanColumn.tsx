"use client";

import React from 'react';
import styles from './KanbanColumn.module.css';
import { Column } from '@/data/dummyData';
import CandidateCard from '../CandidateCard/CandidateCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Candidate } from '@/data/dummyData';

interface KanbanColumnProps {
  column: Column;
  onMoveCandidate: (candidateId: string, sourceColId: string, destColId: string) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateRating: (candidateId: string, newRating: number) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  column, 
  onMoveCandidate, 
  onSelectCandidate, 
  onUpdateRating
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('candidateId');
    const sourceColId = e.dataTransfer.getData('sourceColId');
    
    if (candidateId && sourceColId) {
      onMoveCandidate(candidateId, sourceColId, column.id);
    }
  };

  return (
    <div className={styles.column} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div 
            className={styles.titlePill} 
            style={{ backgroundColor: column.color }}
          >
            {column.title}
          </div>
          <span className={styles.count}>{column.count}</span>
        </div>
        <button className={styles.detailBtn}>
          Detail <ChevronRightIcon className={styles.iconTiny} />
        </button>
      </div>

      <div className={styles.cardList}>
        {column.candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
            columnId={column.id} 
            onClick={() => onSelectCandidate(candidate)}
            onUpdateRating={onUpdateRating}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
