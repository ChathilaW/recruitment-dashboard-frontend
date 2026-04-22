"use client";

import React, { useState } from 'react';
import styles from './JobHeader.module.css';
import { 
  ArrowLeftIcon, 
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// Interface defining the props accepted by JobHeader
interface JobHeaderProps {
  activeTab?: string; // The currently active tab identifier
  onTabChange?: (tab: string) => void; // Callback to notify parent component when a tab is clicked
}

// Configuration array defining the available tabs in the job view
const TABS = [
  { name: 'Candidates', icon: UserGroupIcon },
  { name: 'Job Info', icon: BriefcaseIcon },
  { name: 'Calendar', icon: CalendarIcon },
  { name: 'Score Card', icon: ClipboardDocumentCheckIcon },
  { name: 'Activity', icon: ChartBarIcon },
  { name: 'Application Form', icon: DocumentTextIcon },
  { name: 'Automation', icon: CogIcon, badge: 5 }, // Automation tab includes a badge for active workflows
];

const JobHeader: React.FC<JobHeaderProps> = ({ activeTab = 'Candidates', onTabChange }) => {
  // Local state to manage whether the job is Open or Closed
  const [jobStatus, setJobStatus] = useState<'Open' | 'Closed'>('Open');

  // Toggle function to switch the job status between Open and Closed
  const toggleStatus = () => {
    setJobStatus(prev => prev === 'Open' ? 'Closed' : 'Open');
  };

  return (
    // Main container for the job specific header area
    <div className={styles.jobHeader}>
      
      {/* Top Row: Navigation back, Job Title, Pagination, and Primary Actions */}
      <div className={styles.topRow}>
        <div className={styles.titleSection}>
          {/* Back button to return to the jobs list */}
          <button className={styles.iconBtn}>
            <ArrowLeftIcon className={styles.icon} />
          </button>
          <h1 className={styles.title}>Research and Development Officer</h1>
          <ChevronDownIcon className={styles.iconSmall} />
        </div>
        
        {/* Pagination controls for navigating between different job postings */}
        <div className={styles.pagination}>
          <button className={styles.iconBtnSmall}><ChevronLeftIcon className={styles.iconSmall} /></button>
          <button className={styles.iconBtnSmall}><ChevronRightIcon className={styles.iconSmall} /></button>
          <span className={styles.pageText}>1 of 8</span>
        </div>

        {/* Action buttons relevant to this specific job */}
        <div className={styles.actions}>
          {/* More options menu */}
          <button className={styles.iconBtnOutline}>
            <EllipsisHorizontalIcon className={styles.icon} />
          </button>
          {/* Primary CTA for sharing the job posting */}
          <button className={styles.primaryBtn}>
            <ShareIcon className={styles.iconSmall} />
            Share & Promote
          </button>
        </div>
      </div>

      {/* Meta Row: Job Status, Role, Location, and Creator details */}
      <div className={styles.metaRow}>
        {/* Status toggle button, styling changes based on jobStatus state */}
        <button 
          className={jobStatus === 'Open' ? styles.tagSuccess : styles.tagDanger}
          onClick={toggleStatus}
        >
          {/* Status indicator dot */}
          <span className={jobStatus === 'Open' ? styles.dot : styles.dotDanger}></span>
          {jobStatus}
          <ChevronDownIcon className={styles.iconTiny} />
        </button>
        {/* Job role classification */}
        <div className={styles.metaItem}>
          <MagnifyingGlassIcon className={styles.iconTiny} /> Researcher
        </div>
        {/* Job location type */}
        <div className={styles.metaItem}>
           Onsite
        </div>
        {/* Information about who created the job posting */}
        <div className={styles.metaItem}>
          <UserIcon className={styles.iconTiny} /> Created by 
          <Image src="/images/Bogus Friki - User.png" alt="Bogus" width={20} height={20} className={styles.metaAvatar} />
          <span className={styles.creatorName}>Bogus Fikri</span>
        </div>
      </div>

      {/* Tabs Row: Navigation within the specific job context */}
      <div className={styles.tabsRow}>
        {TABS.map((tab) => {
          const Icon = tab.icon; // Extract the icon component for this tab
          return (
            <button
              key={tab.name}
              // Apply active styling if this tab matches the activeTab prop
              className={`${styles.tab} ${activeTab === tab.name ? styles.activeTab : ''}`}
              onClick={() => onTabChange && onTabChange(tab.name)} // Fire callback when tab is clicked
            >
              <Icon className={styles.tabIcon} /> {tab.name}
              {/* Render the badge if the tab configuration includes one */}
              {tab.badge && <span className={styles.tabBadge}>{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Inline SVGs for icons that were missing from the Heroicons import list
const MagnifyingGlassIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)

const UserIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

export default JobHeader;
