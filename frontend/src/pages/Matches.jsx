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

  const [aiAnalysis, setAiAnalysis] =
    useState({});

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

  const generateAIAnalysis =
    async (match) => {

      try {

        const response =
          await API.post(
            "/matches/ai-analysis",
            {
              customer,
              match,
              score: match.score,
              reasons: match.reasons
            }
          );

        setAiAnalysis(
          (prev) => ({
            ...prev,
            [match.id]:
              response.data.analysis
          })
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to generate AI analysis"
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "15px"
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "#e2e8f0"
                    }}
                  ></div>

                  <div>
                    <h2 style={{ margin: 0 }}>
                      {match.firstName} {match.lastName}
                    </h2>

                    <p style={{ margin: 0 }}>
                      {match.profession}
                    </p>

                    <p style={{ margin: 0 }}>
                      {match.city}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px"
                  }}
                >
                  <Link
                    to={`/customer/${match.id}`}
                  >
                    <button>
                      View Profile
                    </button>
                  </Link>

                  <button
                    onClick={() => {

                      const sentMatches =
                        JSON.parse(
                          localStorage.getItem(
                            "sentMatches"
                          )
                        ) || [];

                      const alreadySent =
                        sentMatches.find(
                          (item) =>
                            item.customerId === customer.id &&
                            item.matchId === match.id
                        );

                      if (!alreadySent) {

                        sentMatches.push({

                          customerId: customer.id,

                          customerName:
                            `${customer.firstName} ${customer.lastName}`,

                          matchId: match.id,

                          matchName:
                            `${match.firstName} ${match.lastName}`,

                          score: match.score,

                          matchLevel:
                            match.matchLevel,

                          status: "Match Sent",

                          sentDate:
                            new Date().toLocaleDateString()

                        });

                        localStorage.setItem(
                          "sentMatches",
                          JSON.stringify(sentMatches)
                        );

                        alert(
                          `Match sent to ${match.firstName}`
                        );

                      } else {

                        alert(
                          "Match already sent"
                        );

                      }

                      localStorage.setItem(
                        "sentMatches",
                        JSON.stringify(sentMatches)
                      );

                      alert(
                        `Match sent to ${match.firstName}`
                      );

                    }}
                  >
                    Send Match
                  </button>
                  

                  <button
                    onClick={() =>
                      generateAIAnalysis(
                        match
                      )
                    }
                  >
                    Generate AI Analysis
                  </button>
                </div>


                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    margin: "15px 0"
                  }}
                >

                  <div
                    style={{
                      background: "#eef2ff",
                      padding: "12px",
                      borderRadius: "12px",
                      minWidth: "120px",
                      textAlign: "center"
                    }}
                  >
                    <h2>{match.score}%</h2>
                    <p>Compatibility</p>
                  </div>

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "12px",
                      borderRadius: "12px",
                      minWidth: "180px",
                      textAlign: "center"
                    }}
                  >
                    <h3
                      style={{
                        color:
                          match.score >= 90
                            ? "#16a34a"
                            : match.score >= 80
                            ? "#2563eb"
                            : "#ea580c"
                      }}
                    >
                      {match.matchLevel}
                    </h3>
                  </div>

                </div>

              <h3>Why This Match</h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "20px"
                  }}
                >
                  {match.reasons.map(
                    (reason, index) => (
                      <span
                        key={index}
                        style={{
                          background: "#dcfce7",
                          color: "#166534",
                          padding: "8px 12px",
                          borderRadius: "20px",
                          fontSize: "14px"
                        }}
                      >
                        ✓ {reason}
                      </span>
                    )
                  )}
                </div>

                <h3>AI Insight</h3>

                <p>
                  {aiAnalysis[match.id]
                    ? aiAnalysis[match.id]
                    : match.aiInsight}
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