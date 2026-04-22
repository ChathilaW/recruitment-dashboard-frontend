"use client";

import React from 'react';
import styles from './Header.module.css';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  BellIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSidebar } from '@/app/SidebarContext';

const Header = () => {
  const { toggle } = useSidebar();

  return (
    // Main header element that spans the top of the dashboard
    <header className={styles.header}>
      
      {/* Left section: App branding and module title */}
      <div className={styles.left}>
        <button className={styles.mobileMenuBtn} onClick={toggle}>
          <Bars3Icon className={styles.iconSmall} />
        </button>

        <div className={styles.brand}>
          {/* Logo image rendered using Next.js optimized Image component */}
          <Image src="/images/tiimi-logo.png" alt="tiimi logo" width={20} height={20} className={styles.brandIcon} />
          <span className={styles.brandName}>tiimi</span>
          <span className={styles.pageTitle}>Recruitment</span>
        </div>
      </div>

      {/* Center section: High-level recruitment statistics and global links */}
      <div className={styles.center}>
        <div className={styles.stats}>
          {/* Total Jobs stat */}
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Jobs</span>
            <span className={styles.badgeGray}>8</span>
          </div>
          {/* Total Candidates stat (highlighted as active) */}
          <div className={styles.statItemActive}>
            <span className={styles.statLabelActive}>Candidate</span>
            <span className={styles.badgeOrange}>551</span>
          </div>
          {/* Link to external public-facing career site */}
          <a href="#" className={styles.link}>Career Site</a>
        </div>
      </div>

      {/* Right section: Global actions and user profile */}
      <div className={styles.right}>
        {/* Primary action button (e.g., create new job) */}
        <button className={styles.actionBtnPrimary}>
          <PlusIcon className={styles.iconSmall} />
        </button>
        <div className={styles.divider}></div>
        {/* Global search button */}
        <button className={styles.actionBtn}>
          <MagnifyingGlassIcon className={styles.iconSmall} />
        </button>
        {/* Notifications button with unread indicator dot */}
        <button className={styles.actionBtn}>
          <BellIcon className={styles.iconSmall} />
          <span className={styles.notificationDot}></span>
        </button>
        {/* User profile dropdown/menu trigger */}
        <div className={styles.profile}>
          <Image src="/images/Bogus Friki - User.png" alt="Profile" width={36} height={36} className={styles.avatar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
