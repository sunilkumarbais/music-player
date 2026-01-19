import { Link } from "react-router-dom";
import image from "../assets/image.jpg";

const MusicCard = ({ data }) => {
  if (!data) return null;

  const imageLink =
    data?.artwork?.["150x150"] || data?.artwork?.["480x480"] || image;

  return (
    <Link to={`/play/${data.id}`} className="flex justify-center items-center ">
      <div className=" shrink-0 w-30 hover:scale-105 transition duration-200 ease-in-out flex flex-col gap-2">
        <img src={imageLink} onError={(e) => (e.target.src = image)} />
        <h3 className="text-sm font-semibold truncate text-gray-200">
          {data?.title || "Unknown Title"}
        </h3>
        <p className="text-xs text-gray-400 truncate">{data?.user?.name || "Unknown Artist"}</p>
      </div>
    </Link>
  );
};

export default MusicCard;
