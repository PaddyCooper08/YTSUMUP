"use client";
import SearchBar from "./SearchBar";
import Thumbnail from "./Thumbnail";
import LengthSlider from "./LengthSlider";
import { useSnapshot } from "valtio";
import { state } from "./state";
export default function Home() {
  const snap = useSnapshot(state);
  const yturl = snap.searchBarContent;

  return (
    <main className="bg-black">
      <header className="flex items-center justify-center h-28 ">
        <img
          src="https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/fe40bd73af8c3733c99f7c852aa77cd668513e14/ytsumup-web/assets/logo.svg"
          alt=""
          className="h-16 ml-5 w-[10%] z-10"
        />
        <SearchBar />
      </header>
      <div className="grid h-full grid-cols-5 gap-0">
        <div className="flex items-center justify-center h-full col-span-3 ">
          <Thumbnail yturl={yturl} />
        </div>
        <div className="col-span-2 bg-black">
          <LengthSlider />
        </div>
      </div>
    </main>
  );
}
