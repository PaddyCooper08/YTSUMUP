export default function Thumbnail(props: any) {
  function getThumbnail() {
    const pattern = /(?<=\?v=)[A-Za-z0-9]{11}/;
    const yturl = props.yturl;
    const match = yturl.match(pattern);
    if (match === null) {
      return "https://raw.githubusercontent.com/PaddyCooper08/YTSUMUP/677bb02751501994c3ea8297b35bc3f7d1e43326/ytsumup-web/assets/enterURL.svg";
    } else {
      const ytid = match[0];
      return `https://img.youtube.com/vi/${ytid}/maxresdefault.jpg`;
    }
  }

  return (
    <div>
      <img
        src={getThumbnail()}
        alt=""
        className="h-96  border-solid border-4 border-[#222222]"
      />
    </div>
  );
}
