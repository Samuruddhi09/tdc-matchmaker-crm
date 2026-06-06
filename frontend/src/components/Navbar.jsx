import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sidebar">

      <h2>TDC CRM</h2>

      <Link to="/dashboard">
        <p>Dashboard</p>
      </Link>

      <Link to="/matches">
        <p>Matches</p>
      </Link>

      

    </div>
  );
}

export default Navbar;