import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function JourneyPipeline() {
  const [customers, setCustomers] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const navigate = useNavigate();

  const [newCustomer, setNewCustomer] =
    useState({
      firstName: "",
      city: "",
      profession: "",
      journeyStatus: "New Lead"
    });

  useEffect(() => {
    fetchCustomers();
  }, []);

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

            <button
              onClick={() =>
                navigate("/add-customer")
              }
              style={{
                marginTop: "10px",
                width: "100%"
              }}
            >
              + Add Customer
            </button> 
          </div>
        ))}

        {showForm && (

  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent:
        "center",
      alignItems:
        "center"
    }}
  >

    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "400px"
      }}
    >

      <h2>
        Add Customer
      </h2>

      <input
        placeholder="First Name"
        value={
          newCustomer.firstName
        }
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            firstName:
              e.target.value
          })
        }
        style={{
          width: "100%",
          marginBottom: "10px"
        }}
      />

      <input
        placeholder="City"
        value={newCustomer.city}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            city:
              e.target.value
          })
        }
        style={{
          width: "100%",
          marginBottom: "10px"
        }}
      />

      <input
        placeholder="Profession"
        value={
          newCustomer.profession
        }
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            profession:
              e.target.value
          })
        }
        style={{
          width: "100%",
          marginBottom: "10px"
        }}
      />

      <select
        value={
          newCustomer.journeyStatus
        }
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            journeyStatus:
              e.target.value
          })
        }
        style={{
          width: "100%",
          marginBottom: "15px"
        }}
      >
        {statuses.map(
          (status) => (
            <option
              key={status}
            >
              {status}
            </option>
          )
        )}
      </select>

      <button
        onClick={() => {

          const customCustomers =
            JSON.parse(
              localStorage.getItem(
                "customCustomers"
              )
            ) || [];

          const customer = {

            id:
              Date.now(),

            firstName:
              newCustomer.firstName,

            lastName: "",

            city:
              newCustomer.city,

            profession:
              newCustomer.profession,

            journeyStatus:
              newCustomer.journeyStatus

          };

          customCustomers.push(
            customer
          );

          localStorage.setItem(
            "customCustomers",
            JSON.stringify(
              customCustomers
            )
          );

          setCustomers([
            ...customers,
            customer
          ]);

          setShowForm(
            false
          );

        }}
      >
        Save Customer
      </button>

      <button
        onClick={() =>
          setShowForm(false)
        }
        style={{
          marginLeft: "10px"
        }}
      >
        Cancel
      </button>

    </div>

  </div>

)}
      </div>
    </div>
  );
}

export default JourneyPipeline;