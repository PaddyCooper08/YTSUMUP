"use client";
import { state } from "./state";
import { useSnapshot } from "valtio";

export default function SearchBar() {
  const snap = useSnapshot(state);
  function handleSubmit(e: any) {
    e.preventDefault();
    e = document.getElementById("searchBarInput");

    // @ts-ignore

    // Read the form data
    // @ts-ignore

    const output = e.value;
    // @ts-ignore
    state.searchBarContent = output;
    const pattern = /(?<=\?v=)[^&]{11}/;
    const yturl = output;

    const match = yturl.match(pattern);
    if (match === null) {
      if (yturl != "") {
        state.ytid = "";
        state.thumbnailUrl =
          "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/89107803c4ff1c026842ba7f5c869d6ceb66f266/ytsumup-web/assets/enterRealURL.svg";
      } else {
        state.ytid = "";
        state.thumbnailUrl =
          "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/89107803c4ff1c026842ba7f5c869d6ceb66f266/ytsumup-web/assets/enterURL.svg";
      }
    } else {
      const ytid = match[0];
      state.ytid = ytid;
      state.thumbnailUrl = `https://i.ytimg.com/vi/${ytid}/high.jpg`;
    }
  }
  function onKeyUp(e: any) {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSubmit(e);
    }
  }

  return (
    <form
      className="flex flex-wrap items-center justify-center w-full h-full mr-[14.85rem]"
      // onSubmit={handleSubmit}
      onKeyDown={onKeyUp}
    >
      <div className="flex justify-center w-1/2">
        <input
          className="relative bg-[#111111] font-sans pl-5 my-3 py-4 text-xl  text-left border-[#282828] rounded-l-[2.5rem] m-0 block min-w-0 placeholder-[#7e7e7e] flex-auto border border-solid focus:border-none  leading-[1.6]  outline-none  text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] "
          placeholder="Enter Youtube URL"
          aria-label="Search"
          aria-describedby="button-addon2"
          name="Search Bar"
          type="text"
          id="searchBarInput"
        />

        <button
          className="input-group-text bg-[#222222] my-3 text-lg py-[1.3rem] flex items-center whitespace-nowrap rounded-r-[2.5rem] px-8 text-center  font-sans "
          id="basic-addon2"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
