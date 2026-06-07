import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { motion } from "framer-motion";


function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [religionFilter, setReligionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    fetchCustomers();
  }, [navigate]);

  const fetchCustomers = async () => {
  try {

    const response =
      await API.get("/customers");

    const updatedCustomers =
      response.data.map(
        (customer) => {

          const savedStatus =
            localStorage.getItem(
              `journeyStatus-${customer.id}`
            );

          return {
            ...customer,
            journeyStatus:
              savedStatus ||
              customer.journeyStatus
          };

        }
      );

    setCustomers(
      updatedCustomers
    );

  } catch (error) {

    console.error(
      "Error fetching customers:",
      error
    );

  }
};

  const totalCustomers = customers.length;

  const verifiedProfiles = customers.filter(
    (c) => c.journeyStatus === "Verified"
  ).length;

  const activeMatches = customers.filter(
    (c) => c.journeyStatus === "Actively Matching"
  ).length;

  const meetingsScheduled = customers.filter(
    (c) => c.journeyStatus === "Meeting Scheduled"
  ).length;

  const sentMatches = JSON.parse(
    localStorage.getItem("sentMatches")
  ) || [];

  const uniqueSentMatches = Array.from(
    new Map(
      sentMatches.map((item) => [
        `${item.customerId}-${item.matchId}`,
        item,
      ])
    ).values()
  );

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
        }}
      >
        <h1>Matchmaker Dashboard</h1>

        <div className="dashboard-cards">

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          >
            <h2>{totalCustomers}</h2>
            <p>Total Customers</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/journey-pipeline")}
            style={{ cursor: "pointer" }}
          >
            <h2>{verifiedProfiles}</h2>
            <p>Verified Profiles</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/sent-matches")}
            style={{ cursor: "pointer" }}
          >
            <h2>{activeMatches}</h2>
            <p>Active Matches</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/meetings")}
            style={{ cursor: "pointer" }}
          >
            <h2>{meetingsScheduled}</h2>
            <p>Meetings Scheduled</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/sent-matches")}
            style={{
              cursor: "pointer"
            }}
          >
            <h2>{uniqueSentMatches.length}</h2>
            <p>Matches Sent</p>
          </motion.div>

        </div>

        <h2 style={{ marginTop: "30px" }}>Customer Profiles</h2>

        <div className="filter-bar">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">All Cities</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
            <option>Ahmedabad</option>
            <option>Chennai</option>
            <option>Nashik</option>
            <option>Indore</option>
            <option>Kolkata</option>
          </select>

          <select
            value={religionFilter}
            onChange={(e) => setReligionFilter(e.target.value)}
          >
            <option value="">All Religions</option>
            <option>Hindu</option>
            <option>Muslim</option>
            <option>Christian</option>
            <option>Sikh</option>
            <option>Jain</option>
            <option>Buddhist</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Verified</option>
            <option>New Lead</option>
            <option>Meeting Scheduled</option>
            <option>Actively Matching</option>
            <option>Match Sent</option>
            <option>Relationship Progressing</option>
            <option>Success Story</option>
            <option>Profile Complete</option>
          </select>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="text"
            placeholder="Search by name, city, email or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>City</th>
              <th>Religion</th>
              <th>Profession</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers
              .filter((customer) => {
                const fullName =
                  `${customer.firstName} ${customer.lastName}`.toLowerCase();

                const search = searchTerm.toLowerCase();

                const matchesSearch =
                  fullName.includes(search) ||
                  customer.email?.toLowerCase().includes(search) ||
                  customer.city?.toLowerCase().includes(search) ||
                  String(customer.id).includes(search);

                const matchesCity =
                  cityFilter === "" || customer.city === cityFilter;

                const matchesReligion =
                  religionFilter === "" ||
                  customer.religion === religionFilter;

                const matchesStatus =
                  statusFilter === "" ||
                  customer.journeyStatus === statusFilter;

                const matchesGender =
                  genderFilter === "" ||
                  customer.gender === genderFilter;

                return (
                  matchesSearch &&
                  matchesCity &&
                  matchesReligion &&
                  matchesStatus &&
                  matchesGender
                );
              })
              .map((customer) => (
                <tr key={customer.id}>
                  <td>
                    {customer.firstName} {customer.lastName}
                  </td>

                  <td>{customer.age}</td>

                  <td>{customer.gender}</td>

                  <td>{customer.city}</td>

                  <td>{customer.religion}</td>

                  <td>{customer.profession}</td>

                  <td>
                    <span
                      className={`status-badge ${customer.journeyStatus
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {customer.journeyStatus}
                    </span>
                  </td>

                  <td>
                    <Link to={`/customer/${customer.id}`}>
                      <button>View</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      

      </div>
    </>
  );
}

export default Dashboard;