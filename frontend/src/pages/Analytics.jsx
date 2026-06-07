import Navbar from "../components/Navbar";
import API from "../services/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend
} from "recharts";

function Analytics() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalCustomers = customers.length;

  const maleCount = customers.filter(
    (c) => c.gender === "Male"
  ).length;

  const femaleCount = customers.filter(
    (c) => c.gender === "Female"
  ).length;

  const verifiedCount = customers.filter(
    (c) => c.journeyStatus === "Verified"
  ).length;

  const activeCount = customers.filter(
    (c) =>
      c.journeyStatus === "Actively Matching"
  ).length;

  const genderData = [
    {
      name: "Male",
      value: maleCount
    },
    {
      name: "Female",
      value: femaleCount
    }
  ];

  const cityCounts = {};

  customers.forEach((customer) => {
    cityCounts[customer.city] =
      (cityCounts[customer.city] || 0) + 1;
  });

  const cityData = Object.keys(cityCounts)
    .slice(0, 6)
    .map((city) => ({
      city,
      count: cityCounts[city]
    }));

  const statusData = [
    {
      name: "New Lead",
      value: customers.filter(
        (c) => c.journeyStatus === "New Lead"
      ).length
    },
    {
      name: "Verified",
      value: customers.filter(
        (c) => c.journeyStatus === "Verified"
      ).length
    },
    {
      name: "Actively Matching",
      value: customers.filter(
        (c) =>
          c.journeyStatus ===
          "Actively Matching"
      ).length
    },
    {
      name: "Match Sent",
      value: customers.filter(
        (c) => c.journeyStatus === "Match Sent"
      ).length
    },
    {
      name: "Meeting Scheduled",
      value: customers.filter(
        (c) =>
          c.journeyStatus ===
          "Meeting Scheduled"
      ).length
    },
    {
      name: "Relationship Progressing",
      value: customers.filter(
        (c) =>
          c.journeyStatus ===
          "Relationship Progressing"
      ).length
    },
    {
      name: "Success Story",
      value: customers.filter(
        (c) =>
          c.journeyStatus ===
          "Success Story"
      ).length
    }
  ];

  const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#14b8a6",
    "#f59e0b",
    "#ec4899",
    "#10b981",
    "#22c55e"
  ];

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "30px"
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            textAlign: "center"
          }}
        >
          Business Analytics
        </h1>

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
          >
            <h2>{maleCount}</h2>
            <p>Male Profiles</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2>{femaleCount}</h2>
            <p>Female Profiles</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/journey-pipeline")}
            style={{ cursor: "pointer" }}
          >
            <h2>{verifiedCount}</h2>
            <p>Verified Profiles</p>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/sent-matches")}
            style={{ cursor: "pointer" }}
          >
            <h2>{activeCount}</h2>
            <p>Active Matches</p>
          </motion.div>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Gender Distribution</h3>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="analytics-card">
            <h3>City Distribution</h3>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={cityData}>
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="analytics-card">
            <h3>Status Breakdown</h3>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="analytics-card">
            <h3>Match Conversion Funnel</h3>

            <div
              style={{
                marginTop: "25px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div
                style={{
                  background: "#6366f1",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/journey-pipeline")}
              >
                New Lead
              </div>

              <div
                style={{
                  background: "#8b5cf6",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/journey-pipeline")}
              >
                Verified
              </div>

              <div
                style={{
                  background: "#14b8a6",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/journey-pipeline")}
              >
                Actively Matching
              </div>

              <div
                style={{
                  background: "#f59e0b",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/sent-matches")}
              >
                Match Sent
              </div>

              <div
                style={{
                  background: "#ec4899",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/meetings")}
              >
                Meeting Scheduled
              </div>

              <div
                style={{
                  background: "#10b981",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/journey-pipeline")}
              >
                Relationship Progressing
              </div>

              <div
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/journey-pipeline")}
              >
                Success Story
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;