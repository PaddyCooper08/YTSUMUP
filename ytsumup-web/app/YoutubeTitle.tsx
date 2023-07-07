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

export default async function YoutubeTitle(props: any) {
  const data: any = await getData(props.id);

  return <div className="ml-3">Title: {data.items[0].snippet.title}</div>;
}
