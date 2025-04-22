import { Link } from 'react-router-dom';
import onlineRegistrationImage from '../../assets/registration-image.jpeg';

const RegistrationInfoSection = () => {
  return (
    <section className="px-6 mb-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="lg:pr-10 text-left">
          <div>
            <p className="inline-block px-3 py-1 mb-3 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
              PENDAFTARAN
            </p>
          </div>
          <h5 className="mb-1 text-4xl font-bold leading-none">
            Calon Pekerja Migran
          </h5>
          <h5 className="mb-4 text-4xl font-bold leading-none">
            Indonesia ke{' '}
            <span className="inline-block text-primary-secondary-800">
              Luar Negeri
            </span>
          </h5>
          <p className="mb-6 text-gray-500">
            Untuk memudahkan proses pendaftaran, PT. SENTOSAKARYA ADITAMA
            bekerja sama dengan para profesional berpengalaman di berbagai
            wilayah untuk memulai seleksi awal pendaftaran
          </p>
          <hr className="mb-5 border-gray-300" />
          <div className="flex items-center space-x-4">
            <Link
              to="/pendaftaran"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-lg shadow-md md:w-auto bg-primary-400 hover:bg-primary-500 focus:shadow-outline focus:outline-none"
            >
              Pendaftaran
            </Link>
          </div>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded-md shadow-lg sm:h-96"
            src={onlineRegistrationImage}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default RegistrationInfoSection;
