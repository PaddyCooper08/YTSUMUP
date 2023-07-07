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
          className=" border-solid border-4 border-[#222222] font-sans ml-3"
        />
      </div>
    );
  } else {
    return (
      <div>
        <Image
          src={snap.thumbnailUrl}
          fill={true}
          alt="Youtube Thumbnail"
          className=" border-solid border-4 border-[#222222] font-sans ml-3"
        />
        <Suspense fallback={<p>Loading...</p>}>
          <YoutubeTitle id={state.ytid} />
        </Suspense>
      </div>
    );
  }
}
