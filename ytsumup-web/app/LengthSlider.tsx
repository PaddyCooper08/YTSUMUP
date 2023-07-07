"use client";
import { state } from "./state";
import Slider from "@mui/material/Slider";
import { snapshot, useSnapshot } from "valtio";

export default function LengthSlider() {
  const handleChange = (event: Event, newValue: number | number[]) => {
    let sliderValue = newValue as number;

    // @ts-ignore
    state.sliderValue = sliderValue;
  };
  const snap = useSnapshot(state);
  const sliderValue: number = snap.sliderValue;
  return (
    <div className="pl-8 pr-20 text-roboto">
      <h1 className="text-4xl text-[#b9b9b9] text-center p-2  ">
        Summary Length
      </h1>
      <h1 className="text-sm text-[#b9b9b9] text-center p-1  ">
        as a percentage of transcript length
      </h1>
      <h1 className="text-2xl text-[#b9b9b9] text-center p-2 ">
        {sliderValue}%
      </h1>
      <Slider
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="off"
        step={10}
        sx={{
          color: "#3d3d3d",
        }}
        onChange={handleChange}
      />
    </div>
  );
}
