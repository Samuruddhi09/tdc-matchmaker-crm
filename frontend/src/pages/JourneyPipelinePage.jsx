import Navbar from "../components/Navbar";
import JourneyPipeline from "../components/JourneyPipeline";

function JourneyPipelinePage() {
  return (
    <>
      <Navbar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px"
        }}
      >
        <h1>Customer Journey Pipeline</h1>

        <JourneyPipeline />
      </div>
    </>
  );
}

export default JourneyPipelinePage;