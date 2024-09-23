import React from "react";
import LoadingGif from "../images/loading.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={LoadingGif} alt="Loading..." />
    </div>
  );
};

export default Loader;
