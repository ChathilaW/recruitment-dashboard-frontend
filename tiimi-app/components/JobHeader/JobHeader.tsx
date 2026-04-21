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

interface JobHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const TABS = [
  { name: 'Candidates', icon: UserGroupIcon },
  { name: 'Job Info', icon: BriefcaseIcon },
  { name: 'Calendar', icon: CalendarIcon },
  { name: 'Score Card', icon: ClipboardDocumentCheckIcon },
  { name: 'Activity', icon: ChartBarIcon },
  { name: 'Application Form', icon: DocumentTextIcon },
  { name: 'Automation', icon: CogIcon, badge: 5 },
];

const JobHeader: React.FC<JobHeaderProps> = ({ activeTab = 'Candidates', onTabChange }) => {
  const [jobStatus, setJobStatus] = useState<'Open' | 'Closed'>('Open');

  const toggleStatus = () => {
    setJobStatus(prev => prev === 'Open' ? 'Closed' : 'Open');
  };

  return (
    <div className={styles.jobHeader}>
      <div className={styles.topRow}>
        <div className={styles.titleSection}>
          <button className={styles.iconBtn}>
            <ArrowLeftIcon className={styles.icon} />
          </button>
          <h1 className={styles.title}>Research and Development Officer</h1>
          <ChevronDownIcon className={styles.iconSmall} />
        </div>
        
        <div className={styles.pagination}>
          <button className={styles.iconBtnSmall}><ChevronLeftIcon className={styles.iconSmall} /></button>
          <button className={styles.iconBtnSmall}><ChevronRightIcon className={styles.iconSmall} /></button>
          <span className={styles.pageText}>1 of 8</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.iconBtnOutline}>
            <EllipsisHorizontalIcon className={styles.icon} />
          </button>
          <button className={styles.primaryBtn}>
            <ShareIcon className={styles.iconSmall} />
            Share & Promote
          </button>
        </div>
      </div>

      <div className={styles.metaRow}>
        <button 
          className={jobStatus === 'Open' ? styles.tagSuccess : styles.tagDanger}
          onClick={toggleStatus}
        >
          <span className={jobStatus === 'Open' ? styles.dot : styles.dotDanger}></span>
          {jobStatus}
          <ChevronDownIcon className={styles.iconTiny} />
        </button>
        <div className={styles.metaItem}>
          <MagnifyingGlassIcon className={styles.iconTiny} /> Researcher
        </div>
        <div className={styles.metaItem}>
           Onsite
        </div>
        <div className={styles.metaItem}>
          <UserIcon className={styles.iconTiny} /> Created by 
          <Image src="/images/Placeholder.png" alt="Bogus" width={20} height={20} className={styles.metaAvatar} />
          <span className={styles.creatorName}>Bogus Fikri</span>
        </div>
      </div>

      <div className={styles.tabsRow}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              className={`${styles.tab} ${activeTab === tab.name ? styles.activeTab : ''}`}
              onClick={() => onTabChange && onTabChange(tab.name)}
            >
              <Icon className={styles.tabIcon} /> {tab.name}
              {tab.badge && <span className={styles.tabBadge}>{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Add some missing icons for the meta row
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
