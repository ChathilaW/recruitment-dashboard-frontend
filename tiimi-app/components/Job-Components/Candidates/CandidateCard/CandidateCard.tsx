"use client";

import React, { useState } from 'react';
import styles from './CandidateCard.module.css';
import { Candidate } from '@/data/dummyData';
import Image from 'next/image';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { EllipsisHorizontalIcon, UserPlusIcon } from '@heroicons/react/24/outline';

interface CandidateCardProps {
  candidate: Candidate;
  columnId: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, columnId }) => {
  const [currentRating, setCurrentRating] = useState(candidate.rating);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleAddAssessment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    const val = parseFloat(inputValue);
    if (!isNaN(val) && val > 0 && val <= 5) {
      setCurrentRating(val);
    }
    setIsEditing(false);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('candidateId', candidate.id);
    e.dataTransfer.setData('sourceColId', columnId);

    // Create a custom drag image to make it more visible
    const target = e.currentTarget as HTMLElement;
    const clone = target.cloneNode(true) as HTMLElement;
    clone.style.backgroundColor = 'var(--card-bg)';
    clone.style.border = '2px solid var(--primary-accent)';
    clone.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
    clone.style.transform = 'rotate(4deg)';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.width = `${target.offsetWidth}px`;
    document.body.appendChild(clone);
    
    // Set the drag image
    e.dataTransfer.setDragImage(clone, target.offsetWidth / 2, target.offsetHeight / 2);

    // Clean up the clone from the DOM
    setTimeout(() => {
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`} 
      draggable 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.header}>
        <Image 
          src={candidate.avatar} 
          alt={candidate.name} 
          width={36} 
          height={36} 
          className={styles.avatar} 
        />
        <div className={styles.info}>
          <h4 className={styles.name}>{candidate.name}</h4>
          <p className={styles.date}>Applied at {candidate.appliedDate}</p>
        </div>
      </div>
      
      <div className={styles.footer}>
        {currentRating > 0 ? (
          <div className={styles.rating}>
            <StarIconSolid className={styles.starIcon} />
            <span className={styles.ratingText}>{currentRating} Overall</span>
          </div>
        ) : isEditing ? (
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            className={styles.ratingInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <button className={styles.addAssessmentBtn} onClick={handleAddAssessment}>
            + Add Assessment
          </button>
        )}
        
        <div className={styles.actions}>
          {candidate.isReferred && (
            <div className={styles.referredTag}>
              <UserPlusIcon className={styles.iconTiny} /> Referred
            </div>
          )}
          <button className={styles.moreBtn}>
            <EllipsisHorizontalIcon className={styles.iconSmall} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
