import React from "react";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="header">
      <button className="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default Header;
