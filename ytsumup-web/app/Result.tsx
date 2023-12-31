import { snapshot, useSnapshot } from "valtio";
import { state } from "./state";
import { get } from "http";

async function getOutput() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${BASE_URL}/process_video`;
  console.log(url);
  const snap = useSnapshot(state);
  let video_url = snap.searchBarContent;
  let custom_percentage = snap.sliderValue;
  const data = {
    url: video_url,

    custom_percentage: custom_percentage,
    check_grammar: true,
    model_url:
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
  };
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };
  let finished = false;

  const res = await fetch("http://localhost:5000/process_video", options);
  const output = res.json();
  console.log(output);
  console.log(typeof output);
  // state.output = output;
  // console.log(`State: ${state.output}`);
  return res.json();
  // console.log(typeof output["summary"]);
  // if (typeof output["summary"] === "string") {
  //   console.log("output", output["summary"]);
  //   finished = true;
  //   console.log(`Finished ${finished}`);
  //   return output["summary"];
  // } else {
  //   console.log("made error");
  //   console.log(`Finished ${finished}`);
  //   finished = true;
  //   return "error: " + output;
  // }
}

export default async function Result() {
  const output = await getOutput();

  return <h1>Output: {output}</h1>;
}
