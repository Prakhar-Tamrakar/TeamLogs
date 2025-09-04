import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Settings from "../pages/Settings";

const DashboardContent = () => {
  const activeSection = useSelector((state) => state.section.active);

  const Overview = () => (
    <div>
      <h1 className="text-2xl font-bold">Welcome back!</h1>
      <p className="text-gray-600 mb-4">Here's a quick summary of today.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-lg font-bold">$45,231</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-lg font-bold">2,350</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Sales</p>
          <p className="text-lg font-bold">+12,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Active Now</p>
          <p className="text-lg font-bold">573</p>
        </div>
      </div>
    </div>
  );

  const Section = ({ title }) => (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600 mt-1">
        This is the {title.toLowerCase()} section content.
      </p>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <Overview />;
      case "analytics": return <Section title="Analytics" />;
      case "users": return <Section title="Users" />;
      case "reports": return <Section title="Reports" />;
      case "performance": return <Section title="Performance" />;
      case "notifications": return <Section title="Notifications" />;
      case "settings": return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="mt-20 xs:mt-24"
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderSection()}
      </motion.div>
    </AnimatePresence>
  );
};

export default DashboardContent;
