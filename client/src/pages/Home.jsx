import React, { useState } from "react";
import { motion } from "framer-motion";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import DashboardContent from "../components/DashboardContent";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className={`flex-1 transition-all duration-300 space-x-4 ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-16"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        <main className="p-4 lg:p-6 ">
          <DashboardContent activeSection={activeSection} />
        </main>
      </motion.div>
    </div>
  );
};

export default Home;
