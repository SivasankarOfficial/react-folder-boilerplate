import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ButtonLoader = () => {
  return (
    <div className="w-[50px] h-[50px]">
      {" "}
      {/* Adjust width and height as needed */}
      <DotLottieReact src="https://lottie.host/5ea24c57-5511-42d0-90bd-6c551e067754/TZQIYUpxOb.lottie" loop autoplay />
    </div>
  );
};

export default ButtonLoader;
