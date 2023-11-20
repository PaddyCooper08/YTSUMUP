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
  function handleClick() {
    state.generate = true;
  }
  return (
    <div className="grid pl-8 pr-20 auto-rows-auto text-roboto">
      <div className="row-span-1">
        {" "}
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
          step={5}
          min={10}
          max={50}
          sx={{
            color: "#3d3d3d",
          }}
          onChange={handleChange}
        />
      </div>

      <div className="grid mt-4 place-items-center">
        <button
          type="button"
          onClick={handleClick}
          className=" w-[100%] flex items-center justify-center text-roboto text-[#b9b9b9] hover:text-white border border-[#222222] hover:bg-[#222222] focus:ring-4 focus:outline-none focus:ring-[#222222] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-#222222 dark:text-[#b9b9b9] dark:hover:text-white dark:hover:bg-[#222222] dark:focus:ring-[#222222]"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
