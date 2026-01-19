import { useState } from "react";
import Audius from "../api/Audius";
import MusicCard from "../components/MusicCard";

const Search = () => {
  const { searchTracks } = Audius();
  const [q, setQ] = useState("");
  const [tracks, setTracks] = useState([]);

  function handleSearch() {
    const fetchTracks = async () => {
      const track = await searchTracks(q);
      setTracks(track.data);
    };
    fetchTracks();
  }

  return (
    <div className="p-4">
      <input
        className="border p-2"
        placeholder="Search music..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="bg-blue-600 text-white p-2.25 px-4 ms-1 rounded "  onClick={handleSearch}>Search</button>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {tracks.map((t) => (
          <MusicCard key={t.id} data={t} />
        ))}
      </div>
    </div>
  );
};

export default Search;
