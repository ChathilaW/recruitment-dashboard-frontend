"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import JobHeader from "../components/JobHeader/JobHeader";
import FilterBar from "@/components/Job-Components/Candidates/FilterBar/FilterBar";
import KanbanBoard from "@/components/Job-Components/Candidates/KanbanBoard/KanbanBoard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Candidates");

  return (
    <div className={styles.page}>
      <Sidebar />
      <Header />
      <main className={styles.mainContent}>
        <JobHeader activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "Candidates" ? (
          <>
            <FilterBar />
            <KanbanBoard />
          </>
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
            {activeTab} content is not implemented yet.
          </div>
        )}
      </main>
    </div>
  );
}
