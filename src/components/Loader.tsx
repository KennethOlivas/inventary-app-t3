import React from "react";

const Loader = () => {
  return (
    <div className="w-ful center flex h-full items-center justify-center">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="324px"
        height="330px"
        viewBox="0 0 24 30"
        xmlSpace="preserve"
      >
        <rect x="0" y="0" width="4" height="10" fill="#4f46e5">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="translate"
            values="0 0; 0 20; 0 0"
            begin="0"
            dur="1.0s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="10" y="0" width="4" height="10" fill="#4f46e5">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.2s"
            dur="1.0s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="20" y="0" width="4" height="10" fill="#4f46e5">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.4s"
            dur="1.0s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <p className="pt-8 text-center text-4xl font-bold text-white">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
