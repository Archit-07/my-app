// Logout.js (or wherever you handle logout)
import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear session data (e.g., sessionStorage.clear())
    sessionStorage.clear();

    // Redirect to the login page
    window.location.href = '/login'; // Replace with your login page URL
  };

  return (
    <div>
      {/* Your logout button */}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
