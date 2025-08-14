import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="w-[500px] h-[500px] flex items-center justify-center  mx-auto">
      {" "}
      {/* Adjust width and height as needed */}
      <DotLottieReact
        src="https://lottie.host/648fcfa6-499a-4492-bb7b-0a8b6f9846ee/obS3jc5ppM.lottie"
        loop
        autoplay
      />{" "}
    </div>
  );
};

export default Loader;
