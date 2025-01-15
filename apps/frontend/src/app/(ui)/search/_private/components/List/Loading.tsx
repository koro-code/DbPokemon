import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-lg" />
      ))}
    </div>
  );
};

export default Loading;
