import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Sun, Moon, Leaf, Sparkles, Palette } from 'lucide-react';

const ThemeSelector = () => {
  const { 
    theme, 
    setTheme, 
    customPrimary, 
    setCustomPrimary, 
    customSecondary, 
    setCustomSecondary 
  } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const themes = [
    { id: 'cyber', name: 'Cyber Onyx', icon: Sparkles, color: 'hsl(265, 85%, 60%)' },
    { id: 'emerald', name: 'Royal Emerald', icon: Leaf, color: 'hsl(150, 80%, 42%)' },
    { id: 'sunset', name: 'Midnight Sunset', icon: Moon, color: 'hsl(325, 85%, 55%)' },
    { id: 'light', name: 'Alabaster Luxe', icon: Sun, color: 'hsl(255, 75%, 52%)' },
    { id: 'custom', name: 'Custom Palette', icon: Palette, color: 'hsl(215, 90%, 55%)' }
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];
  const IconComponent = currentTheme.icon;

  return (
    <div className="theme-selector-container">
      <button 
        onClick={() => setShowMenu(!showMenu)} 
        className="theme-selector-btn"
        title="Switch Theme"
        aria-label="Switch Theme"
      >
        <IconComponent size={18} style={{ color: theme === 'custom' ? customPrimary : 'inherit' }} />
      </button>
      
      {showMenu && (
        <>
          <div className="theme-selector-backdrop" onClick={() => setShowMenu(false)} />
          <div className="theme-selector-dropdown glass-card">
            <div className="theme-dropdown-title">Select Theme</div>
            {themes.map((t) => {
              const ThemeIcon = t.icon;
              return (
                <React.Fragment key={t.id}>
                  <button
                    className={`theme-dropdown-option ${theme === t.id ? 'active' : ''}`}
                    onClick={() => {
                      setTheme(t.id);
                      if (t.id !== 'custom') {
                        setShowMenu(false);
                      }
                    }}
                  >
                    <ThemeIcon size={16} style={{ color: t.id === 'custom' ? customPrimary : t.color }} />
                    <span>{t.name}</span>
                  </button>
                  {t.id === 'custom' && theme === 'custom' && (
                    <div className="custom-theme-pickers" onClick={(e) => e.stopPropagation()}>
                      <div className="color-picker-row">
                        <label>Primary</label>
                        <input
                          type="color"
                          className="color-picker-input"
                          value={customPrimary}
                          onChange={(e) => setCustomPrimary(e.target.value)}
                        />
                      </div>
                      <div className="color-picker-row">
                        <label>Secondary</label>
                        <input
                          type="color"
                          className="color-picker-input"
                          value={customSecondary}
                          onChange={(e) => setCustomSecondary(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
