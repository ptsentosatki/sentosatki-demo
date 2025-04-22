import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchJobSection = () => {
  const [locations, setLocations] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All');
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${apiDatabaseUrl}/api/jobs`);
        const uniqueLocations = [
          ...new Set(response.data.map((job) => job.location)),
        ];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (keyword) searchParams.set('keyword', keyword);
    if (location !== 'All') searchParams.set('location', location);

    window.location = `/job-list?${searchParams.toString()}`;
  };

  return (
    <section className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">
            CARI PEKERJAAN
          </h2>
          <form className="flex flex-col items-center justify-center md:flex-row gap-4">
            <input
              type="text"
              placeholder="Posisi atau Pekerjaan"
              className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
            >
              <option value="All">Lokasi (Semua)</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-primary-secondary-800 text-white py-2 px-5 rounded-md"
            >
              Cari
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchJobSection;
