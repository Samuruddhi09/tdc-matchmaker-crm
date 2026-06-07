import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddCustomer() {
    const navigate = useNavigate();

    const [customer, setCustomer] =
        useState({
            firstName: "",
            lastName: "",
            gender: "Male",
            age: "",
            city: "",
            religion: "",
            profession: "",
            company: "",
            income: "",
            journeyStatus: "New Lead"
            
        });

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px"
        }}
      >
        <h1>Add New Customer</h1>

        <div
            className="info-card"
            style={{
                maxWidth: "700px"
            }}
            >

            <input
                placeholder="First Name"
                value={customer.firstName}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    firstName: e.target.value
                })
                }
            />

            <br /><br />

            <input
                placeholder="Last Name"
                value={customer.lastName}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    lastName: e.target.value
                })
                }
            />

            <br /><br />

            <input
                placeholder="Age"
                value={customer.age}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    age: e.target.value
                })
                }
            />

            <br /><br />

            <input
                placeholder="City"
                value={customer.city}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    city: e.target.value
                })
                }
            />

            <br /><br />

            <input
                placeholder="Religion"
                value={customer.religion}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    religion: e.target.value
                })
                }
            />

            <br /><br />

            <input
                placeholder="Profession"
                value={customer.profession}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    profession: e.target.value
                })
                }
            />

            <br /><br />

            <input
                placeholder="Company"
                value={customer.company}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    company: e.target.value
                })
                }
            />

            <br /><br />

            <input
                placeholder="Income"
                value={customer.income}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    income: e.target.value
                })
                }
            />

            <br /><br />

            <select
                value={customer.journeyStatus}
                onChange={(e) =>
                setCustomer({
                    ...customer,
                    journeyStatus: e.target.value
                })
                }
            >
                <option>New Lead</option>
                <option>Verified</option>
                <option>Actively Matching</option>
                <option>Match Sent</option>
                <option>Meeting Scheduled</option>
                <option>Relationship Progressing</option>
                <option>Success Story</option>
            </select>

            <br /><br />

            <button
                onClick={() => {

                const customers =
                    JSON.parse(
                    localStorage.getItem(
                        "customCustomers"
                    )
                    ) || [];

                const newCustomer = {
                    ...customer,
                    id: Date.now()
                };

                customers.push(
                    newCustomer
                );

                localStorage.setItem(
                    "customCustomers",
                    JSON.stringify(customers)
                );

                navigate(
                `/customer/${newCustomer.id}`
                );

                }}
            >
                Save Customer
            </button>

            </div>
      </div>
    </>
  );
}

export default AddCustomer;