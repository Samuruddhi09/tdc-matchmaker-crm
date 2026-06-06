import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function CustomerDetail() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await API.get(`/customers/${id}`);
      setCustomer(response.data);

      const savedNotes = localStorage.getItem(`notes-${response.data.id}`);
      setNotes(savedNotes || response.data.notes);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  if (!customer) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "left",
            padding: "0 0 20px 0",
          }}
        >
          Customer Profile Management
        </h1>

        <div className="profile-layout">
          <div className="profile-left">
            <div className="info-card">
              <h3>Personal Information</h3>

              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#6366f1",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                {customer.firstName.charAt(0)}
              </div>

              <div className="info-row">
                <strong>Name</strong>
                <span>
                  {customer.firstName} {customer.lastName}
                </span>
              </div>

              <div className="info-row">
                <strong>Gender</strong>
                <span>{customer.gender}</span>
              </div>

              <div className="info-row">
                <strong>Age</strong>
                <span>{customer.age}</span>
              </div>

              <div className="info-row">
                <strong>City</strong>
                <span>{customer.city}</span>
              </div>

              <div className="info-row">
                <strong>Country</strong>
                <span>{customer.country}</span>
              </div>

              <div className="info-row">
                <strong>DOB</strong>
                <span>{customer.dob}</span>
              </div>

              <div className="info-row">
                <strong>Email</strong>
                <span>{customer.email}</span>
              </div>

              <div className="info-row">
                <strong>Phone</strong>
                <span>{customer.phone}</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Education</h3>

              <div className="info-row">
                <strong>College</strong>
                <span>{customer.college}</span>
              </div>

              <div className="info-row">
                <strong>Degree</strong>
                <span>{customer.degree}</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Career</h3>

              <div className="info-row">
                <strong>Profession</strong>
                <span>{customer.profession}</span>
              </div>

              <div className="info-row">
                <strong>Company</strong>
                <span>{customer.company}</span>
              </div>

              <div className="info-row">
                <strong>Designation</strong>
                <span>{customer.designation}</span>
              </div>

              <div className="info-row">
                <strong>Income</strong>
                <span>₹{customer.income} LPA</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Family</h3>

              <div className="info-row">
                <strong>Religion</strong>
                <span>{customer.religion}</span>
              </div>

              <div className="info-row">
                <strong>Caste</strong>
                <span>{customer.caste}</span>
              </div>

              <div className="info-row">
                <strong>Siblings</strong>
                <span>{customer.siblings}</span>
              </div>

              <div className="info-row">
                <strong>Marital Status</strong>
                <span>{customer.maritalStatus}</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Partner Preferences</h3>

              <div className="info-row">
                <strong>Want Kids</strong>
                <span>{customer.wantKids}</span>
              </div>

              <div className="info-row">
                <strong>Relocate</strong>
                <span>{customer.relocate}</span>
              </div>

              <div className="info-row">
                <strong>Pets</strong>
                <span>{customer.pets}</span>
              </div>

              <div className="info-row">
                <strong>Languages</strong>
                <span>{customer.languages?.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <div className="info-card">
            <h3>Quick Overview</h3>

            <div className="info-row">
              <strong>Profession</strong>
              <span>{customer.profession}</span>
            </div>

            <div className="info-row">
              <strong>Income</strong>
              <span>₹{customer.income} LPA</span>
            </div>

            <div className="info-row">
              <strong>City</strong>
              <span>{customer.city}</span>
            </div>

            <div className="info-row">
              <strong>Religion</strong>
              <span>{customer.religion}</span>
            </div>
          </div>
            <div className="info-card">
              <h3>Journey Status</h3>

              <span
                className={`status-badge ${customer.journeyStatus
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                {customer.journeyStatus}
              </span>
            </div>

            <div className="info-card">
              <h3>AI Profile Summary</h3>

              <p>
                {customer.firstName} is a {customer.age}-year-old{" "}
                {customer.profession} based in {customer.city}.
              </p>

              <p>
                Professionally established at {customer.company},
                with an annual income of ₹{customer.income} LPA.
              </p>

              <p>
                Looking for a compatible life partner who shares
                similar values, family goals and long-term commitment.
              </p>
            </div>

            <div className="info-card">
              <h3>Internal Notes</h3>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="6"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                }}
              />

              <br />
              <br />

              <button
                onClick={() => {
                  localStorage.setItem(`notes-${customer.id}`, notes);
                  alert("Notes Saved");
                }}
              >
                Save Notes
              </button>
            </div>

            <Link to={`/matches/${customer.id}`}>
              <button style={{ width: "100%" }}>
                View Recommended Matches
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetail;