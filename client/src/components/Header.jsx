import React from "react";
import { motion } from "framer-motion";
import { Menu, Search, Bell, User } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, isOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <motion.header
      // initial={{ opacity: 0, y: -20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.4 }}
      className={`fixed right-0 w-full z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4 lg:px-6`}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4 ">
          {/* Sidebar toggle button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors sm:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Search bar */}
          <div
            className={`relative hidden sm:block duration-300 transition-all ease-in-out
                    ${
                      isOpen
                        ? "left-64  sm:w-28 lg:w-64"
                        : "left-16 sm:w-64 lg:w-80"
                    }`}
          >
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 
                      w-4 h-4 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none 
                  w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                  placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Switcher */}
          <div>
            <ThemeSwitcher />
          </div>

          {/* Notification button */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            {currentUser?.avatar ? (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={currentUser.avatar}
                alt="User Avatar"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:via-blue-700 dark:to-gray-900 rounded-full flex items-center justify-center">
                <button onClick={() => navigate("/signin")}>
                  <User className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {currentUser?.username || "Guest"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
