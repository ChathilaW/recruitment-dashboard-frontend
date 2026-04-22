"use client";

import React, { useEffect } from 'react';
import styles from './CandidateModal.module.css';
import { Candidate } from '@/data/dummyData';
import Image from 'next/image';
import { XMarkIcon, UserPlusIcon, EnvelopeIcon, PhoneIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface CandidateModalProps {
  candidate: Candidate; // The specific candidate data to display
  onClose: () => void; // Callback to handle closing the modal
}

const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, onClose }) => {
  // useEffect hook to prevent scrolling on the main page while the modal is open
  useEffect(() => {
    // When mounted, disable scrolling on the body
    document.body.style.overflow = 'hidden';
    return () => {
      // When unmounted (modal closed), restore default scrolling
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handler to close the modal if the user clicks the dark backdrop outside the modal content
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Check if the actual element clicked was the backdrop itself, not a child element inside it
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Backdrop layer that dims the screen and listens for outside clicks
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      
      {/* The actual modal container */}
      <div className={styles.modal}>
        
        {/* Header containing the avatar, name, applied date, and close button */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Image 
              src={candidate.avatar} 
              alt={candidate.name} 
              width={56} 
              height={56} 
              className={styles.avatar} 
            />
            <div className={styles.info}>
              <h2 className={styles.name}>{candidate.name}</h2>
              <p className={styles.subtitle}>Applied: {candidate.appliedDate}</p>
            </div>
          </div>
          {/* Close button in the top right corner */}
          <button className={styles.closeBtn} onClick={onClose}>
            <XMarkIcon className={styles.iconSmall} />
          </button>
        </div>

        {/* Main body of the modal containing tags and sections */}
        <div className={styles.body}>
          
          {/* Row for quick visual tags (Rating, Referral status) */}
          <div className={styles.tagsRow}>
            {candidate.rating > 0 ? (
              // If a rating exists, display it in a highlighted tag
              <div className={styles.ratingTag}>
                <StarIconSolid className={styles.starIcon} />
                {candidate.rating} Overall
              </div>
            ) : (
              // If no rating exists, display a neutral tag
              <div className={styles.ratingTag} style={{ backgroundColor: 'var(--main-bg)', color: 'var(--text-secondary)' }}>
                No Rating Yet
              </div>
            )}
            
            {/* Display the referral tag if the candidate is marked as referred */}
            {candidate.isReferred && (
              <div className={styles.referredTag}>
                <UserPlusIcon className={styles.iconTiny} /> Referred
              </div>
            )}
          </div>

          {/* Contact Information section containing dummy contact data */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>
            <div className={styles.placeholderBox}>
              <EnvelopeIcon className={styles.iconSmall} /> {candidate.name.split(' ')[0].toLowerCase()}@example.com
            </div>
            <div className={styles.placeholderBox}>
              <PhoneIcon className={styles.iconSmall} /> +1 (234) 567-8900
            </div>
          </div>

          {/* Documents section containing dummy files (e.g. Resume) */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Documents</h3>
            <div className={styles.placeholderBox}>
              <DocumentIcon className={styles.iconSmall} /> Resume_final.pdf
            </div>
          </div>
        </div>

        {/* Footer containing primary and secondary action buttons */}
        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary}>View Full Profile</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
