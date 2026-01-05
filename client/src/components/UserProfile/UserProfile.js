import React, { useState } from 'react';
import UserInfo from './UserInfo';
import './UserProfile.scss';

// PARENT COMPONENT
const UserProfile = () => {
    const [showInfo, setShowInfo] = useState(false);

    const userName = 'Arvind Pandey';
    const userEmail = 'arvind@fundoo.com';
    const userAge = 25;

    return (
        <div className="user-profile">
            <h2>Simple User Profile</h2>

            <button onClick={() => setShowInfo(!showInfo)}>
                {showInfo ? 'Hide Info' : 'Show Info'}
            </button>

            {showInfo && (
                <UserInfo
                    name={userName}
                    email={userEmail}
                    age={userAge}
                />
            )}
        </div>
    );
};

export default UserProfile;
