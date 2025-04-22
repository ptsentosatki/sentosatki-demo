import { Link } from "react-router-dom";

const PreperationSection = () => {
  return (
    <section className="px-6 mb-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
        <div className="relative lg:w-1/2">
          <img
            src="https://www.frankfurt-airport.com/content/dam/fraport-travel/airport/reisevorbereitung/check-in-gep%C3%A4ck-und-kontrollen/gep%C3%A4ck/Checkin.gep%C3%A4ck.kontrolle-gep%C3%A4ck-hinweise-K45_1920x1080px.jpg/_jcr_content/renditions/Checkin.gep%C3%A4ck.kontrolle-gep%C3%A4ck-hinweise-K45_1080x1080px.jpg./Checkin.gep%C3%A4ck.kontrolle-gep%C3%A4ck-hinweise-K45_1080x1080px.jpg"
            alt=""
            className="object-cover w-full lg:absolute h-80 lg:h-full"
          />
        </div>
        <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2 text-left">
          <div>
            <p className="inline-block px-3 py-1 mb-3 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
              Apa yang harus dipersiapkan ?
            </p>
          </div>
          <h5 className="mb-3 text-3xl font-bold leading-none sm:text-4xl">
            Sebelum{' '}
            <span className="text-primary-secondary-800">Pendaftaran</span> dan
            <span className="text-primary-secondary-800"> Keberangkatan</span>
          </h5>
          <p className="mb-5 text-gray-700">
            Sebelum pendaftaran dan berangkat ke luar negeri, pastikan Kamu
            memahami tahapan yang perlu dilakukan dan persiapkan semua yang
            diperlukan dari sekarang
          </p>
          <div className="flex items-center">
            <Link
              to="/pendaftaran#sebelum-pendaftaran"
              onClick={() => window.scrollTo(0, 0)}
              className="group flex items-center gap-2 text-sm text-primary-secondary-800 font-semibold hover:-translate-x-1 transition duration-300 md:w-auto"
            >
              Baca selengkapnya{' '}
              <span
                className="group-hover:translate-x-2 transition duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreperationSection;
