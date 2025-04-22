import { Link } from 'react-router-dom';
import ProcedureImage from '../../assets/process.jpg';

const ProcedureRegistration = () => {
  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto uppercase">
          Prosedur Pendaftaran
        </h2>
        <p className="text-base text-gray-600 md:text-lg">
          Prosedur pendaftaran Calon Pekerja Migran Indonesia di PT.
          SENTOSAKARYA ADITAMA sangat memperhatikan kualitas, legalitas dan
          keamanan dari Calon PMI
        </p>
      </div>
      <div className="grid gap-6 row-gap-10 lg:grid-cols-2 text-left">
        <div className="lg:py-6 lg:pr-16">
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-primary-secondary-800"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold text-primary-secondary-800">
                Pendaftaran
              </p>
              <p className="text-gray-500">
                Pada tahap awal ini, Calon PMI akan melakukan{' '}
                <Link to="/registrasi" className="text-primary-400">
                  pendaftaran
                </Link>{' '}
                dan melampirkan dokumen-dokumen yang diperlukan
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-primary-secondary-700"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold text-primary-secondary-800">
                Seleksi
              </p>
              <p className="text-gray-500">
                Setelah melakukan tahap pendaftaran awal, Calon PMI akan
                dilakukan seleksi. Calon PMI yang lolos seleksi akan
                diikutsertakan tes kompetensi yang meliputi tes bahasa dan tes
                keterampilan
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-primary-secondary-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold text-primary-secondary-800">
                Tes Kesehatan
              </p>
              <p className="text-gray-500">
                Calon PMI yang lolos tahap seleksi dan tes kompetensi akan
                dilakukan pemeriksaan kesehatan untuk melengkapi persyaratan
                dalam proses pendaftaran Pekerja Migran Indonesia
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-primary-secondary-500"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold text-primary-secondary-800">
                Pelatihan dan Persiapan Dokumen
              </p>
              <p className="text-gray-500">
                Setelah Calon PMI dinyatakan lolos seleksi dan tes kesehatan,
                pihak kami akan memberikan pelatihan yang diperlukan sebelum
                diberangkatankan ke negara tujuan. Selain itu, Calon PMI juga
                dipersipakan dokumen-dokumen yang diperlukan
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-6 text-primary-secondary-400"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polyline
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      points="6,12 10,16 18,8"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-1">
              <p className="mb-2 text-lg font-bold text-primary-secondary-800">
                Proses Pemberangkatan
              </p>
              <p className="text-gray-500">
                Setelah semua persyaratan dan dokumen terpenuhi, maka Calon PMI
                akan diberangkatan ke destinasi. Pihak kami akan menjamin bahwa
                Calon PMI diberangkatkan secara legal dan memenuhi semua
                persyaratan yang ditetapkan oleh pemerintah setempat
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
            src={ProcedureImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProcedureRegistration;
