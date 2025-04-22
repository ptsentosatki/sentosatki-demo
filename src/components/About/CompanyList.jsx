import { Link } from "react-router-dom"; 

const offices = [
  {
    name: 'Bekasi (Pusat)',
    address:
      'Jl. Balai Desa No.2A, RT.001/RW.004, Jatirasa, Kec. Jatiasih, Kota Bks, Jawa Barat 17424',
  },
  {
    name: 'Cilacap (Cabang)',
    address:
      'Jl. Cimanuk No.31, RT.006/RW.003, Jati, Karangmangu, Kec. Kroya, Kabupaten Cilacap, Jawa Tengah 53282',
  },
  {
    name: 'Subang (Cabang)',
    address:
      'Dusun Krajan II No.RT.10/03, Sukareja, Kec. Sukasari, Kabupaten Subang, Jawa Barat 42154',
  },
  {
    name: 'Cirebon (Cabang)',
    address:
      'DUSUN 03, RT.02/RW.05, Babakan Gebang, Kec. Babakan, Kabupaten Cirebon, Jawa Barat 45191',
  },
];

const CompanyList = () => {
  return (
    <div className="max-w-7xl mx-auto mb-20 mt-5 px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 uppercase">
        Kantor Kami
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {offices.map((office, index) => (
          <div
            key={index}
            className="bg-primary-secondary-800 py-4 px-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-110"
          >
            <h3 className="text-lg font-bold text-white mb-2 uppercase">
              {office.name}
            </h3>
            <p className="text-gray-400">{office.address}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-5">
        <Link
          to="/kontak"
          className="group flex items-center gap-2 text-sm text-primary-secondary-800 font-semibold hover:-translate-x-1 transition duration-300 md:w-auto"
        >
          Lihat Lebih Jelas{' '}
          <span
            className="group-hover:translate-x-2 transition duration-300"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CompanyList;
