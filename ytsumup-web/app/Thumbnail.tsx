export default function Thumbnail(props: any) {
  function getThumbnail() {
    const pattern = /(?<=\?v=)[^&]+/;
    const match = props.yturl.match(pattern);
    if (match == null) {
      return "Please provide a proper youtube link";
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
