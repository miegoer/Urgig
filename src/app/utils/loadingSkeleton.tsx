export default function LoadingSkeleton() {
  return (
    <>
      <style>
        {`
          @keyframes opacityChange {
            0% { opacity: 0.2; }
            100% { opacity: 0.5; }
          }
        `}
      </style>
      <div
        style={{
          top: "50%",
          left: "50%",
          position: "fixed",
          transform: "translate(-50%, -50%)",
          width: "15vw",
          height: "15vh",
          background: "#20202a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize:"40px",
            color: "rgba(57, 255, 20, 0.8)",
            textShadow: "0px 0px 10px rgba(57, 255, 20, 0.7)",
            animation: "opacityChange 2s infinite alternate",
          }}
        >
          LOADING
        </h1>
      </div>
    </>
  );
}
