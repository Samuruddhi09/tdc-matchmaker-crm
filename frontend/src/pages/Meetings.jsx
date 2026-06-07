import Navbar from "../components/Navbar";
import { useState } from "react";

function Meetings() {

 const [meetings, setMeetings] =
    useState(
        JSON.parse(
        localStorage.getItem(
            "meetings"
        )
        ) || []
    );

  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px"
        }}
      >
        <h1>Scheduled Meetings</h1>

        {meetings.length === 0 ? (

          <p>No meetings scheduled.</p>

        ) : (

          meetings.map(
            (meeting, index) => (

              <div
                key={index}
                className="card"
                style={{
                  marginBottom: "20px"
                }}
              >
                <h3>
                  {meeting.customerName}
                </h3>

                <p>
                  Match: {meeting.matchName}
                </p>

                <p>
                  Date: {meeting.date}
                </p>

                <p>
                  Time: {meeting.time}
                </p>

                <p>
                  Mode: {meeting.mode}
                </p>

                <p>
                  Notes: {meeting.notes}
                </p>

                <p>
                    Status:
                    {" "}
                    <strong>
                        {meeting.status ||
                        "Scheduled"}
                    </strong>
                </p>

            <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  }}
>

  <button
    onClick={() => {

      const updated =
        meetings.map(
          (m, i) =>
            i === index
              ? {
                  ...m,
                  status:
                    "Completed"
                }
              : m
        );

      setMeetings(
        updated
      );

      localStorage.setItem(
        "meetings",
        JSON.stringify(
          updated
        )
      );

    }}
  >
    Complete
  </button>

  <button
    onClick={() => {

      const newDate =
        prompt(
          "New Date"
        );

      const newTime =
        prompt(
          "New Time"
        );

      const updated =
        meetings.map(
          (m, i) =>
            i === index
              ? {
                  ...m,
                  date:
                    newDate ||
                    m.date,
                  time:
                    newTime ||
                    m.time,
                  status:
                    "Rescheduled"
                }
              : m
        );

      setMeetings(
        updated
      );

      localStorage.setItem(
        "meetings",
        JSON.stringify(
          updated
        )
      );

    }}
  >
    Reschedule
  </button>

  <button
    style={{
      background:
        "#ef4444",
      color: "white"
    }}
    onClick={() => {

      const updated =
        meetings.filter(
          (_, i) =>
            i !== index
        );

      setMeetings(
        updated
      );

      localStorage.setItem(
        "meetings",
        JSON.stringify(
          updated
        )
      );

    }}
  >
    Delete
  </button>

</div>


              </div>
            )
          )

        )}

      </div>
    </>
  );
}

export default Meetings;