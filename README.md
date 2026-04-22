# **Recruitment-Dashboard-frontend**



#### **Recruitment Dashboard Frontend**



A responsive, interactive recruitment dashboard built with Next.js (App Router), React, and CSS Modules. It features a drag-and-drop Kanban board for candidate pipelines, job filtering, and a fully responsive design.



#### **Tech Stack**

* **Core Framework:** Next.js (App Router)
* **UI Library:** React
* **Language:** TypeScript
* **Styling:** Vanilla CSS Modules
* **Icons:** Heroicons (https://heroicons.com/)
* **Calendar:** FullCalendar (https://fullcalendar.io/)
* **Deployment:** Vercel (https://recruitment-dashboard-frontend-six.vercel.app/jobs)



#### **Setup \& Running the Frontend**

##### Prerequisites

* Node.js
* npm or yarn

##### Installation

1. Clone the repository and navigate to the project root:  cd recruitment-dashboard-frontend
2. Navigate into the Next.js application folder:  cd tiimi-app
3. Install the required dependencies:  npm install



##### Running Locally

1. while in the application folder:  npm run dev
2. Open:  http://localhost...



#### **Assumptions and Technical Decisions**

* **Framework Choice:** Next.js (App Router) was chosen for its modern React server components approach, built-in file-system routing, and seamless deployment integration.
* **Styling Strategy:** CSS Modules (\*.module.css) were used to scope styles locally to each component. This prevents class name collisions, keeps styles highly modular, and avoids the heavy configuration overhead of utility-first frameworks like Tailwind for this custom-designed dashboard.
* **State Management:** React's native useState and useContext are used for state management. Local state is sufficient for isolated component interactions (like moving candidates or filtering), while a SidebarContext was created to manage global UI states like the mobile Sidebar toggle.
* **Mock Data Layer:** Currently, the dashboard relies on static mock data located in @/data/dummyData.ts. This was a deliberate architectural decision to rapidly prototype the UI, drag-and-drop logic, and responsive behaviors.
* **Iconography:** @heroicons/react was used to ensure crisp, scalable SVG icons across the dashboard.
* **Responsive Architecture:** Instead of squeezing desktop layouts onto small screens, a mobile-first strategy was implemented. On devices under 768px wide, the desktop sidebar converts into an off-canvas drawer controlled by a Hamburger menu, and dense horizontal layouts (like the job header and filters) intelligently stack or allow horizontal scrolling to preserve usability.



#### **Additional sources**

* **GitHub repository:** https://github.com/ChathilaW/Recruitment-Dashboard-frontend
* **Vercel deployment:** https://recruitment-dashboard-frontend-six.vercel.app/jobs

