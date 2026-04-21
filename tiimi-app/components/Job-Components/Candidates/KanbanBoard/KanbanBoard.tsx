import React from 'react';
import styles from './KanbanBoard.module.css';
import { pipelineData } from '@/data/dummyData';
import KanbanColumn from '../KanbanColumn/KanbanColumn';

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
  const filteredData = pipelineData.map(column => {
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
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
