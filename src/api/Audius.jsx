
const Audius = () => {

 const BASE = "https://discoveryprovider.audius.co/v1";


 const getTrendingTracks = (limit = 20) =>
  fetch(`${BASE}/tracks/trending?limit=${limit}`).then(r => r.json());


 const searchTracks = (query) =>
  fetch(`${BASE}/tracks/search?query=${query}`).then(r => r.json());


 const getTrackById = (id) =>
  fetch(`${BASE}/tracks/${id}`).then(r => r.json());


 const streamUrl = (id) =>
  `${BASE}/tracks/${id}/stream`;

  return {
    getTrendingTracks,
    searchTracks,
    getTrackById,
    streamUrl
  }
}

export default Audius;