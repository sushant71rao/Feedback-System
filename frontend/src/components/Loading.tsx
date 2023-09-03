

const Loading = () => {
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
      {/* <h1 style={{ fontWeight: "bold", color: "grey" }}>LOADING</h1> */}
      <span className="loader"></span>
      {/* <span>
        <CircularProgress />
      </span> */}
    </div>
  );
};

export default Loading;
