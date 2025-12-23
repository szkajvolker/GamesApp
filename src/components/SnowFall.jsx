import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";

const SnowFall = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Snowfall
        color="#ffffff"
        snowflakeCount={300}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: size.width,
          height: size.height,
          pointerEvents: "none",
          zIndex: 10,
        }}
        speed={[1, 2.5]}
        wind={[1, 2.5]}
        radius={[0.5, 3.5]}
        key={size.width + "x" + size.height}
      />
    </>
  );
};

export default SnowFall;
