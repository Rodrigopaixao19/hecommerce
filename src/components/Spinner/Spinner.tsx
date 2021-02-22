import React from "react";
import Loader from "react-loader-spinner";

interface ISpinnerProps {
  color?: string;
  height?: number;
  width?: number;
}

const Spinner: React.FC<ISpinnerProps> = ({
  color = "white",
  height = 20,
  width = 20,
}) => {
  return (
    <Loader
      type="Oval"
      color={color}
      height={height}
      width={width}
      timeout={2000}
    />
  );
};

export default Spinner;
