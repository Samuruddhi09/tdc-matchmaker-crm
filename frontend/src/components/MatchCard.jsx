function MatchCard({ match }) {
  return (
    <div className="card match-card">

      <h2>
        {match.firstName} {match.lastName}
      </h2>

      <p>
        <strong>Profession:</strong>
        {" "}
        {match.profession}
      </p>

      <p>
        <strong>City:</strong>
        {" "}
        {match.city}
      </p>

      <p>
        <strong>Compatibility Score:</strong>
        {" "}
        {match.score}%
      </p>

      <h3>Match Reasons</h3>

      <ul>
        {match.reasons.map(
          (reason, index) => (
            <li key={index}>
              {reason}
            </li>
          )
        )}
      </ul>

      <h3>AI Insight</h3>

      <p>{match.aiInsight}</p>

    </div>
  );
}

export default MatchCard;