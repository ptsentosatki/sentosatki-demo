import { FaSearch, FaFileInvoice } from 'react-icons/fa';
import { PiCertificateBold } from 'react-icons/pi';
import { MdManageAccounts, MdModelTraining, MdWork } from 'react-icons/md';
import { SiAmazonsimpleemailservice } from 'react-icons/si';
import { Link } from 'react-router-dom';

const topics = [
  {
    title: 'Akun',
    description: 'Bantuan informasi tentang Akun',
    path: '/bantuan/akun',
    icon: <MdManageAccounts className="text-4xl text-primary-400" />,
  },
  {
    title: 'Program Pelatihan',
    description: 'Program Pelatihan untuk Persiapan Kerja',
    path: '/bantuan/program-pelatihan',
    icon: <MdModelTraining className="text-4xl text-primary-400" />,
  },
  {
    title: 'Praktek Kerja Lapangan',
    description: 'Persiapan melalui Praktek Kerja',
    path: '/bantuan/praktek-kerja-lapangan',
    icon: <FaFileInvoice className="text-4xl text-primary-400" />,
  },
  {
    title: 'Layanan',
    description: 'Bantuan Informasi layanan',
    path: '/bantuan/layanan',
    icon: <SiAmazonsimpleemailservice className="text-4xl text-primary-400" />,
  },
  {
    title: 'Pekerjaan',
    description: 'Bantuan Informasi Peluang kerja',
    path: '/bantuan/pekerjaan',
    icon: <MdWork className="text-4xl text-primary-400" />,
  },
  {
    title: 'Sertifikasi Kompetensi',
    description: 'Informasi Sertifikasi yang dibutuhkan',
    path: '/bantuan/sertifikasi-kompetensi',
    icon: <PiCertificateBold className="text-4xl text-primary-400" />,
  },
];

const HelpCenterMain = () => {
  return (
    <section className="bg-white py-16 sm:py-18 md:py-20 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-800 uppercase">
            Pusat Bantuan
          </h1>
          <h2 className="text-xl mb-6 sm:mb-8 mt-3">Butuh bantuan?</h2>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Apa yang bisa kami bantu?"
              className="w-full py-2 md:py-3 px-4 md:px-6 rounded-full shadow-md text-gray-700"
            />
            <button className="absolute right-0 top-0 mt-2 md:mt-3 mr-2 md:mr-3">
              <FaSearch className="text-gray-500 text-lg md:text-xl" />
            </button>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topics.map((topic, index) => (
            <Link
              key={index}
              to={topic.path}
              className="block p-4 md:p-6 bg-white text-center shadow-lg hover:shadow-xl transition-shadow rounded-lg border border-gray-300"
            >
              <div className="flex justify-center items-center mb-4 h-16">
                {topic.icon}
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                {topic.title}
              </h2>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpCenterMain;
