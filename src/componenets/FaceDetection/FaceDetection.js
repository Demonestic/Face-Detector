import React from "react";

const FaceDetection = ({ imageurl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageurl} alt="" width="500px" height="auto" />
      </div>
    </div>
  );
};

export default FaceDetection;
