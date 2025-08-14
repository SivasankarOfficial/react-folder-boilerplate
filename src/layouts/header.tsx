import { Briefcase, Users, MessageSquare, ChevronDown, Search, Bell, X, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { navItems } from "../constants/nav.constants";
import { getTokenPayload } from "../utils/getTokenPayload";
import { useNavigate } from "react-router-dom";
import Button from "../components/form-components/SubmitButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  console.log(isScrolled, window.scrollY);
  const navigator = useNavigate();
  const tokenPayload = getTokenPayload();
  const role = tokenPayload?.role;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Filter nav items by role (if role is assigned)
  const filteredNavItems = navItems.filter((item) => !item.role || item.role === role);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">
              Skill<span className="text-indigo-600">Bridge</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8  ml-auto mr-8">
            {filteredNavItems.map((item) => (
              <div key={item.name} className="relative group">
                <div className="flex items-center">
                  <button className="flex items-center text-gray-700 hover:text-indigo-600  py-2 text-sm font-medium transition-colors duration-200">
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </button>
                </div>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdown && (
                  <div
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    onMouseEnter={(e) => e.stopPropagation()}
                    onMouseLeave={(e) => e.stopPropagation()}
                  >
                    {item.dropdown.map((dropItem: any) => (
                      <a
                        key={dropItem.name}
                        href={dropItem.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200"
                      >
                        <dropItem.icon className="w-4 h-4 mr-3" />
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {tokenPayload ? (
              // ✅ Logged in: Show avatar and dropdown
              <div className="relative group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition cursor-pointer">
                  {tokenPayload.name?.[0]?.toUpperCase() || "U"}
                </div>

                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => navigator("/profile")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigator("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              // ❌ Not logged in: Show login/signup buttons
              <>
                <Button
                  onClick={() => navigator("/login")}
                  label="Log In"
                  className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
                />
                <Button
                  label="Sign Up"
                  onClick={() => navigator("/signup")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 rounded-md"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {/* Search Mobile */}
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Mobile Navigation Items */}
          {filteredNavItems.map((item, index) => (
            <div key={item.name} className="relative">
              <button
                onClick={() => item.hasDropdown && toggleDropdown(index)}
                className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Dropdown Menu */}
              {item.hasDropdown && activeDropdown === index && item.dropdown && (
                <div className="pl-6 space-y-1">
                  {item.dropdown.map((dropItem: any) => (
                    <a
                      key={dropItem.name}
                      href={dropItem.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      <dropItem.icon className="w-4 h-4 mr-3" />
                      {dropItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="px-3 py-2 space-y-2">
            <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              Log In
            </button>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
