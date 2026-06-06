import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Matches() {
  const { id } = useParams();

  const [matches, setMatches] =
    useState([]);

  const [customer, setCustomer] =
    useState(null);

  useEffect(() => {
    fetchCustomer();
    fetchMatches();
  }, [id]);

  const fetchCustomer =
    async () => {
      try {
        const response =
          await API.get(
            `/customers/${id}`
          );

        setCustomer(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchMatches =
    async () => {
      try {
        const response =
          await API.get(
            `/matches/${id}`
          );

        setMatches(
          response.data
        );
      } catch (error) {
        console.error(
          "Error fetching matches:",
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
        <div className="matches-container">

          <h1>
            Recommended Matches for{" "}
            {customer.firstName}{" "}
            {customer.lastName}
          </h1>

          {matches.map(
            (match) => (
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

                <p>
                  <strong>
                    Match Level:
                  </strong>{" "}
                  {match.matchLevel}
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

                <h3>
                  AI Insight
                </h3>

                <p>
                  {match.aiInsight}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Matches;