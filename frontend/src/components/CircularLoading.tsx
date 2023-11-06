const CircularLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        justifyContent: "center",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <span className="loaderWhite"></span>
    </div>
  );
};

export default CircularLoading;
