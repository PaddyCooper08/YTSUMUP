"use client";
import { state } from "./state";
import YoutubeTitle from "./YoutubeTitle";
import { Suspense } from "react";
import Image from "next/image";

import { snapshot, useSnapshot } from "valtio";

export default function Thumbnail(props: any) {
  const snap = useSnapshot(state);

  if (snap.ytid == "") {
    return (
      <div>
        <Image
          src={snap.thumbnailUrl}
          height="1000"
          width="1000"
          alt="Youtube Thumbnail"
          onError={(e) =>
            (state.thumbnailUrl =
              "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/863ccecc1733fc350fd39c8c5c400297b6ea6c60/ytsumup-web/assets/error.svg")
          }
          className=" border-solid border-4 border-[#222222] font-sans ml-3"

          // onerror = null;
        />
      </div>
    );
  } else {
    return (
      <div>
        <Image
          src={snap.thumbnailUrl}
          height="1000"
          width="1000"
          alt="Youtube Thumbnail"
          onError={(e) =>
            (state.thumbnailUrl =
              "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/863ccecc1733fc350fd39c8c5c400297b6ea6c60/ytsumup-web/assets/error.svg")
          }
          className=" border-solid border-4 border-[#222222] font-sans ml-3"
        />
        <Suspense fallback={<p className="ml-3">Loading...</p>}>
          <YoutubeTitle id={state.ytid} />
        </Suspense>
      </div>
    );
  }
}
