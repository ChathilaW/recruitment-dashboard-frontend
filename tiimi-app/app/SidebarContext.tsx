"use client";

import React, { createContext, useState, useContext } from 'react';

// Define the shape of our Sidebar context
interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

// Create the context with default values
const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

// Provider component that wraps your app and makes sidebar state available to any child component
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for consuming the sidebar context
export const useSidebar = () => useContext(SidebarContext);
