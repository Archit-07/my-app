import React from 'react';
import './UserProfile.css'; // Import your CSS file for styling
import { Container } from '@mui/material'; // Import Material-UI Container

const UserProfile = (data) => {
    const profileData = data.profileData
  // Replace with actual user data
  const user = {
    username: profileData.username,
    email: profileData.email,
    gender: profileData.gender,
    age: profileData.age,
    fullName: profileData.fullname,
  };

  return (
    <Container maxWidth="sm" className="profile-container">
      <table className="profile-table">
        <tbody>
          <tr>
            <td>Full Name:</td>
            <td>{user.fullName}</td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{user.gender}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{user.age}</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default UserProfile;
