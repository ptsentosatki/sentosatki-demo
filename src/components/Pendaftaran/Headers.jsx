import { Link } from 'react-router-dom';
import registrationHeaders from '../../assets/registration-form.jpg';

const Headers = () => {
  return (
    <div className="relative flex flex-col-reverse pt-20 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full hidden h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full lg:block"
          src={registrationHeaders}
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-8 py-8 mx-auto md:px-0 md:py-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 text-left lg:my-40 lg:max-w-lg lg:pr-5">
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            <span className="block mb-2">Pendaftaran</span>
            <span className="block mb-2">Pekerja Migran Indonesia</span>
            <span className="block text-primary-secondary-800">
              PT. SENTOSAKARYA ADITAMA
            </span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Proses pendaftaran Pekerja Migran Indonesia yang resmi dan sesuai
            aturan.
          </p>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Memastikan semua pekerja memenuhi syarat yang ditetapkan pemerintah.
          </p>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Melindungi hak-hak Pekerja Migran sesuai dengan undang-undang yang
            berlaku.
          </p>
          <div className="flex items-center">
            <Link
              to="/registrasi"
              onClick={window.scrollTo(0, 0)}
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded-md shadow-md bg-primary-400 hover:bg-primary-500 focus:shadow-outline focus:outline-none"
            >
              Registrasi Calon PMI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
