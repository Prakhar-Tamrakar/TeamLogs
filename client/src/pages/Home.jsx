import React, { useState } from "react";
import { motion } from "framer-motion";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import DashboardContent from "../components/DashboardContent";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={`flex-1 transition-all ease-in-out duration-300 md:space-x-4 ${
            isSidebarOpen ? "sm:ml-64" : "sm:ml-16"
          }`}
        >
          {/* Pass toggleDarkMode to Header so we can switch themes from there */}
          <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} toggleDarkMode={toggleDarkMode} />

          <main className=" text-gray-900 dark:text-gray-100 transition-colors duration-300 p-2 md:p-5" >
            <DashboardContent activeSection={activeSection} />
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
