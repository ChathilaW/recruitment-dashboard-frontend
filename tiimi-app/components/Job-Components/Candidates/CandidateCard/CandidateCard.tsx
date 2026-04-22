"use client";

import React, { useState } from 'react';
import styles from './CandidateCard.module.css';
import { Candidate } from '@/data/dummyData';
import Image from 'next/image';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { EllipsisHorizontalIcon, UserPlusIcon } from '@heroicons/react/24/outline';

// Define the properties expected by the CandidateCard component
interface CandidateCardProps {
  candidate: Candidate; // The candidate data object
  columnId: string; // The ID of the parent column containing this card
  onClick: () => void; // Function to call when the card is clicked (e.g. to open modal)
  onUpdateRating: (candidateId: string, newRating: number) => void; // Function to update the candidate's star rating
  onRemoveCandidate: (candidateId: string) => void; // Function to completely delete the candidate
  isConfirmingDelete: boolean; // Flag indicating if the delete confirmation UI should be shown
  onSetConfirmDelete: () => void; // Function to trigger the delete confirmation state
  onCancelConfirmDelete: () => void; // Function to cancel the delete confirmation state
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  columnId, 
  onClick, 
  onUpdateRating,
  onRemoveCandidate,
  isConfirmingDelete,
  onSetConfirmDelete,
  onCancelConfirmDelete
}) => {
  // Local state to track if the user is currently editing the rating
  const [isEditing, setIsEditing] = useState(false);
  // Local state to hold the value of the rating input field
  const [inputValue, setInputValue] = useState("");
  // Local state to track if this specific card is currently being dragged
  const [isDragging, setIsDragging] = useState(false);

  // Handler for clicking the "+ Add Assessment" button
  const handleAddAssessment = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up and opening the modal
    setIsEditing(true); // Switch to editing mode to show the input field
  };

  // Handler for when the rating input field loses focus
  const handleInputBlur = () => {
    const val = parseFloat(inputValue); // Convert the input string to a number
    // Validate the input: must be a number between 0 and 5
    if (!isNaN(val) && val > 0 && val <= 5) {
      onUpdateRating(candidate.id, val); // Call the parent function to save the new rating
    }
    setIsEditing(false); // Exit editing mode
    setInputValue(""); // Reset the input field
  };

  // Handler for keyboard events on the rating input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur(); // Save the rating when the user presses the Enter key
    }
  };

  // Handler for when the user starts dragging the card
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true); // Update state to apply dragging styles
    // Attach the candidate ID and source column ID to the drag event payload
    e.dataTransfer.setData('candidateId', candidate.id);
    e.dataTransfer.setData('sourceColId', columnId);

    // Create a custom visual clone of the card to act as the "drag image"
    const target = e.currentTarget as HTMLElement;
    const clone = target.cloneNode(true) as HTMLElement;
    // Apply custom styling to the clone so it looks elevated and rotated
    clone.style.backgroundColor = 'var(--card-bg)';
    clone.style.border = '2px solid var(--primary-accent)';
    clone.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
    clone.style.transform = 'rotate(4deg)';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px'; // Hide the clone off-screen
    clone.style.left = '-9999px';
    clone.style.width = `${target.offsetWidth}px`; // Match the original width
    document.body.appendChild(clone); // Append clone to the body temporarily
    
    // Set the drag image to the custom clone, centering the cursor on it
    e.dataTransfer.setDragImage(clone, target.offsetWidth / 2, target.offsetHeight / 2);

    // Clean up the clone from the DOM immediately after setting the drag image
    setTimeout(() => {
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
    }, 0);
  };

  // Handler for when the drag operation finishes (either dropped or cancelled)
  const handleDragEnd = () => {
    setIsDragging(false); // Reset dragging state to remove dragging styles
  };

  return (
    <div 
      // Apply dragging styles conditionally based on state
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`} 
      draggable // Enable HTML5 drag and drop for this element
      onDragStart={handleDragStart} // Attach drag start handler
      onDragEnd={handleDragEnd} // Attach drag end handler
      onClick={onClick} // Attach click handler to open candidate details modal
    >
      <div className={styles.header}>
        <Image 
          src={candidate.avatar} // Display the candidate's avatar image
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
        {/* Conditional rendering for the rating section */}
        {candidate.rating > 0 ? (
          // If a rating exists, display the star icon and the numeric rating
          <div className={styles.rating}>
            <StarIconSolid className={styles.starIcon} />
            <span className={styles.ratingText}>{candidate.rating} Overall</span>
          </div>
        ) : isEditing ? (
          // If editing mode is active, display the number input field
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            className={styles.ratingInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update state as user types
            onBlur={handleInputBlur} // Save when clicking outside the input
            onKeyDown={handleKeyDown} // Save when pressing Enter
            autoFocus // Automatically focus the input when it renders
            onClick={(e) => e.stopPropagation()} // Prevent card click event from firing
          />
        ) : (
          // If no rating exists and not editing, show the "+ Add Assessment" button
          <button className={styles.addAssessmentBtn} onClick={handleAddAssessment}>
            + Add Assessment
          </button>
        )}
        
        <div className={styles.actions}>
          {/* Show the "Referred" badge if applicable, but hide it during delete confirmation to save space */}
          {candidate.isReferred && !isConfirmingDelete && (
            <div className={styles.referredTag}>
              <UserPlusIcon className={styles.iconTiny} /> Referred
            </div>
          )}
          
          {/* Conditional rendering for the delete confirmation UI */}
          {isConfirmingDelete ? (
            <div className={styles.confirmActions}>
              <button 
                className={styles.confirmYes} 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  onRemoveCandidate(candidate.id); // Execute the deletion
                }}
              >
                Delete
              </button>
              <button 
                className={styles.confirmNo} 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  onCancelConfirmDelete(); // Cancel the deletion process
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            // Default "More options" button to trigger the delete confirmation
            <button 
              className={styles.moreBtn} 
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                onSetConfirmDelete(); // Trigger delete confirmation state
              }}
              title="Remove Candidate"
            >
              <EllipsisHorizontalIcon className={styles.iconSmall} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
