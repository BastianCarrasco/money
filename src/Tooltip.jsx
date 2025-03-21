export function Tooltip({ message, position }) {
    if (!message) return null;
  
    return (
      <div
        className="absolute"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translateX(-50%)",
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 10
        }}
      >
        {message}
      </div>
    );
  }
  