import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
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

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
        }}
      >
        <h1>TDC Matchmaker Dashboard</h1>

        <div className="dashboard-cards">
          <div className="card">
            <h2>{totalCustomers}</h2>
            <p>Total Customers</p>
          </div>

          <div className="card">
            <h2>{verifiedProfiles}</h2>
            <p>Verified Profiles</p>
          </div>

          <div className="card">
            <h2>{activeMatches}</h2>
            <p>Active Matches</p>
          </div>

          <div className="card">
            <h2>{meetingsScheduled}</h2>
            <p>Meetings Scheduled</p>
          </div>
        </div>

        <h2 style={{ marginTop: "30px" }}>
          Customer Profiles
        </h2>

        <input
          type="text"
          placeholder="Search customer..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            marginBottom: "20px",
          }}
        />

        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Profession</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {customers
              .filter((customer) =>
                `${customer.firstName} ${customer.lastName}`
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((customer) => (
                <tr key={customer.id}>
                  <td>
                    {customer.firstName} {customer.lastName}
                  </td>

                  <td>{customer.city}</td>

                  <td>{customer.profession}</td>

                  <td>
                    {customer.journeyStatus}
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