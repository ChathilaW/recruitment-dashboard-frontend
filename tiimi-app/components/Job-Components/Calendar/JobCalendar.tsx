"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from './JobCalendar.module.css';

const JobCalendar = () => {
  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={[
          { title: 'Interview with Jasmine Wiza', date: new Date().toISOString().split('T')[0], color: 'var(--tag-purple)' },
          { title: 'Screening - Jane Anderson', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], color: 'var(--tag-blue)' },
          { title: 'Final Round - Virgil Larkin', date: new Date(Date.now() + 172800000).toISOString().split('T')[0], color: 'var(--tag-green)' },
        ]}
        height="100%"
        contentHeight="auto"
      />
    </div>
  );
};

export default JobCalendar;
