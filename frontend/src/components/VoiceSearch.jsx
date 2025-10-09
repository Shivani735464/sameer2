import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && transcript.length > 2) {
      // Automatically fetch when voice captured
      fetchProblems(transcript);
    }
  }, [transcript]);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: false,
      language: "hi-IN", // or "hi-IN"
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const fetchProblems = async (query) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/problems/search?q=${encodeURIComponent(query)}`
      );
      setResults(data);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support voice recognition.</p>;
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-3">🎤 Voice Search</h2>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={listening ? stopListening : startListening}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
            listening ? "bg-red-500 animate-pulse" : "bg-blue-600"
          }`}
        >
          {listening ? "Listening..." : "Speak Now"}
        </button>
      </div>

      {transcript && (
        <p className="mt-4 text-gray-700">
          You said: <strong>{transcript}</strong>
        </p>
      )}

      {loading && <p className="mt-4 text-gray-500">Fetching results...</p>}

      <div className="mt-6">
        {results.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((item) => (
              <div
                key={item._id}
                className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Category:</strong> {item.category}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Price:</strong> ₹{item.basePrice}
                </p>
              </div>
            ))}
          </div>
        ) : (
          transcript && !loading && (
            <p className="text-gray-500 mt-4">No results found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default VoiceSearch;