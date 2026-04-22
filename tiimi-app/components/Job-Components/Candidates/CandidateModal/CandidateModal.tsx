"use client";

import React, { useEffect } from 'react';
import styles from './CandidateModal.module.css';
import { Candidate } from '@/data/dummyData';
import Image from 'next/image';
import { XMarkIcon, UserPlusIcon, EnvelopeIcon, PhoneIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface CandidateModalProps {
  candidate: Candidate;
  onClose: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, onClose }) => {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
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
          <button className={styles.closeBtn} onClick={onClose}>
            <XMarkIcon className={styles.iconSmall} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.tagsRow}>
            {candidate.rating > 0 ? (
              <div className={styles.ratingTag}>
                <StarIconSolid className={styles.starIcon} />
                {candidate.rating} Overall
              </div>
            ) : (
              <div className={styles.ratingTag} style={{ backgroundColor: 'var(--main-bg)', color: 'var(--text-secondary)' }}>
                No Rating Yet
              </div>
            )}
            
            {candidate.isReferred && (
              <div className={styles.referredTag}>
                <UserPlusIcon className={styles.iconTiny} /> Referred
              </div>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>
            <div className={styles.placeholderBox}>
              <EnvelopeIcon className={styles.iconSmall} /> {candidate.name.split(' ')[0].toLowerCase()}@example.com
            </div>
            <div className={styles.placeholderBox}>
              <PhoneIcon className={styles.iconSmall} /> +1 (234) 567-8900
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Documents</h3>
            <div className={styles.placeholderBox}>
              <DocumentIcon className={styles.iconSmall} /> Resume_final.pdf
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary}>View Full Profile</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
