const AnimatedBubbles = () => {
  const bubbles = [
    { size: 60, left: "10%", top: "15%", delay: 0, color: "var(--consumer-coral)" },
    { size: 40, left: "70%", top: "25%", delay: 1, color: "var(--consumer-cyan)" },
    { size: 80, left: "80%", top: "60%", delay: 2, color: "var(--consumer-magenta)" },
    { size: 30, left: "25%", top: "70%", delay: 0.5, color: "var(--consumer-amber)" },
    { size: 50, left: "50%", top: "40%", delay: 1.5, color: "var(--consumer-purple)" },
    { size: 35, left: "15%", top: "85%", delay: 3, color: "var(--consumer-coral)" },
    { size: 45, left: "60%", top: "80%", delay: 2.5, color: "var(--consumer-cyan)" },
    { size: 25, left: "90%", top: "10%", delay: 1, color: "var(--consumer-amber)" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className={i % 2 === 0 ? "bubble" : "bubble-slow"}
          style={{
            position: "absolute",
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            borderRadius: "50%",
            background: `hsl(${b.color})`,
            opacity: 0.15,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
      {/* Decorative shapes */}
      <div className="absolute top-[5%] right-[15%] w-4 h-4 rotate-45 bg-consumer-amber/20 bubble" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[45%] left-[5%] w-3 h-3 rounded-full bg-consumer-magenta/25 bubble-slow" style={{ animationDelay: "1.2s" }} />
      <div className="absolute bottom-[20%] right-[25%] w-5 h-5 rotate-12 rounded-sm bg-consumer-cyan/20 bubble" style={{ animationDelay: "2.1s" }} />
    </div>
  );
};

export default AnimatedBubbles;
