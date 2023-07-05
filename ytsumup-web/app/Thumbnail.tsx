export default function Thumbnail(props: any) {
  function getThumbnail() {
    const pattern = /(?<=\?v=)[A-Za-z0-9]{11}/;
    const yturl = props.yturl;
    const match = yturl.match(pattern);
    if (match === null) {
      return "Please provide a proper YouTube link.";
    } else {
      const ytid = match[0];
      return `https://img.youtube.com/vi/${ytid}/maxresdefault.jpg`;
    }
  }

  return (
    <div>
      <img src={getThumbnail()} alt="" className="h-96" />
    </div>
  );
}
