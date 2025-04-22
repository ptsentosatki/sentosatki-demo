import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPrayingHands } from 'react-icons/fa';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { GiSpellBook } from 'react-icons/gi';

const RegistrationPreparation = () => {
  const sebelumPendaftaranRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#sebelum-pendaftaran') {
      sebelumPendaftaranRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <section
      ref={sebelumPendaftaranRef}
      id="sebelum-pendaftaran"
      className="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10"
    >
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
            HAL YANG PERLU DISIAPKAN
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-9 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-14 sm:block"
            >
              <defs>
                <pattern
                  id="9012817d-af60-45bb-9786-89646bc1c945"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#9012817d-af60-45bb-9786-89646bc1c945)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">SEBELUM</span>
          </span>{' '}
          PENDAFTARAN
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Ada beberapa hal yang perlu Kamu persiapkan sebelum memutuskan untuk
          mendaftar sebagai Pekerja Migran Indonesia
        </p>
      </div>
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
          <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
            <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="relative p-5 bg-white rounded-sm">
              <div className="flex flex-col items-start mb-2 lg:items-center lg:flex-row">
                <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full text-primary-secondary-800 bg-indigo-50 lg:mb-0">
                  <FaPrayingHands className="w-6 h-6" />
                </div>
                <h6 className="font-semibold leading-relaxed text-primary-secondary-800">
                  Persiapan Diri
                </h6>
              </div>
              <p className="mb-2 text-sm text-gray-500 text-left">
                Kamu akan bekerja di luar negeri, maka persiapkan diri Kamu
                sebaik mungkin, untuk menjalankan tanggung jawab yang
                diamanahkan
              </p>
            </div>
          </div>
          <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
            <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="relative p-5 bg-white rounded-sm">
              <div className="flex flex-col mb-2 items-start lg:items-center lg:flex-row">
                <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full text-primary-secondary-800 bg-indigo-50 lg:mb-0">
                  <IoDocumentTextSharp className="w-6 h-6" />
                </div>
                <h6 className="font-semibold leading-relaxed text-primary-secondary-800">
                  Dokumen
                </h6>
              </div>
              <p className="mb-2 text-sm text-gray-500 text-left">
                Mulai dari Kartu Tanda Penduduk (KTP), Ijazah Pendidikan
                Terakhir, dan Kelengkapan Dokumen lainnya yang dipersyaratkan
                pada saat pendaftaran
              </p>
            </div>
          </div>
          <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
            <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="relative p-5 bg-white rounded-sm">
              <div className="flex flex-col mb-2 items-start lg:items-center lg:flex-row">
                <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full text-primary-secondary-800 bg-indigo-50 lg:mb-0">
                  <GiSpellBook className="w-6 h-6" />
                </div>
                <h6 className="font-semibold leading-relaxed text-primary-secondary-800">
                  Belajar
                </h6>
              </div>
              <p className="mb-2 text-sm text-gray-500 text-left">
                Sebelum mendaftar, sebaiknya banyak membaca dan pahami mengenai
                persyaratan dan peraturan yang dapat berubah mengikuti
                perkembangan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPreparation;
