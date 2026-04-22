"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import JobHeader from "../components/JobHeader/JobHeader";
import FilterBar from "@/components/Job-Components/Candidates/FilterBar/FilterBar";
import KanbanBoard from "@/components/Job-Components/Candidates/KanbanBoard/KanbanBoard";
import JobCalendar from "@/components/Job-Components/Calendar/JobCalendar";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Candidates");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All");
  const [scoreFilter, setScoreFilter] = useState("All");

  return (
    <div className={styles.page}>
      <Sidebar />
      <Header />
      <main className={styles.mainContent}>
        <JobHeader activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "Candidates" ? (
          <>
            <FilterBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
              dateFilter={dateFilter}
              onDateChange={setDateFilter}
              scoreFilter={scoreFilter}
              onScoreChange={setScoreFilter}
            />
            <KanbanBoard 
              searchTerm={searchTerm} 
              dateFilter={dateFilter}
              scoreFilter={scoreFilter}
            />
          </>
        ) : activeTab === "Calendar" ? (
          <JobCalendar />
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
            {activeTab} content is not implemented yet.
          </div>
        )}
      </main>
    </div>
  );
}
