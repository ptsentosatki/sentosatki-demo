import { Link } from 'react-router-dom';
import bendera_jepang from '../../assets/japan.png';
import bendera_korea_selatan from '../../assets/south-korea.png';
import bendera_malaysia from '../../assets/malaysia.png';
import bendera_singapura from '../../assets/singapore.png';
import bendera_taiwan from '../../assets/taiwan.png';
import bendera_uni_eropa from '../../assets/bendera_uni_eropa.png';

const bendera_hongkong = new URL('../../assets/hong-kong.png', import.meta.url)
  .href;

const locations = [
  {
    name: 'Taiwan',
    image: bendera_taiwan,
  },
  {
    name: 'Jepang',
    image: bendera_jepang,
  },
  {
    name: 'Korea Selatan',
    image: bendera_korea_selatan,
  },
  {
    name: 'Malaysia',
    image: bendera_malaysia,
  },
  {
    name: 'Singapura',
    image: bendera_singapura,
  },
  {
    name: 'Hongkong',
    image: bendera_hongkong,
  },
  {
    name: 'Eropa',
    image: bendera_uni_eropa,
  },
];

const CategorySection = () => {
  return (
    <div className="bg-white py-10 sm:py-18 relative z-10">
      <div className="mx-auto max-w-7xl px-6 items-center justify-center lg:px-8">
        <div className="container py-5">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="inline-block px-3 py-1 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
              KERJASAMA ANTAR NEGARA
            </h2>
            <p className="mt-5 text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
              LOWONGAN PEKERJAAN TERVALIDIASI DARI BERBAGAI NEGARA
            </p>
          </div>
          <div className="mt-10 gap-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((country, index) => (
              <Link
                key={index}
                className="cat-item rounded p-2 flex flex-col items-center bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
                to={`/job-list?location=${encodeURIComponent(country.name)}`}
                onClick={() => window.scrollTo(0, 0)} 
              >
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-16 mb-2 rounded-md"
                />
                <h6 className="mb-3 text-gray-700 text-xl">{country.name}</h6>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
