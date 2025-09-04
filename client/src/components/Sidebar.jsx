import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const SideBar = ({
  isOpen,
  toggleSidebar,
  activeSection,
  setActiveSection,
}) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: -250 }}
        animate={{
          opacity: 1,
          x: 0,
          width: isOpen ? 256 : 72,
        }}
        exit={{ opacity: 0, x: -250 }}
        transition={{
          duration: 0.3,
          width: { duration: 0.3, ease: "easeInOut" },
        }}
        className={`${
          isOpen ? "flex" : "hidden sm:flex"
        } fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-xl z-30 overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 sm:gap-0 px-4 py-5  border-gray-200 dark:border-gray-700 min-w-[64px]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold text-xl whitespace-nowrap text-gray-900 dark:text-gray-100"
                  >
                    Dashboard
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={toggleSidebar}
              className={` ${
                isOpen ? "flex" : "hidden sm:flex"
              } md:flex p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0`}
            >
              {isOpen ? (
                <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-3">
            {menuItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(id)}
                  transition={{ duration: 0.2 }}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 
                    ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <div className="flex items-center min-w-[20px]">
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium ml-3 whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>
        
        </div>
      </motion.div>
    </>
  );
};

export default SideBar;
