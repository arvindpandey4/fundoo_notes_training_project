import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    ViewAgenda as ViewAgendaIcon,
    Settings as SettingsIcon,
    Apps as AppsIcon,
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import './Header.scss';

const Header = ({ onMenuClick, onSearch, onRefresh }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="icon-btn menu-btn" onClick={onMenuClick}>
                    <MenuIcon />
                </button>
                <div className="logo">
                    <span className="logo-icon">📝</span>
                    <span className="logo-text">Fundoo Notes</span>
                </div>
            </div>

            <div className="header-center">
                <form className="search-bar" onSubmit={handleSearch}>
                    <button type="submit" className="search-icon-btn">
                        <SearchIcon />
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </form>
            </div>

            <div className="header-right">
                <button className="icon-btn" onClick={onRefresh} title="Refresh">
                    <RefreshIcon />
                </button>
                <button className="icon-btn" title="List view">
                    <ViewAgendaIcon />
                </button>
                <button className="icon-btn" title="Settings">
                    <SettingsIcon />
                </button>
                <button className="icon-btn" title="Google apps">
                    <AppsIcon />
                </button>
                <div className="user-menu">
                    <button
                        className="icon-btn user-btn"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <AccountCircleIcon />
                    </button>
                    {showUserMenu && (
                        <div className="user-dropdown">
                            <div className="user-info">
                                <div className="user-avatar">
                                    {user?.firstName?.charAt(0).toUpperCase()}
                                </div>
                                <div className="user-details">
                                    <div className="user-name">
                                        {user?.firstName} {user?.lastName}
                                    </div>
                                    <div className="user-email">{user?.email}</div>
                                </div>
                            </div>
                            <div className="user-actions">
                                <button className="btn btn-secondary" onClick={handleLogout}>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
