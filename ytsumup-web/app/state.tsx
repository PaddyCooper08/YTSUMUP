import { proxy, useSnapshot } from "valtio";
const state = proxy({ searchBarContent: "", sliderValue: 50 });
export { state };
