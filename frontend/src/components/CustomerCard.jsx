import { Link } from "react-router-dom";

function CustomerCard({ customer }) {
  return (
    <div className="card">
      <h3>
        {customer.firstName} {customer.lastName}
      </h3>

      <p>{customer.city}</p>
      <p>{customer.designation}</p>
      <p>{customer.company}</p>

      <Link to={`/customer/${customer.id}`}>
        <button>View Profile</button>
      </Link>
    </div>
  );
}

export default CustomerCard;