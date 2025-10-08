import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HeroSection from "./components/HeroSection";
import Problem from "./pages/Problem";
import Total from "./pages/Total";
import Subscription from "./pages/Subscription";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import { useAuth } from "./context/AuthContext";
import Intro2Screen from "./components/Intro2Screen";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) return <IntroScreen onFinish={() => setShowIntro(false)} />;

  return (
    <Router>
      {!user ? (
        <>
         <TopBar />
        <Routes>
          <Route path="/" element={<Intro2Screen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </>
      ) : (
        <>
          <TopBar />
          <div className="">
            <Routes>
              <Route path="/hero" element={<HeroSection />} />
              <Route path="/problem" element={<Problem />} />
              <Route path="/total" element={<Total />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/hero" />} />
            </Routes>
          </div>
          <Navbar />
        </>
      )}
    </Router>
  );
};

export default App;