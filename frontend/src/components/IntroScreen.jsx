import { useEffect, useState } from "react";

const IntroScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    visible && (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 transition-all duration-700 overflow-hidden">
        <div className="relative flex flex-col items-center text-center">
          <h1
            className="font-extrabold text-gray-800 tracking-wide animate-scaleFade
                       text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          >
            LABOR
          </h1>

          <p
            className="text-gray-500 font-medium absolute top-full translate-x-4 sm:translate-x-6 ml-22 mt-1 animate-scaleFade delay-[0.2s]
                       text-xl sm:text-2xl md:text-3xl"
          >
            app
          </p>
        </div>

        {/* Animation keyframes */}
        <style>
          {`
            @keyframes scaleFade {
              0% {
                opacity: 0;
                transform: scale(0.7) translateY(20px);
              }
              20% {
                opacity: 1;
                transform: scale(1.05) translateY(0);
              }
              50% {
                opacity: 1;
                transform: scale(1);
              }
              80% {
                opacity: 1;
                transform: scale(1.05);
              }
              100% {
                opacity: 0;
                transform: scale(0.7) translateY(-20px);
              }
            }

            .animate-scaleFade {
              animation: scaleFade 4s ease-in-out forwards;
            }

            .delay-[0.2s] {
              animation-delay: 0.2s;
            }
          `}
        </style>
      </div>
    )
  );
};

export default IntroScreen;