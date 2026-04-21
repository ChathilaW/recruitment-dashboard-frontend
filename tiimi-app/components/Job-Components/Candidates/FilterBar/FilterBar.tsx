import React, { useState } from 'react';
import styles from './FilterBar.module.css';
import { 
  MagnifyingGlassIcon, 
  CalendarDaysIcon,
  CheckBadgeIcon,
  FunnelIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  ViewColumnsIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface FilterBarProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  dateFilter?: string;
  onDateChange?: (val: string) => void;
  scoreFilter?: string;
  onScoreChange?: (val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  searchTerm = '', 
  onSearchChange,
  dateFilter = 'All',
  onDateChange,
  scoreFilter = 'All',
  onScoreChange
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  const handleSelect = (type: 'date' | 'score', val: string) => {
    if (type === 'date') onDateChange?.(val);
    if (type === 'score') onScoreChange?.(val);
    setOpenDropdown(null);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.leftGroup}>
        <div className={styles.searchBox}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search" 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        
        <div className={styles.dropdownWrapper}>
          <button className={styles.filterBtn} onClick={() => toggleDropdown('date')}>
            <CalendarDaysIcon className={styles.iconSmall} /> 
            {dateFilter === 'All' ? 'Date Range' : dateFilter} 
            <ChevronDownIcon className={styles.iconTiny} />
          </button>
          {openDropdown === 'date' && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => handleSelect('date', 'All')}>All Time</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('date', 'Dec 2025')}>Dec 2025</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('date', 'Jan 2026')}>Jan 2026</div>
            </div>
          )}
        </div>
        
        <div className={styles.dropdownWrapper}>
          <button className={styles.filterBtn} onClick={() => toggleDropdown('score')}>
            <CheckBadgeIcon className={styles.iconSmall} /> 
            {scoreFilter === 'All' ? 'Score Range' : scoreFilter} 
            <ChevronDownIcon className={styles.iconTiny} />
          </button>
          {openDropdown === 'score' && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => handleSelect('score', 'All')}>All Scores</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('score', '4.0+')}>4.0+</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('score', '3.0+')}>3.0+</div>
            </div>
          )}
        </div>
        
        <button className={styles.filterBtn}>
          <FunnelIcon className={styles.iconSmall} /> Advance Filter <ChevronDownIcon className={styles.iconTiny} />
        </button>
      </div>

      <div className={styles.rightGroup}>
        <button className={styles.textBtn}>
          <UserPlusIcon className={styles.iconSmall} /> Refer People
        </button>
        
        <button className={styles.iconBtn}>
          <Cog6ToothIcon className={styles.icon} />
        </button>
        
        <button className={styles.viewDropdown}>
          <ViewColumnsIcon className={styles.iconSmall} /> Kanban <ChevronDownIcon className={styles.iconTiny} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
