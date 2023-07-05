import { proxy, useSnapshot } from "valtio";
const state = proxy({ searchBarContent: "" });
export { state };
