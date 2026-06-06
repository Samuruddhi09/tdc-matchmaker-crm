import { useEffect, useState } from "react";
import API from "../services/api";

function JourneyPipeline() {
  const [customers, setCustomers] =
    useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response =
        await API.get("/customers");

      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const statuses = [
    "New Lead",
    "Verified",
    "Actively Matching",
    "Match Sent",
    "Meeting Scheduled",
    "Relationship Progressing",
    "Success Story"
    ];

  return (
    <div
      style={{
        marginTop: "40px"
      }}
    >
      <h2>
        Customer Journey Pipeline
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto"
        }}
      >
        {statuses.map((status) => (
          <div
            key={status}
            style={{
              minWidth: "220px",
              background:
                status === "New Lead"
                ? "#eff6ff"
                : status === "Verified"
                ? "#eef2ff"
                : status === "Actively Matching"
                ? "#ecfdf5"
                : status === "Match Sent"
                ? "#fff7ed"
                : status === "Meeting Scheduled"
                ? "#fdf2f8"
                : status === "Relationship Progressing"
                ? "#eef2ff"
                : "#ecfeff",
              padding: "15px",
              borderRadius: "12px"
            }}
          >
            <h3>
                {status}
                {" "}
                (
                {
                    customers.filter(
                    (customer) =>
                        customer.journeyStatus === status
                    ).length
                }
                )
            </h3>

            {customers
              .filter(
                (customer) =>
                  customer.journeyStatus ===
                  status
              )
              .map((customer) => (
                <div
                  key={customer.id}
                  style={{
                    background:
                      "#f8fafc",
                    padding: "10px",
                    marginBottom:
                      "10px",
                    borderRadius:
                      "10px"
                  }}
                >
                  <strong>
                    {customer.firstName}{" "}
                    {customer.lastName}
                  </strong>

                  <p
                    style={{
                      margin: "5px 0"
                    }}
                  >
                    {customer.city}
                  </p>
                </div>
              ))}

            <p
            style={{
                color: "#64748b",
                cursor: "pointer",
                marginTop: "10px"
            }}
            >
            + Add Card
            </p> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default JourneyPipeline;