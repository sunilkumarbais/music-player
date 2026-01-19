import { useEffect, useState } from "react";
import Audius from "../api/Audius";
import MusicCard from "../components/MusicCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [tracks, setTracks] = useState(JSON.parse(localStorage.getItem("tracks")) || []);
  const { getTrendingTracks } = Audius();

  useEffect(() => {
    const fetchTrending = async () => {
      const trending = await getTrendingTracks(30);
      setTracks(trending.data);
      localStorage.setItem("tracks", JSON.stringify(trending.data));
    };
    fetchTrending();
  }, []);

  return (
    <div className="container mx-auto">
      <Navbar />
      {!tracks.length > 0 ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-4xl">
          <p>Loading......</p>
        </div>
      ) : (
        <div className="p-6 grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mt-6 gap-6 bg-gray-900 min-h-screen">
          {tracks.map((track) => (
            <MusicCard key={track.id} data={track} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
