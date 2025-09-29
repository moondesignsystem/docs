"use client";

import { useState, useEffect, useRef } from "react";

export function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
        <div 
          role="button" 
          tabIndex={0} 
          className="moon-button"
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleDropdown();
            }
          }}
        >
          Open Dropdown
        </div>
        {isOpen && (
          <div 
            tabIndex={0} 
            className="moon-dropdown-content absolute top-full left-0 mt-2 z-10 w-[240px]"
          >
            <div className="w-full flex items-center justify-center h-space-80 bg-tertiary text-primary border border-primary text-center">
              Dropdown content
            </div>
          </div>
        )}
      </div>
  );
}