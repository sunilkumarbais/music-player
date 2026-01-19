import { useEffect, useState } from "react";
import Audius from "../api/Audius";
import { useNavigate, useParams } from "react-router-dom";
import image from "../assets/image.jpg";

const Play = () => {
  const { id } = useParams();
  const { getTrackById, streamUrl } = Audius();
  const [track, setTrack] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const track = await getTrackById(id);
        setTrack(track.data);
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };
    fetchTrack();
  }, [id]);

  if (!track) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-4xl">
        Loading...
      </div>
    );
  }
  const imageLink =
    track?.artwork?.["150x150"] || track?.artwork?.["480x480"] || image;
  return (
    <>
      <div className="px-6 flex flex-col md:flex-row justify-center items-center space-x-2 space-y-6  min-h-screen bg-gray-900 text-white">
      <button className=" top-4 left-4 md:top-10 md:left-10 bg-blue-500 px-2 py-1 md:px-4 md:py-2 text-lg absolute cursor-pointer rounded-md hover:bg-blue-600" onClick={() => navigate(-1)}>Back</button>
        <img
          src={imageLink}
          className="w-60 lg:w-80 rounded-lg shrink-0"
          onError={(e) => (e.target.src = image)}
        />
        <div className="flex flex-col gap-2 mt-4 md:p-8 max-w-3xl">
          <h1 className="text-2xl font-bold ">{track.title}</h1>
          <p className="text-gray-400 ">{track.user.name}</p>
          <p className="">{track.description || "No description available."}</p>
          <audio className="mt-3" controls src={streamUrl(track.id)} />
        </div>
      </div>
    </>
  );
};

export default Play;
