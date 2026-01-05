import { Mosaic } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="flex text-6xl">
      <Mosaic color="#ac48ff" size="large" text="Loading" textColor="#ac48ff" />
    </div>
  );
};

export default Loading;
