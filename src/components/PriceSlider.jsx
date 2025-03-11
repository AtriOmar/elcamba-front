import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import InputRange from "react-input-range";
// import "react-input-range/lib/css/index.css";
import "../slider.css";
import { useUIContext } from "../contexts/UIProvider";

function PriceSlider() {
  const { priceRange, setPriceRange } = useUIContext();

  return (
    <div className="">
      {priceRange.maxValue || priceRange.minValue ? (
        <InputRange
          formatLabel={(value) => `${value} DT`}
          maxValue={priceRange.maxValue}
          minValue={priceRange.minValue}
          value={priceRange}
          onChange={(value) => {
            if (value.min >= priceRange.minValue && value.max <= priceRange.maxValue) setPriceRange((prev) => ({ ...prev, ...value }));
          }}
        />
      ) : (
        <InputRange maxValue={10000} minValue={0} value={{ min: 0, max: 10000 }} onChange={() => {}} />
      )}
    </div>
  );
}

export default PriceSlider;
