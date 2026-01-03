import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Lightbulb as LightbulbIcon,
    Notifications as NotificationsIcon,
    Edit as EditIcon,
    Archive as ArchiveIcon,
    Delete as DeleteIcon,
    Label as LabelIcon,
} from '@mui/icons-material';
import './Sidebar.scss';

const Sidebar = ({ isOpen, labels = [] }) => {
    const menuItems = [
        { icon: <LightbulbIcon />, text: 'Notes', path: '/dashboard' },
        { icon: <NotificationsIcon />, text: 'Reminders', path: '/reminders' },
        { icon: <EditIcon />, text: 'Edit labels', path: '/labels' },
        { icon: <ArchiveIcon />, text: 'Archive', path: '/archive' },
        { icon: <DeleteIcon />, text: 'Trash', path: '/trash' },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-text">{item.text}</span>
                    </NavLink>
                ))}

                {labels.length > 0 && (
                    <>
                        <div className="sidebar-divider"></div>
                        <div className="sidebar-section-title">Labels</div>
                        {labels.map((label) => (
                            <NavLink
                                key={label._id}
                                to={`/label/${label._id}`}
                                className={({ isActive }) =>
                                    `sidebar-item ${isActive ? 'active' : ''}`
                                }
                            >
                                <span className="sidebar-icon">
                                    <LabelIcon />
                                </span>
                                <span className="sidebar-text">{label.name}</span>
                            </NavLink>
                        ))}
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
