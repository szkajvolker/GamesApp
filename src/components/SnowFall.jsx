import Snowfall from "react-snowfall";

const SnowFall = () => {
  return (
    <>
      <Snowfall
        color="#ffffff"
        snowflakeCount={120}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          pointerEvents: "none",
        }}
        speed={[0.5, 2]}
        wind={[-0.5, 0.5]}
      />
    </>
  );
};

export default SnowFall;
