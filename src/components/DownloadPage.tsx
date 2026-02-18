import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

import "./Download.css";

const DownloadPage: React.FC = () => {
  const enterpriseId = useSelector(
    (state: RootState) => state.enterprise.enterpriseId
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const [feedback, setFeedback] = useState({
    useful: "",
    clear: "",
    recommend: "",
    comments: "",
  });

  const questions = [
    {
      id: "useful",
      text: "Was the document useful?",
    },
    {
      id: "clear",
      text: "Was the information clear?",
    },
    {
      id: "recommend",
      text: "Were you already aware of the information provided?",
    },
  ];


  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw055V8x_QTw5UaTCYuPcwhcSl5bWKYoKo5n9MmTHeNzCWb_1ZPgDCBD7dFSPUAyxI/exec";

  const handleSubmit = async () => {

    const payload = {
      enterpriseId,
      ...feedback,
    };

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });


      const data = await res.json();

      alert("Saved successfully!");

    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    }
  };



  const handleSelect = (field: string, value: string) => {
    setFeedback({ ...feedback, [field]: value });
  };

  const handleDownload = () => {
    const fileUrl = "/doc/Microsoft365Copilot-V1.docx";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Microsoft365Copilot-V1.docx";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };




  return (

    <div className="download-container">
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        <span className="back-icon">←</span>
        Back
      </button>

      <div className="download-content">

        <div className="download-card">

          <h1 className="text-center">Unlock Higher Productivity</h1>
          <p>with This Downloadable Guide.</p>

          <button className="download-btn" onClick={handleDownload}>
            📄 Download Word Report
          </button>

          <h3>Please provide your feedback</h3>

          {questions.map((q) => (
            <div className="question" key={q.id}>
              <span>{q.text}</span>

              <div className="answer-buttons">
                <button
                  className={feedback[q.id as keyof typeof feedback] === "Yes" ? "active" : ""}
                  onClick={() => handleSelect(q.id, "Yes")}
                >
                  Yes
                </button>

                <button
                  className={feedback[q.id as keyof typeof feedback] === "No" ? "active" : ""}
                  onClick={() => handleSelect(q.id, "No")}
                >
                  No
                </button>
              </div>
            </div>
          ))}


          <textarea
            placeholder="Enter comments..."
            onChange={(e) =>
              setFeedback({ ...feedback, comments: e.target.value })
            }
          />

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>


        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
