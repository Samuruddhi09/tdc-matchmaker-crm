import { useParams } from "react-router-dom";
import customers from "../data/customers";

function CustomerDetail() {
  const { id } = useParams();

  const customer = customers.find(
    (c) => c.id === Number(id)
  );

  if (!customer) {
    return <h2>Customer Not Found</h2>;
  }

  return (
    <div>
      <h1>Customer Profile</h1>

      <div className="card">

        <h2>
          {customer.firstName} {customer.lastName}
        </h2>

        <p><strong>Gender:</strong> {customer.gender}</p>

        <p><strong>Date of Birth:</strong> {customer.dob}</p>

        <p><strong>Country:</strong> {customer.country}</p>

        <p><strong>City:</strong> {customer.city}</p>

        <p><strong>Height:</strong> {customer.height}</p>

        <p><strong>Email:</strong> {customer.email}</p>

        <p><strong>Phone:</strong> {customer.phone}</p>

        <p><strong>College:</strong> {customer.college}</p>

        <p><strong>Degree:</strong> {customer.degree}</p>

        <p><strong>Income:</strong> {customer.income}</p>

        <p><strong>Company:</strong> {customer.company}</p>

        <p><strong>Designation:</strong> {customer.designation}</p>

        <p>
          <strong>Marital Status:</strong>{" "}
          {customer.maritalStatus}
        </p>

        <p>
          <strong>Languages:</strong>{" "}
          {customer.languages.join(", ")}
        </p>

        <p><strong>Siblings:</strong> {customer.siblings}</p>

        <p><strong>Religion:</strong> {customer.religion}</p>

        <p><strong>Caste:</strong> {customer.caste}</p>

        <p><strong>Want Kids:</strong> {customer.wantKids}</p>

        <p>
          <strong>Open To Relocate:</strong>{" "}
          {customer.relocate}
        </p>

        <p>
          <strong>Open To Pets:</strong>{" "}
          {customer.pets}
        </p>

      </div>
    </div>
  );
}

export default CustomerDetail;