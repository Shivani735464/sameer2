import React, { useState } from "react";
import axios from "axios";

const VoiceSearch = ({ onResults }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);
    setTranscript("");
    setError("");

    console.log("🎙️ Listening...");

    recognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript;
      console.log("🗣️ Voice recognized:", voiceText);
      setTranscript(voiceText);
      setListening(false);

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/problems/voice-search`, {
          query: voiceText,
        });

        console.log("✅ Search Results:", res.data.results);
        onResults(res.data.results);
      } catch (err) {
        console.error("❌ Voice Search Error:", err);
        setError("No matching problems found or server error");
      }
    };

    recognition.onerror = (err) => {
  console.error("🎤 Recognition Error:", err);
  setListening(false);

  if(err.error === "no-speech"){
    setError("⚠️ No speech detected, please speak clearly!");
  } else if(err.error === "audio-capture"){
    setError("⚠️ Cannot access microphone, please check your device");
  } else {
    setError("🎤 Error during recognition: " + err.error);
  }
};
  };

  return (
    <div className="text-center my-6">
      <button
        onClick={handleVoiceSearch}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        {listening ? "🎧 Listening..." : "🎤 Speak to Search"}
      </button>

      {transcript && <p className="mt-3 text-gray-700">You said: {transcript}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default VoiceSearch;