import { Link } from "react-router-dom";

const Blank = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-3xl font-bold text-red-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Data tidak ditemukan 😞
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Maaf, kami tidak dapat menemukan data yang Kamu pilih
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-primary-secondary-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-secondary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-secondary-800"
          >
            Halaman utama
          </Link>
          <Link
            to="/kontak"
            className="group flex items-center gap-2 text-sm text-primary-secondary-800 font-semibold hover:-translate-x-1 transition duration-300 md:w-auto"
          >
            Temui Kami{' '}
            <span
              className="group-hover:translate-x-2 transition duration-300"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Blank;
