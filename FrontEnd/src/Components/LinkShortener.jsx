import { useState } from "react";
import axios from "axios";

export default function LinkShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    // console.log("Long URL:", longUrl); // Debugging line
    try {
      const response = await axios.post("http://localhost:5000/shorten", { longUrl });
      setShortUrl(`http://localhost:5000/${response.data.shortUrl}`);
      setLongUrl("");
    } catch (error) {
      console.error("Error shortening URL", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 className="title">URL Shortener</h2>
      <h3 className="white-text">Enter a long URL to shorten:</h3>
      <input
        type="text"
        placeholder="Enter URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleShorten} style={{ padding: "8px 15px" }}>
        Shorten URL
      </button>
      {/* {console.log("Short URL:", shortUrl) } */}
      {shortUrl && (
        <div style={{ marginTop: "20px" }} className="shortUrl">
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
