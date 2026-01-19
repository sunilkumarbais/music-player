import { useState } from "react";
import Audius from "../api/Audius";
import MusicCard from "./MusicCard";

const Navbar = () => {
  const { searchTracks } = Audius();
  const [q, setQ] = useState("");
  const [tracks, setTracks] = useState([]);

  function handleSearch() {
    const fetchTracks = async () => {
      localStorage.removeItem("searchResults");
      try {
        const track = await searchTracks(q);
        setTracks(track.data);
        
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchTracks();
  };


  return (
    <>
      <div className="flex flex-col md:flex-row py-3 md:p-4 justify-between items-center bg-blue-500 sticky top-0 z-10">
        <div className="nav-brand  text-white p-4 ">
          <h1 className="text-2xl uppercase md:text-3xl font-bold whitespace-nowrap">
            Music Player
          </h1>
        </div>
        <div className="w-full  flex justify-center md:justify-end items-center ">
          <input
            className=" border p-2 bg-white/10 text-white rounded w-full md:w-80 lg:w-100 transition-all duration-300 ms-3"
            placeholder="Search music..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            className="search-btn ms-1 me-2 "
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {tracks.length > 0 && (
        <>
          <h1 className="container text-white bg-gray-900 text-xl px-6 pt-5 text-center">Search Results</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4  p-4 pt-6 border-b border-indigo-200 bg-gray-900">
            {tracks.map((t) => (
              <MusicCard key={t.id} data={t} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
