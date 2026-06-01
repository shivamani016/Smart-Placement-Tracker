import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('theme') || 'cyber';
  });

  const [customPrimary, setCustomPrimaryState] = useState(() => {
    return localStorage.getItem('custom-primary') || '#3b82f6';
  });

  const [customSecondary, setCustomSecondaryState] = useState(() => {
    return localStorage.getItem('custom-secondary') || '#10b981';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setCustomPrimary = (color) => {
    setCustomPrimaryState(color);
    localStorage.setItem('custom-primary', color);
  };

  const setCustomSecondary = (color) => {
    setCustomSecondaryState(color);
    localStorage.setItem('custom-secondary', color);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--custom-primary', customPrimary);
    document.documentElement.style.setProperty('--custom-secondary', customSecondary);
  }, [theme, customPrimary, customSecondary]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      customPrimary, 
      setCustomPrimary, 
      customSecondary, 
      setCustomSecondary 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
