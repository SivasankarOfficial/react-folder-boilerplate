import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../components/form-components/SubmitButton";
import { getTokenPayload } from "../utils/getTokenPayload";

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const tokenPayload = getTokenPayload();
  const isLoggedIn = !!tokenPayload;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToDashboard = () => {
    if (tokenPayload?.role === "CLIENT") navigate(`/client/dashboard/${tokenPayload.id}`);
    else if (tokenPayload?.role === "FREELANCER") navigate(`/freelancer/dashboard/${tokenPayload.id}`);
    else navigate("/");
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">
              Skill<span className="text-indigo-600">Bridge</span>
            </span>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-lg font-semibold flex items-center justify-center hover:bg-indigo-700 cursor-pointer">
                  {tokenPayload?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={goToDashboard}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  label="Log In"
                  className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
                />
                <Button
                  label="Sign Up"
                  onClick={() => navigate("/signup")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                />
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
        <div className="px-4 pt-2 pb-3 space-y-2 bg-white border-t border-gray-200">
          {isLoggedIn ? (
            <>
              <button
                onClick={goToDashboard}
                className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-100"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PublicHeader;
