import customers from "../data/customers";
import { getMatches } from "../services/matchingService";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Matches() {
  const customer = customers.find(
    (c) => c.id === 1
  );

  const matches = getMatches(
    customer,
    customers
  );

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
        }}
      >
        <div className="matches-container">
          <h1>
            Recommended Matches for{" "}
            {customer.firstName}
          </h1>

          {matches
            .slice(0, 5)
            .map((match) => (
              <div
                className="card match-card"
                key={match.id}
              >
                <h2>
                  {match.firstName}{" "}
                  {match.lastName}
                </h2>

                <Link
                  to={`/customer/${match.id}`}
                >
                  <button>
                    View Full Profile
                  </button>
                </Link>

                <p>
                  <strong>
                    Profession:
                  </strong>{" "}
                  {match.profession}
                </p>

                <p>
                  <strong>
                    City:
                  </strong>{" "}
                  {match.city}
                </p>

                <p>
                  <strong>
                    Compatibility Score:
                  </strong>{" "}
                  {match.score}%
                </p>

                <h3>
                  Match Reasons
                </h3>

                <ul>
                  {match.reasons.map(
                    (
                      reason,
                      index
                    ) => (
                      <li
                        key={index}
                      >
                        {reason}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Matches;