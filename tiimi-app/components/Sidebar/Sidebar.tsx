"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
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
import { 
  UserIcon as UserSolidIcon, 
  CalendarIcon as CalendarSolidIcon, 
  HomeIcon as HomeSolidIcon,
  ChatBubbleLeftEllipsisIcon as ChatSolidIcon,
  CurrencyDollarIcon as CurrencyDollarSolidIcon,
  ClockIcon as ClockSolidIcon,
  BuildingOfficeIcon as BuildingSolidIcon,
} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <div className={styles.logo}>
           <span className={styles.logoText}>FIK</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/home" className={`${styles.navItem} ${pathname.startsWith('/home') || pathname === '/' ? styles.active : ''}`}>
          {pathname.startsWith('/home') || pathname === '/' ? <HomeSolidIcon className={styles.icon} /> : <HomeIcon className={styles.icon} />}
        </Link>
        <Link href="/calendar" className={`${styles.navItem} ${pathname.startsWith('/calendar') ? styles.active : ''}`}>
          {pathname === '/calendar' ? <CalendarSolidIcon className={styles.icon} /> : <CalendarIcon className={styles.icon} />}
        </Link>
        <Link href="/chat" className={`${styles.navItem} ${pathname.startsWith('/chat') ? styles.active : ''}`}>
          {pathname.startsWith('/chat') ? <ChatSolidIcon className={styles.icon} /> : <ChatBubbleLeftEllipsisIcon className={styles.icon} />}
        </Link>
        <Link href="/jobs" className={`${styles.navItem} ${pathname.startsWith('/jobs') ? styles.active : ''}`}>
          <UserSolidIcon className={styles.icon} />
          {/* Keep notification dot for visual parity */}
          <span className={styles.notificationDot}></span>
        </Link>
        <div className={styles.divider}></div>
        <Link href="/time-schedule" className={`${styles.navItem} ${pathname.startsWith('/time-schedule') ? styles.active : ''}`}>
          {pathname.startsWith('/time-schedule') ? <ClockSolidIcon className={styles.icon} /> : <ClockIcon className={styles.icon} />}
        </Link>
        <div className={styles.divider}></div>
        <Link href="/billing" className={`${styles.navItem} ${pathname.startsWith('/billing') ? styles.active : ''}`}>
          {pathname.startsWith('/billing') ? <CurrencyDollarSolidIcon className={styles.icon} /> : <CurrencyDollarIcon className={styles.icon} />}
        </Link>
        <Link href="/company" className={`${styles.navItem} ${pathname.startsWith('/company') ? styles.active : ''}`}>
          {pathname.startsWith('/company') ? <BuildingSolidIcon className={styles.icon} /> : <BuildingOfficeIcon className={styles.icon} />}
        </Link>
        <Link href="/documents" className={`${styles.navItem} ${pathname === '/documents' ? styles.active : ''}`}>
          <DocumentTextIcon className={styles.icon} />
        </Link>
      </nav>

      <div className={styles.bottomNav}>
        <div className={styles.fullDivider}></div>
        <Link href="/settings" className={`${styles.navItem} ${pathname === '/settings' ? styles.active : ''}`}>
          <Cog6ToothIcon className={styles.icon} />
        </Link>
        <a href="#" className={styles.avatarWrapper}>
          <div className={styles.avatarIcon}>
            <span className={styles.avatarText}>N</span>
          </div>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
