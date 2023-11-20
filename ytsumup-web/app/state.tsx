import { proxy, useSnapshot } from "valtio";
const state = proxy({
  searchBarContent: "",
  sliderValue: 50,
  thumbnailUrl:
    "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/677bb02751501994c3ea8297b35bc3f7d1e43326/ytsumup-web/assets/enterURL.svg",
  ytid: "",
  generate: false,
  output: "",
});
export { state };
