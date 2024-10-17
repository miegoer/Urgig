export default function LoadingSkeleton() {
  return (
    <>
        <h1
          style={{
            top: "50%",
            left: "50%",
            position: "fixed",
            transform: "translate(-50%, -50%)",
            fontSize:"40px",
            color: "rgba(57, 255, 20, 0.8)",
            textShadow: "0px 0px 10px rgba(57, 255, 20, 0.7)",
            animation: "opacityChange 2s infinite alternate",
          }}
        >
          LOADING
        </h1>
      
    </>
  );
}
