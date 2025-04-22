import kemankerLogo from '../../assets/logo-kemanker.png';
import bp2miLogo from '../../assets/BP2MI_logo.png';

const SupervisedBy = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="inline-block px-3 py-1 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
          PARTNER
        </h2>
        <h2 className="text-3xl font-bold text-gray-800">
          KAMI MERUPAKAN PARTNER DARI
        </h2>
        <div className="mx-auto mt-5 flex justify-center items-center gap-8 sm:gap-16 lg:gap-32">
          <a
            className="bg-white p-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
            href="https://kemnaker.go.id/"
            target="_blank"
          >
            <img
              className="max-h-12 w-auto object-contain"
              src={kemankerLogo}
              alt="Logo Kemanker"
            />
          </a>
          <a
            className="bg-white p-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
            href="https://bp2mi.go.id/"
            target="_blank"
          >
            <img
              className="max-h-12 w-auto object-contain"
              src={bp2miLogo}
              alt="Logo BP2MI"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupervisedBy;
