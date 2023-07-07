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
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${api_key}`,
    options
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  } else {
    return res.json();
  }
}

export default async function YoutubeTitle(props: any) {
  const data: any = await getData(props.id);
  const channelId = data.items[0].snippet.channelId;
  const channelData: any = await getChannelData(channelId);

  const title = data.items[0].snippet.title;
  const channelTitle = data.items[0].snippet.channelTitle;

  const viewCount = data.items[0].statistics.viewCount;
  const likeCount = data.items[0].statistics.likeCount;
  const channelPfp = channelData.items[0].snippet.thumbnails.high.url;

  return (
    <div className="ml-3">
      Title: {title} id: {channelId} imgurl: {channelPfp}
    </div>
  );
}
