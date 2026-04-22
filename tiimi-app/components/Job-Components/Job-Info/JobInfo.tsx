"use client";

import React from 'react';
import styles from './JobInfo.module.css';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  BriefcaseIcon, 
  BuildingOfficeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const JobInfo = () => {
  return (
    // Outer wrapper allowing the job information card to scroll independently
    <div className={styles.scrollWrapper}>
      {/* Centered container to limit the maximum width of the content */}
      <div className={styles.container}>
        {/* Main card component containing the job details */}
        <div className={styles.card}>
          
          {/* Header section with Job Title and high-level metadata */}
          <div className={styles.header}>
            <h2 className={styles.title}>Research and Development Officer</h2>
            
            {/* Grid layout for structured metadata items */}
            <div className={styles.metaGrid}>
              {/* Location metadata */}
              <div className={styles.metaItem}>
                <MapPinIcon className={styles.icon} />
                <div>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>Onsite (New York, NY)</span>
                </div>
              </div>
              
              {/* Employment Type metadata */}
              <div className={styles.metaItem}>
                <BriefcaseIcon className={styles.icon} />
                <div>
                  <span className={styles.metaLabel}>Employment Type</span>
                  <span className={styles.metaValue}>Full-time</span>
                </div>
              </div>
              
              {/* Salary Range metadata */}
              <div className={styles.metaItem}>
                <CurrencyDollarIcon className={styles.icon} />
                <div>
                  <span className={styles.metaLabel}>Salary Range</span>
                  <span className={styles.metaValue}>$90,000 - $120,000 / year</span>
                </div>
              </div>
              
              {/* Department metadata */}
              <div className={styles.metaItem}>
                <BuildingOfficeIcon className={styles.icon} />
                <div>
                  <span className={styles.metaLabel}>Department</span>
                  <span className={styles.metaValue}>Product & Innovation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Role Overview section: Paragraph description of the job */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Role Overview</h3>
            <p className={styles.text}>
              We are looking for a highly analytical and innovative Research and Development Officer to join our product team. In this role, you will be responsible for researching new materials, developing prototypes, and improving existing product lines. You will work closely with cross-functional teams to ensure that our innovations align with market needs and company goals.
            </p>
          </div>

          {/* Key Responsibilities section: Bulleted list of duties */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Responsibilities</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Conduct in-depth market research to identify emerging trends and technologies.</span>
              </li>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Design, execute, and analyze experiments to evaluate new product concepts.</span>
              </li>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Collaborate with engineering and design teams to develop viable prototypes.</span>
              </li>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Prepare detailed reports and presentations for senior management on R&D progress.</span>
              </li>
            </ul>
          </div>

          {/* Requirements & Qualifications section: Bulleted list of prerequisites */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Requirements & Qualifications</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Bachelor's or Master's degree in Engineering, Materials Science, or a related field.</span>
              </li>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Minimum 3 years of experience in an R&D or product development role.</span>
              </li>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Strong analytical skills and proficiency with data analysis software.</span>
              </li>
              <li className={styles.listItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Excellent written and verbal communication skills.</span>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
