import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function CustomerDetail() {
  const { id } = useParams();

  const [customer, setCustomer] =
    useState(null);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response =
        await API.get(
          `/customers/${id}`
        );

      setCustomer(response.data);
    } catch (error) {
      console.error(
        "Error fetching customer:",
        error
      );
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
        <h1>Customer Profile</h1>

        <div className="card customer-detail-card">

          <h2>
            {customer.firstName}{" "}
            {customer.lastName}
          </h2>

          <p>
            <strong>Gender:</strong>{" "}
            {customer.gender}
          </p>

          <p>
            <strong>Age:</strong>{" "}
            {customer.age}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {customer.city}
          </p>

          <p>
            <strong>Religion:</strong>{" "}
            {customer.religion}
          </p>

          <p>
            <strong>Profession:</strong>{" "}
            {customer.profession}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="status-badge">
              {customer.journeyStatus}
            </span>
          </p>

          <p>
            <strong>Income:</strong> ₹
            {customer.income} LPA
          </p>

          <p>
            <strong>Height:</strong>{" "}
            {customer.height} inches
          </p>

          <p>
            <strong>Want Kids:</strong>{" "}
            {customer.wantKids}
          </p>

          <p>
            <strong>Open To Relocate:</strong>{" "}
            {customer.relocate}
          </p>

          <h3>
            Matchmaker Notes
          </h3>

          <p>{customer.notes}</p>

          <br />

          <Link to="/matches">
            <button>
              View Recommended Matches
            </button>
          </Link>

        </div>
      </div>
    </>
  );
}

export default CustomerDetail;