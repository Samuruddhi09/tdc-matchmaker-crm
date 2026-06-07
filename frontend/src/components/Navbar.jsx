import { Link } from "react-router-dom";

function Navbar() {

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "/";
  };

  return (
    <div className="sidebar">

      <h2>TDC CRM</h2>

      <Link to="/dashboard">
        <p>Dashboard</p>
      </Link>

      <Link to="/sent-matches">
        <p>Sent Matches</p>
      </Link>

      <Link to="/journey-pipeline">
        <p>Journey Pipeline</p>
      </Link>

      <Link to="/analytics">
        <p>Analytics</p>
      </Link>

      <Link to="/meetings">
        <p>Meetings</p>
      </Link>

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          marginTop: "20px"
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;