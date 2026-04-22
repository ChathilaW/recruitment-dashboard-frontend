"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from './JobCalendar.module.css';

const JobCalendar = () => {
  return (
    // Container to encapsulate calendar styles
    <div className={styles.calendarContainer}>
      {/* Render the FullCalendar component */}
      <FullCalendar
        // Register the dayGridPlugin to enable the monthly view
        plugins={[dayGridPlugin]}
        // Set the default view on load
        initialView="dayGridMonth"
        // Configure the toolbar buttons at the top of the calendar
        headerToolbar={{
          left: 'prev,next today', // Navigation buttons
          center: 'title', // Month/Year title
          right: 'dayGridMonth,dayGridWeek,dayGridDay' // View switcher
        }}
        // Provide mock event data for the calendar. Uses dynamic dates relative to today.
        events={[
          { title: 'Interview with Jasmine Wiza', date: new Date().toISOString().split('T')[0], color: 'var(--tag-purple)' },
          { title: 'Screening - Jane Anderson', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], color: 'var(--tag-blue)' },
          { title: 'Final Round - Virgil Larkin', date: new Date(Date.now() + 172800000).toISOString().split('T')[0], color: 'var(--tag-green)' },
        ]}
        // Force the calendar to take up 100% of the parent container's height
        height="100%"
        // Adjust the content height automatically to prevent squishing
        contentHeight="auto"
      />
    </div>
  );
};

export default JobCalendar;
