import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin w-16 h-16 mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="#EF4444"
            stroke="#000"
            strokeWidth="5"
          />
          <rect x="0" y="47.5" width="100" height="5" fill="#000" />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="#FFF"
            stroke="#000"
            strokeWidth="5"
          />
          <circle cx="50" cy="50" r="8" fill="#000" />
        </svg>
      </div>
      <div className="text-2xl font-semibold text-gray-700">Chargement...</div>
    </div>
  );
};

export default Loading;
