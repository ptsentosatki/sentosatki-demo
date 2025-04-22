import { GiUpgrade, GiAirplaneDeparture } from 'react-icons/gi';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import { MdVerifiedUser } from 'react-icons/md';

const CompanyResult = () => {
  return (
    <div className="px-6 mb-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-1 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
            APA HASIL DARI PERUSAHAAN INI ?
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-9 -ml-20 text-gray-400 md:-mt-24 lg:w-32 lg:-ml-28 sm:block"
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
            <span className="relative">KAMI BERHASIL</span>
          </span>{' '}
        </h2>
      </div>
      <div className="grid max-w-screen-lg gap-8 row-gap-10 mx-auto md:grid-cols-2">
        <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div className="mr-4">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <GiAirplaneDeparture className="text-2xl text-primary-400" />
            </div>
          </div>
          <div className="text-left">
            <h6 className="mb-1 text-xl text-primary-400 font-bold leading-5">
              10.000+
            </h6>
            <h6 className="mb-3 text-xl text-gray-900 font-bold leading-5">
              Berhasil Diterbangkan
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Kami telah berhasil menerbangkan lebih dari 10.000 PMI ke berbagai
              negara dengan komitmen pada kualitas, keselamatan, dan pelayanan
              yang terpercaya
            </p>
          </div>
        </div>
        <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div className="mr-4">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <PiBuildingApartmentFill className="text-2xl text-primary-400" />
            </div>
          </div>
          <div className="text-left">
            <h6 className="mb-1 text-xl text-primary-400 font-bold leading-5">
              4+
            </h6>
            <h6 className="mb-3 text-xl text-gray-900 font-bold leading-5">
              Kantor Kami
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Kami berhasil mendirikan lebih dari 4 kantor di Indonesia yang
              siap melayani kebutuhan masyarakat dengan profesionalisme dan
              layanan terbaik
            </p>
          </div>
        </div>
        <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div className="mr-4">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <GiUpgrade className="text-2xl text-primary-400" />
            </div>
          </div>
          <div className="text-left">
            <h6 className="mb-1 text-xl text-primary-400 font-bold leading-5">
              99%
            </h6>
            <h6 className="mb-3 text-xl text-gray-900 font-bold leading-5">
              Pertumbuhan Perusahaan
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Perjalanan Pertumbuhan dari tahun 1999 menjadi Perusahaan yang
              luar biasa karena kami mengikuti gaya manajemen yang moderen dan
              terus berinovasi sesuai dengan perkembangan zaman.
            </p>
          </div>
        </div>
        <div className="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div className="mr-4">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <MdVerifiedUser className="text-2xl text-primary-400" />
            </div>
          </div>
          <div className="text-left">
            <h6 className="mb-1 text-xl text-primary-400 font-bold leading-5">
              8+
            </h6>
            <h6 className="mb-3 text-xl text-gray-900 font-bold leading-5">
              Negara Tervalidasi
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Kami telah berhasil memvalidasi negara yang dapat ditujukan untuk
              para Calon PMI seperti Taiwan, Jepang, Hongkong, Korea Selatan,
              Malaysia, Singapura, Rusia, Denmark, dan negara lainnya
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className="px-4 mb-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    //     <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
    //         <div className="text-center">
    //             <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-100 sm:w-12 sm:h-12">
    //                 <GiUpgrade className="text-2xl text-gray-800"/>
    //             </div>
    //             <h6 className="text-4xl font-bold text-primary-400">
    //                 99%
    //             </h6>
    //             <p className="mb-2 font-bold text-xl text-gray-800">Pertumbuhan Perusahaan</p>
    //             <p className="text-gray-500 text-sm leading-relaxed">
    //                 Perjalanan Pertumbuhan dari tahun 1999 menjadi Perusahaan yang luar biasa karena kami mengikuti gaya manajemen yang
    //                 moderen dan terus berinovasi sesuai dengan perkembangan zaman.
    //             </p>
    //         </div>
    //         <div className="text-center">
    //             <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
    //                 <GiAirplaneDeparture className="text-2xl text-gray-800"/>
    //             </div>
    //             <h6 className="text-4xl font-bold text-primary-400">
    //                 10.000+
    //             </h6>
    //             <p className="mb-2 font-bold text-xl text-gray-800">Berhasil Diterbangkan</p>
    //             <p className="text-gray-500 text-sm leading-relaxed">
    //                 Kami telah berhasil menerbangkan lebih dari 10.000 PMI ke berbagai negara dengan komitmen pada kualitas, keselamatan,
    //                 dan pelayanan yang terpercaya
    //             </p>
    //         </div>
    //         <div className="text-center">
    //             <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
    //                 <PiBuildingApartmentFill className="text-2xl text-gray-800"/>
    //             </div>
    //             <h6 className="text-4xl font-bold text-primary-400">4+</h6>
    //             <p className="mb-2 font-bold text-xl text-gray-800">Kantor Kami</p>
    //             <p className="text-gray-500 text-sm leading-relaxed">
    //                 Kami berhasil mendirikan lebih dari 4 kantor di Indonesia yang siap melayani kebutuhan masyarakat dengan profesionalisme
    //                 dan layanan terbaik
    //             </p>
    //         </div>
    //         <div className="text-center">
    //             <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
    //                 <MdVerifiedUser className="text-2xl text-gray-800"/>
    //             </div>
    //             <h6 className="text-4xl font-bold text-primary-400">8+</h6>
    //             <p className="mb-2 font-bold text-xl text-gray-800">Negara Tervalidasi</p>
    //             <p className="text-gray-500 text-sm leading-relaxed">
    //                 Kami telah berhasil memvalidasi negara yang dapat ditujukan untuk para Calon PMI seperti Taiwan, Jepang, Hongkong,
    //                 Korea Selatan, Malaysia, Singapura, Rusia, Denmark, dan negara lainnya
    //             </p>
    //         </div>
    //     </div>
    // </div>
    // <section className="mb-20 bg-white">
    //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //         <h2 className="text-3xl font-extrabold mb-5 text-gray-800 uppercase">Hasil dari kami</h2>
    //         <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between text-left">
    //             <div className="flex-1 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 flex flex-col justify-between">
    //                 <div className="flex gap-5">
    //                     <div className="font-manrope text-2xl font-bold text-primary-400">
    //                         99%
    //                     </div>
    //                     <div className="flex-1">
    //                         <h4 className="text-xl text-gray-900 font-semibold mb-2">Pertumbuhan Perusahaan</h4>
    //                         <p className="text-xs text-gray-600 leading-5">Perjalanan Pertumbuhan dari tahun 1999 menjadi Perusahaan yang luar biasa karena kami mengikuti gaya manajemen yang moderen dan terus berinovasi sesuai dengan perkembangan zaman.</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="flex-1 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 flex flex-col justify-between">
    //                 <div className="flex gap-5">
    //                     <div className="font-manrope text-2xl font-bold text-primary-400">
    //                         10.000+
    //                     </div>
    //                     <div className="flex-1">
    //                         <h4 className="text-xl text-gray-900 font-semibold mb-2">Berhasil Diterbangkan</h4>
    //                         <p className="text-xs text-gray-600 leading-5">Kami telah berhasil menerbangkan lebih dari 10.000 PMI ke berbagai negara dengan komitmen pada kualitas, keselamatan, dan pelayanan yang terpercaya.</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="flex-1 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 flex flex-col justify-between">
    //                 <div className="flex gap-5">
    //                     <div className="font-manrope text-2xl font-bold text-primary-400">
    //                         4+
    //                     </div>
    //                     <div className="flex-1">
    //                         <h4 className="text-xl text-gray-900 font-semibold mb-2">Kantor Kami</h4>
    //                         <p className="text-xs text-gray-600 leading-5">Kami berhasil mendirikan lebih dari 4 kantor di Indonesia yang siap melayani kebutuhan masyarakat dengan profesionalisme dan layanan terbaik.</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </section>
  );
};

export default CompanyResult;
