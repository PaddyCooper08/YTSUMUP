import Image from "next/image";
// @ts-ignore
import TextTruncate from "react-text-truncate"; // recommend
import ts from "typescript";

async function getData(ytid: string) {
  const options = { method: "GET", headers: { Accept: "application/json" } };
  const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&id=${ytid}&key=${api_key}`,
    options
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  } else {
    return res.json();
  }
}
async function getChannelData(channelId: string) {
  const options = { method: "GET", headers: { Accept: "application/json" } };
  const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${channelId}&key=${api_key}`,
    options
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  } else {
    return res.json();
  }
}
function formatNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}
function truncate(source: string, maxCharacters: number) {
  if (source.length <= maxCharacters) {
    return source;
  }

  const truncatedText = source.slice(0, maxCharacters);
  return truncatedText + "...";
}

export default async function YoutubeTitle(props: any) {
  const data: any = await getData(props.id);
  const channelId = data.items[0].snippet.channelId;
  const channelData: any = await getChannelData(channelId);

  const title = truncate(data.items[0].snippet.title, 28);
  const channelTitle = truncate(data.items[0].snippet.channelTitle, 38);
  const viewCount = data.items[0].statistics.viewCount;
  const likeCount = data.items[0].statistics.likeCount;
  const description = data.items[0].snippet.description;

  const channelPfp = channelData.items[0].snippet.thumbnails.high.url;
  const subscriberCount = channelData.items[0].statistics.subscriberCount;

  return (
    <div className="ml-3 w-[62.5rem] mr-0 mt-3">
      <div className="flex items-center grid-cols-12 gap-0 font-sans">
        <div className="w-full col-span-5">
          <div className="flex text-2xl font-bold font-youtube-sans">
            {title}
          </div>

          <div className="flex items-center mt-3">
            <Image
              src={channelPfp}
              height="50"
              width="50"
              alt="Youtube Thumbnail"
              style={{ borderRadius: "50%" }}
            />
            <div className="grid-rows-2">
              <div className="row-span-1">
                <h2
                  id="channelTitle"
                  className="ml-3 font-semibold font-youtube-sans font-xl"
                >
                  {channelTitle}
                </h2>
              </div>
              <div className="row-span-1">
                <div
                  id="data-under-video"
                  className="ml-3 flex    font-youtube-sans text-[#3d3d3d]"
                >
                  <h4>{formatNumber(subscriberCount)} subscribers</h4>
                  <h2 className="ml-2">Views {formatNumber(viewCount)}</h2>
                  <h2 className="ml-2">Likes {formatNumber(likeCount)}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="font-youtube-sans col-span-7 flex text-left ml-0 mb-1  w-full items-center text-[#3d3d3d]">
          <TextTruncate
            line={4}
            element="span"
            truncateText="…"
            text={description}
          />
        </div>
      </div>
    </div>
  );
}
