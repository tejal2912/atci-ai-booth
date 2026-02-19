import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import loadingAnimation from "../assets/loading.json";
import Player from "lottie-react"; 
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


  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw055V8x_QTw5UaTCYuPcwhcSl5bWKYoKo5n9MmTHeNzCWb_1ZPgDCBD7dFSPUAyxI/exec";


  useEffect(() => {
    if (!enterpriseId) {
      navigate("/");
    }
  }, [enterpriseId, navigate]);

  const handleSubmit = async () => {
    setLoading(true);

    // Ensure everything is a string
    const payload = {
      enterpriseId: String(enterpriseId || ""),
      useful: String(feedback.useful || ""),
      clear: String(feedback.clear || ""),
      recommend: String(feedback.recommend || ""),
      comments: String(feedback.comments || ""),
    };

    try {
      const body = new URLSearchParams(payload).toString();

      console.log("Sending:", payload); // Debug

      const res = await fetch(SCRIPT_URL + '?' + body, {
        method: "GET",
      });

      const data = await res.json();

      console.log("Response:", data);

      alert("Saved successfully!");
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
      alert("Failed to submit");
    }
  };





  const handleSelect = (field: string, value: string) => {
    setFeedback({ ...feedback, [field]: value });
  };

  const handleDownload = () => {
    const fileUrl = "/doc/Microsoft365Copilot-V1.pdf";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Microsoft365Copilot-V1.pdf";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };




  return (
    <div className="download-container">
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <Player
            autoplay
            loop
            animationData={loadingAnimation}
            style={{ height: 150, width: 150 }}
          />
        </div>
      )}

      {/* Back Button */}
      <button className="back-btn-glass" onClick={() => navigate("/")}>
        <span className="back-arrow">
          <img src="/imgs/back.png" alt="Back" />
        </span>
      </button>

      <div className="download-content">
        <div className="download-wrapper">
          {/* DOWNLOAD SECTION */}
          <div className="section-card">
            <h2 className="text-center">
              Transform the Way You Work with Microsoft Copilot
            </h2>
            <p className="text-center">
              A practical guide to leveraging AI for better productivity and collaboration.
            </p>
            <button className="download-btn" onClick={handleDownload}>
              <img src="/imgs/pdf.png" alt="Download" />
              Download Copilot Guide
            </button>
          </div>

          {/* FEEDBACK SECTION */}
          <div className="section-card feedback-section">
            <h3>Please provide your feedback</h3>
            {questions.map((q) => (
              <div className="question" key={q.id}>
                <span>{q.text}</span>
                <div className="answer-buttons">
                  <button
                    className={
                      feedback[q.id as keyof typeof feedback] === "Yes" ? "active" : ""
                    }
                    onClick={() => handleSelect(q.id, "Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={
                      feedback[q.id as keyof typeof feedback] === "No" ? "active" : ""
                    }
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

            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default DownloadPage;
