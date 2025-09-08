import '../styles/NavBar.css';
import { useAnimatedNavigation } from '../../hook/useAnimatedNavigation';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import {
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
  CalendarIcon,
  FileIcon,
} from '@radix-ui/react-icons';

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const { animatedNavigate } = useAnimatedNavigation();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <a
      href={to}
      onClick={e => {
        e.preventDefault();
        animatedNavigate(to);
      }}
      className={`nav-link ${isActive ? 'active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
};

export const NavBar = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <aside className="navbar-container">
      <div className="nav-content">
        <div className="nav-header">
          <h1>Menu</h1>
          <DragHandleHorizontalIcon className="hamburger-icon" />
        </div>

        <div className="search-container">
          <label htmlFor="search">
            <MagnifyingGlassIcon aria-label="search" className="search-icon" />
          </label>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>

        {/* navbar page links */}
        <nav className="navbar">
          <div className="nav-title">
            <h2>Tasks</h2>
          </div>
          <div className="nav-links">
            <NavLink to="/tasks">
              <div className="nav-item">
                <div className="nav-icon">
                  <ListBulletIcon />
                  <span>Home</span>
                </div>
                <div className="nav-count">+15</div>
              </div>
            </NavLink>
            <NavLink to="/tasks/calendar">
              <div className="nav-item">
                <div className="nav-icon">
                  <CalendarIcon />
                  <span>Calendar</span>
                </div>
                <div className="nav-count">0</div>
              </div>
            </NavLink>
            <NavLink to="/tasks/sticker-wall">
              <div className="nav-item">
                <div className="nav-icon">
                  <FileIcon />
                  <span>Sticker Wall</span>
                </div>
                <div className="nav-count">0</div>
              </div>
            </NavLink>
          </div>
        </nav>

        {/* navbar priority */}
        <nav className="priority-navbar">
          <div className="nav-title">
            <h2>Priority</h2>
          </div>
          <div className="nav-priority-links">
            <NavLink to="/tasks?priority=urgent">
              <div className="nav-priority-item">
                <div className="nav-icon">
                  <div className="nav-priority-color urgent" />
                  <span>Urgent</span>
                </div>
              </div>
            </NavLink>
            <NavLink to="/tasks?priority=high">
              <div className="nav-item">
                <div className="nav-icon">
                  <div className="nav-priority-color high" />
                  <span>High</span>
                </div>
              </div>
            </NavLink>
            <NavLink to="/tasks?priority=normal">
              <div className="nav-item">
                <div className="nav-icon">
                  <div className="nav-priority-color normal" />
                  <span>Normal</span>
                </div>
              </div>
            </NavLink>
            <NavLink to="/tasks?priority=low">
              <div className="nav-item">
                <div className="nav-icon">
                  <div className="nav-priority-color low" />
                  <span>Low</span>
                </div>
              </div>
            </NavLink>
            <NavLink to="/tasks?priority=done">
              <div className="nav-item">
                <div className="nav-icon">
                  <div className="nav-priority-color done" />
                  <span>Done</span>
                </div>
              </div>
            </NavLink>
          </div>
        </nav>

        {/* Theme Toggle Button */}
        <div className="theme-toggle">
          <button
            onClick={toggleTheme}
            className="theme-button"
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? (
              // Sun icon for switching to light mode
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sun-icon"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon icon for switching to dark mode
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="moon-icon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* TODO: if there's free time add settings and signin/signout links */}
    </aside>
  );
};
