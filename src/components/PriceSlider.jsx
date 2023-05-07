import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import InputRange from "react-input-range";
// import "react-input-range/lib/css/index.css";
import "../slider.css";
import { useUIContext } from "../contexts/UIProvider";

function PriceSlider() {
  const [value, setValue] = useState({ min: 0, max: 5000 });
  const handle = ({ value, dragging, index, ...restProps }) => <div className="square-handle" style={{ left: `${(value / 100) * 100}%` }} {...restProps} />;
  const { priceRange, setPriceRange } = useUIContext();

  return (
    <div className="">
      {/* <Slider
        range
        defaultValue={[20, 40]}
        pushable
        trackStyle={{ backgroundColor: "blue", height: "10px", borderRadius: "2px" }}
        handleStyle={{ backgroundColor: "white", borderRadius: "2px", height: "20px", width: "20px" }}
        railStyle={{ backgroundColor: "#ddd", height: "10px" }}
      /> */}

      <InputRange
        formatLabel={(value) => `${value} DT`}
        maxValue={5000}
        minValue={0}
        value={priceRange}
        onChange={(value) => {
          if (value.min >= 0 && value.max <= 5000) setPriceRange((prev) => ({ ...prev, ...value }));
        }}
      />
    </div>
  );
}

export default PriceSlider;
