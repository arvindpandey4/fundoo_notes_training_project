import React from 'react';

const UserInfo = ({ name, email, age }) => {
    return (
        <div className="user-info">
            <h3>User Information</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Age:</strong> {age}</p>
        </div>
    );
};

export default UserInfo;
