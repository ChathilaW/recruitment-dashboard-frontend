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

// Define the properties expected by the FilterBar component
interface FilterBarProps {
  searchTerm?: string; // The current text in the search input
  onSearchChange?: (term: string) => void; // Callback fired when search text changes
  dateFilter?: string; // The currently selected date filter
  onDateChange?: (val: string) => void; // Callback fired when a date filter is selected
  scoreFilter?: string; // The currently selected score filter
  onScoreChange?: (val: string) => void; // Callback fired when a score filter is selected
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  searchTerm = '', 
  onSearchChange,
  dateFilter = 'All',
  onDateChange,
  scoreFilter = 'All',
  onScoreChange
}) => {
  // Local state to track which dropdown menu (date or score) is currently open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Toggle function for dropdowns. Closes if clicking the same one, otherwise opens the new one.
  const toggleDropdown = (id: string) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  // Centralized handler for when an item is selected from any dropdown
  const handleSelect = (type: 'date' | 'score', val: string) => {
    // Fire the appropriate callback based on the dropdown type
    if (type === 'date') onDateChange?.(val);
    if (type === 'score') onScoreChange?.(val);
    // Close all dropdowns after selection
    setOpenDropdown(null);
  };

  return (
    // Main container for the filter bar
    <div className={styles.filterBar}>
      
      {/* Left group containing search input and filtering dropdowns */}
      <div className={styles.leftGroup}>
        {/* Search input box with icon */}
        <div className={styles.searchBox}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search" 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)} // Update search state in parent
          />
        </div>
        
        {/* Date Range Dropdown Wrapper */}
        <div className={styles.dropdownWrapper}>
          <button className={styles.filterBtn} onClick={() => toggleDropdown('date')}>
            <CalendarDaysIcon className={styles.iconSmall} /> 
            {/* Display active filter value or default label */}
            {dateFilter === 'All' ? 'Date Range' : dateFilter} 
            <ChevronDownIcon className={styles.iconTiny} />
          </button>
          {/* Render the dropdown menu conditionally based on state */}
          {openDropdown === 'date' && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => handleSelect('date', 'All')}>All Time</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('date', 'Dec 2025')}>Dec 2025</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('date', 'Jan 2026')}>Jan 2026</div>
            </div>
          )}
        </div>
        
        {/* Score Range Dropdown Wrapper */}
        <div className={styles.dropdownWrapper}>
          <button className={styles.filterBtn} onClick={() => toggleDropdown('score')}>
            <CheckBadgeIcon className={styles.iconSmall} /> 
            {/* Display active filter value or default label */}
            {scoreFilter === 'All' ? 'Score Range' : scoreFilter} 
            <ChevronDownIcon className={styles.iconTiny} />
          </button>
          {/* Render the dropdown menu conditionally based on state */}
          {openDropdown === 'score' && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={() => handleSelect('score', 'All')}>All Scores</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('score', '4.0+')}>4.0+</div>
              <div className={styles.dropdownItem} onClick={() => handleSelect('score', '3.0+')}>3.0+</div>
            </div>
          )}
        </div>
        
        {/* Advanced Filter Button (Placeholder for future functionality) */}
        <button className={styles.filterBtn}>
          <FunnelIcon className={styles.iconSmall} /> Advance Filter <ChevronDownIcon className={styles.iconTiny} />
        </button>
      </div>

      {/* Right group containing view options and global actions */}
      <div className={styles.rightGroup}>
        {/* Refer people shortcut */}
        <button className={styles.textBtn}>
          <UserPlusIcon className={styles.iconSmall} /> Refer People
        </button>
        
        {/* Quick settings button */}
        <button className={styles.iconBtn}>
          <Cog6ToothIcon className={styles.icon} />
        </button>
        
        {/* View mode toggle (e.g., Kanban vs List) */}
        <button className={styles.viewDropdown}>
          <ViewColumnsIcon className={styles.iconSmall} /> Kanban <ChevronDownIcon className={styles.iconTiny} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
