
const CircularProgress = ({ progress,size }:{progress:number,size:number}) => {
  const stroke = 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* پس‌زمینه */}
      <circle
        className="text-[#D4F8D3]"
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* progress */}
      <circle
        className="text-[#24DB24] transition-all duration-500 ease-out"
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  );
};

export default CircularProgress;
