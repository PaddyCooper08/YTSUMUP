"use client";
import SearchBar from "./SearchBar";
import Thumbnail from "./Thumbnail";
import LengthSlider from "./LengthSlider";
import Result from "./Result";
import { Suspense } from "react";
import { useSnapshot } from "valtio";
import { state } from "./state";
import Loading from "./loading";
export default function Home() {
  const snap = useSnapshot(state);
  const yturl = snap.searchBarContent;

  if (snap.generate == true) {
    return (
      <main className="bg-black">
        <header className="flex items-center justify-center h-28 ">
          <img
            src="https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/fe40bd73af8c3733c99f7c852aa77cd668513e14/ytsumup-web/assets/logo.svg"
            alt=""
            className="h-16 ml-[4.1rem] w-[10%] z-10"
          />
          <SearchBar />
        </header>
        <div className="grid h-full grid-cols-12 gap-0">
          <div className="flex items-center justify-center h-full col-span-7 px-4">
            <Thumbnail yturl={yturl} />
          </div>
          <div className="items-center w-full col-span-5 bg-black ">
            <LengthSlider />
            <Suspense fallback={<Loading />}>
              <Result />
            </Suspense>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="bg-black">
        <header className="flex items-center justify-center h-28 ">
          <img
            src="https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/fe40bd73af8c3733c99f7c852aa77cd668513e14/ytsumup-web/assets/logo.svg"
            alt=""
            className="h-16 ml-[4.1rem] w-[10%] z-10"
          />
          <SearchBar />
        </header>
        <div className="grid h-full grid-cols-12 gap-0">
          <div className="flex items-center justify-center h-full col-span-7 px-4">
            <Thumbnail yturl={yturl} />
          </div>
          <div className="items-center w-full col-span-5 bg-black ">
            <LengthSlider />
          </div>
        </div>
      </main>
    );
  }
}
