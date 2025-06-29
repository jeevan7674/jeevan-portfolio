/*
  GradientText component
  - Supports animated gradient text with full color range
  - Install Tailwind animation via tailwind.config.js
*/

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#40ffaa", "#4079ff", "#ff4fa6"],
  animationSpeed = 12, // slower by default
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
    backgroundSize: "300% 100%",
    backgroundPosition: "0% 50%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    willChange: "background-position",
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
          }}
        >
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 animate-gradient"
        style={gradientStyle}
      >
        {children}
      </div>
    </div>
  );
}
