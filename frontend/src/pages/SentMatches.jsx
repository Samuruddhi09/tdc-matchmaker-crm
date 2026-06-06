import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function SentMatches() {
  const [sentMatches, setSentMatches] =
    useState([]);

  useEffect(() => {
    const matches =
      JSON.parse(
        localStorage.getItem(
          "sentMatches"
        )
      ) || [];

    setSentMatches(matches);
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px"
        }}
      >
        <h1
          style={{
            marginBottom: "30px"
          }}
        >
          Sent Matches
        </h1>

        {sentMatches.length === 0 ? (
          <p>No matches sent yet.</p>
        ) : (
          sentMatches.map(
            (match, index) => (
              <div
                key={index}
                className="card"
                style={{
                  width: "550px",
                  padding: "25px",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  background: "#ffffff",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)"
                }}
              >
                <h2>
                  {match.customerName}
                </h2>

                <p>
                  Matched With:
                  {" "}
                  <strong>
                    {match.matchName}
                  </strong>
                </p>

                <div
                  style={{
                    background:
                      "#eef2ff",
                    padding: "15px",
                    borderRadius:
                      "12px",
                    margin:
                      "15px 0"
                  }}
                >
                  <h2
                    style={{
                      margin: 0
                    }}
                  >
                    {match.score}%
                  </h2>

                  <p
                    style={{
                      margin: 0
                    }}
                  >
                    Compatibility Score
                  </p>
                </div>

                <p>
                  Match Level:
                  {" "}
                  <strong
                    style={{
                      color:
                        match.score >= 90
                          ? "#16a34a"
                          : match.score >= 80
                          ? "#2563eb"
                          : "#ea580c"
                    }}
                  >
                    {
                      match.matchLevel
                    }
                  </strong>
                </p>

                <p>
                  Status:
                  {" "}
                  <select
                    defaultValue={
                      match.status
                    }
                    style={{
                      padding:
                        "8px",
                      borderRadius:
                        "8px"
                    }}
                  >
                    <option>
                      Match Sent
                    </option>

                    <option>
                      Meeting Scheduled
                    </option>

                    <option>
                      Relationship Progressing
                    </option>

                    <option>
                      Success Story
                    </option>
                  </select>
                </p>

                <p>
                  Sent Date:
                  {" "}
                  {match.sentDate}
                </p>

                <div
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                    marginTop:
                      "20px"
                  }}
                >
                  <Link
                    to={`/customer/${match.customerId}`}
                  >
                    <button>
                      View Customer
                    </button>
                  </Link>

                  <Link
                    to={`/customer/${match.matchId}`}
                  >
                    <button>
                      View Match
                    </button>
                  </Link>
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
}

export default SentMatches;