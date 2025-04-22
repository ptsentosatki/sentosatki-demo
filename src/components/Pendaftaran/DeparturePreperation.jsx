import departureImage from '../../assets/keberangkatan.jpg';
import { HiDocumentCheck } from 'react-icons/hi2';
import { BsFillSuitcase2Fill } from 'react-icons/bs';
import { MdHealthAndSafety, MdFactCheck } from 'react-icons/md';

const DeparturePreperation = () => {
  return (
    <div className="relative px-4 mb-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto uppercase">
          Sebelum Keberangkatan
        </h2>
        <p className="text-base text-gray-600 md:text-lg">
          Ada beberapa hal yang perlu Kamu persiapkan sebelum keberangkatan
        </p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
              <img
                alt="..."
                src={departureImage}
                className="w-full align-middle rounded-lg"
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap text-left">
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div className="p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-50 text-primary-secondary-800">
                      <HiDocumentCheck className="w-6 h-6" />
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      Persiapan dokumen perjalanan
                    </h6>
                    <p className="mb-4 text-gray-500 text-sm">
                      Pastikan kamu mempersiapkan dokumen seperti paspor, visa,
                      serta tiket pesawat sebelum berangkat
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div className="p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-50 text-primary-secondary-800">
                      <MdHealthAndSafety className="w-6 h-6" />
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">Keamanan</h6>
                    <p className="mb-4 text-gray-500 text-sm">
                      Lalui prosedur keamanan seperti pemeriksaan x-ray untuk
                      barang bawaan dan pemeriksaan tubuh sebelum masuk
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div className="p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-50 text-primary-secondary-800">
                      <BsFillSuitcase2Fill className="w-6 h-6" />
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      Mempersiapkan Barang bawaan
                    </h6>
                    <p className="mb-4 text-gray-500 text-sm">
                      Bawa barang sesuai aturan transportasi dan jangan lupa
                      obat-obatan, pakai sesuai cuaca, dan alat elektronik
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div className="p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-50 text-primary-secondary-800">
                      <MdFactCheck className="w-6 h-6" />
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">Check-In</h6>
                    <p className="mb-4 text-gray-500 text-sm">
                      Lakukan check-in online atau di konter setidaknya 2 jam
                      sebelum penerbangan atau 30 menit sebelum keberangkatan
                      darat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeparturePreperation;
