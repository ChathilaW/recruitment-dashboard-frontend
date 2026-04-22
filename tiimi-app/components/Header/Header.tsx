import React from 'react';
import styles from './Header.module.css';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  BellIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <Image src="/images/tiimi-logo.png" alt="tiimi logo" width={20} height={20} className={styles.brandIcon} />
          <span className={styles.brandName}>tiimi</span>
          <span className={styles.pageTitle}>Recruitment</span>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Jobs</span>
            <span className={styles.badgeGray}>8</span>
          </div>
          <div className={styles.statItemActive}>
            <span className={styles.statLabelActive}>Candidate</span>
            <span className={styles.badgeOrange}>551</span>
          </div>
          <a href="#" className={styles.link}>Career Site</a>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.actionBtnPrimary}>
          <PlusIcon className={styles.iconSmall} />
        </button>
        <div className={styles.divider}></div>
        <button className={styles.actionBtn}>
          <MagnifyingGlassIcon className={styles.iconSmall} />
        </button>
        <button className={styles.actionBtn}>
          <BellIcon className={styles.iconSmall} />
          <span className={styles.notificationDot}></span>
        </button>
        <div className={styles.profile}>
          <Image src="/images/Bogus Friki - User.png" alt="Profile" width={36} height={36} className={styles.avatar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
