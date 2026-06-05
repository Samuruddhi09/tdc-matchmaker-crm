import customers from "../data/customers";
import CustomerCard from "../components/CustomerCard";

function Dashboard() {
  return (
    <div>
      <h1>TDC Matchmaker Dashboard</h1>

      {/* Statistics Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <h2>128</h2>
          <p>Total Clients</p>
        </div>

        <div className="card">
          <h2>54</h2>
          <p>Matches Sent</p>
        </div>

        <div className="card">
          <h2>96</h2>
          <p>Active Profiles</p>
        </div>

        <div className="card">
          <h2>12</h2>
          <p>Pending Reviews</p>
        </div>
      </div>

      <h2 style={{ textAlign: "center" }}>
         Customer Profiles
      </h2>

      {/* Customer Profiles */}
      <div className="dashboard-cards">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;