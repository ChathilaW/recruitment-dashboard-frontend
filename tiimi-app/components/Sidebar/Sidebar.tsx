"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
// Import outlined versions of icons for inactive states
import {
  HomeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
// Import solid versions of icons for active states
import { 
  UserIcon as UserSolidIcon, 
  CalendarIcon as CalendarSolidIcon, 
  HomeIcon as HomeSolidIcon,
  ChatBubbleLeftEllipsisIcon as ChatSolidIcon,
  CurrencyDollarIcon as CurrencyDollarSolidIcon,
  ClockIcon as ClockSolidIcon,
  BuildingOfficeIcon as BuildingSolidIcon,
} from '@heroicons/react/24/solid';
import { useSidebar } from '@/app/SidebarContext';

const Sidebar = () => {
  // usePathname hook retrieves the current route to determine which nav item is active
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  const handleBackdropClick = () => {
    if (isOpen) close();
  };

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={handleBackdropClick} />}
      
      {/* Main aside container for the sidebar, applying layout styles */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Top section containing the company logo/branding */}
        <div className={styles.topSection}>
          <div className={styles.logo}>
             {/* Placeholder text for the logo */}
             <span className={styles.logoText}>FIK</span>
          </div>
        </div>

        {/* Main navigation menu containing the core application routes */}
        <nav className={styles.nav}>
          {/* Home navigation link */}
          <Link href="/home" className={`${styles.navItem} ${pathname.startsWith('/home') || pathname === '/' ? styles.active : ''}`}>
            {/* Toggle between solid and outline icon based on active state */}
            {pathname.startsWith('/home') || pathname === '/' ? <HomeSolidIcon className={styles.icon} /> : <HomeIcon className={styles.icon} />}
          </Link>
          
          {/* Calendar navigation link */}
          <Link href="/calendar" className={`${styles.navItem} ${pathname.startsWith('/calendar') ? styles.active : ''}`}>
            {pathname === '/calendar' ? <CalendarSolidIcon className={styles.icon} /> : <CalendarIcon className={styles.icon} />}
          </Link>
          
          {/* Chat navigation link */}
          <Link href="/chat" className={`${styles.navItem} ${pathname.startsWith('/chat') ? styles.active : ''}`}>
            {pathname.startsWith('/chat') ? <ChatSolidIcon className={styles.icon} /> : <ChatBubbleLeftEllipsisIcon className={styles.icon} />}
          </Link>
          
          {/* Jobs/Recruitment navigation link - This is the primary module currently being built */}
          <Link href="/jobs" className={`${styles.navItem} ${pathname.startsWith('/jobs') ? styles.active : ''}`}>
            <UserSolidIcon className={styles.icon} />
            {/* Keep notification dot for visual parity (indicates new activity) */}
            <span className={styles.notificationDot}></span>
          </Link>
          
          {/* Visual separator between core tools and secondary tools */}
          <div className={styles.divider}></div>
          
          {/* Time Scheduling navigation link */}
          <Link href="/time-schedule" className={`${styles.navItem} ${pathname.startsWith('/time-schedule') ? styles.active : ''}`}>
            {pathname.startsWith('/time-schedule') ? <ClockSolidIcon className={styles.icon} /> : <ClockIcon className={styles.icon} />}
          </Link>
          
          <div className={styles.divider}></div>
          
          {/* Billing/Finance navigation link */}
          <Link href="/billing" className={`${styles.navItem} ${pathname.startsWith('/billing') ? styles.active : ''}`}>
            {pathname.startsWith('/billing') ? <CurrencyDollarSolidIcon className={styles.icon} /> : <CurrencyDollarIcon className={styles.icon} />}
          </Link>
          
          {/* Company/Organization navigation link */}
          <Link href="/company" className={`${styles.navItem} ${pathname.startsWith('/company') ? styles.active : ''}`}>
            {pathname.startsWith('/company') ? <BuildingSolidIcon className={styles.icon} /> : <BuildingOfficeIcon className={styles.icon} />}
          </Link>
          
          {/* Documents/Files navigation link */}
          <Link href="/documents" className={`${styles.navItem} ${pathname === '/documents' ? styles.active : ''}`}>
            <DocumentTextIcon className={styles.icon} />
          </Link>
        </nav>

        {/* Bottom section of the sidebar for settings and user profile */}
        <div className={styles.bottomNav}>
          <div className={styles.fullDivider}></div>
          {/* Settings navigation link */}
          <Link href="/settings" className={`${styles.navItem} ${pathname === '/settings' ? styles.active : ''}`}>
            <Cog6ToothIcon className={styles.icon} />
          </Link>
          
          {/* Current user's avatar/profile shortcut */}
          <a href="#" className={styles.avatarWrapper}>
            <div className={styles.avatarIcon}>
              <span className={styles.avatarText}>N</span>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
