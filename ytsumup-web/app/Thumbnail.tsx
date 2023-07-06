"use client";
import { state } from "./state";

import { snapshot, useSnapshot } from "valtio";

export default function Thumbnail(props: any) {
  const snap = useSnapshot(state);
  // function getThumbnail() {
  //   const pattern = /(?<=\?v=)[A-Za-z0-9]{11}/;
  //   const yturl = props.yturl;

  //   const match = yturl.match(pattern);
  //   if (match === null) {
  //     if (yturl != "") {
  //       return state.thumbnailUrl = "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/89107803c4ff1c026842ba7f5c869d6ceb66f266/ytsumup-web/assets/enterRealURL.svg");
  //     } else {
  //       return state.thumbnailUrl = "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/89107803c4ff1c026842ba7f5c869d6ceb66f266/ytsumup-web/assets/enterURL.svg";
  //     }
  //   } else {
  //     const ytid = match[0];
  //     return `https://img.youtube.com/vi/${ytid}/maxresdefault.jpg`;
  //   }

  return (
    <div>
      <img
        src={snap.thumbnailUrl}
        alt=""
        className="h-96  border-solid border-4 border-[#222222]"
      />
    </div>
  );
}
