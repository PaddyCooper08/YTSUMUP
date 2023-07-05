"use client";
import SearchBar from "./SearchBar";
import Thumbnail from "./Thumbnail";
import { useSnapshot } from "valtio";
import { state } from "./state";
export default function Home() {
  const snap = useSnapshot(state);
  const yturl = snap.searchBarContent;

  return (
    <main className="bg-black">
      <header className="h-[112px] bg-red-700 flex items-center justify-center">
        <SearchBar />
      </header>

      <Thumbnail yturl={yturl} />
    </main>
  );
}
