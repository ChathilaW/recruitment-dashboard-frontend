import React from 'react';
import styles from './Sidebar.module.css';
import {
  HomeIcon,
  CalendarIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { UserIcon as UserSolidIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <div className={styles.logo}>
           <span className={styles.logoText}>FIK</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}>
          <HomeIcon className={styles.icon} />
        </a>
        <a href="#" className={styles.navItem}>
          <CalendarIcon className={styles.icon} />
        </a>
        <a href="#" className={`${styles.navItem} ${styles.active}`}>
          <UserSolidIcon className={styles.icon} />
          <span className={styles.notificationDot}></span>
        </a>
        <a href="#" className={styles.navItem}>
          <BriefcaseIcon className={styles.icon} />
        </a>
        <a href="#" className={styles.navItem}>
          <DocumentTextIcon className={styles.icon} />
        </a>
      </nav>

      <div className={styles.bottomNav}>
        <a href="#" className={styles.navItem}>
          <Cog6ToothIcon className={styles.icon} />
        </a>
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
