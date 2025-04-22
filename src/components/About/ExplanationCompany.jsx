import aboutImage from '../../assets/logo-sentosa-transprent.png';

const ExplanationCompany = () => {
  return (
    <div className="sm:flex items-center justify-center py-5 px-6 lg:px-8">
      <div className="sm:w-1/2 mt-5">
        <div className="image object-center text-center">
          <img src={aboutImage} />
        </div>
      </div>
      <div className="sm:w-1/2 p-5 text-left">
        <div className="text">
          <h2 className="my-4 font-extrabold text-3xl text-primary-secondary-800 sm:text-4xl ">
            PT. SENTOSAKARYA ADITAMA
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Perusahaan yang berkomitmen untuk menempatkan Pekerja Migran
            Indonesia (PMI) ke luar negeri dengan fokus utama pada kesejahteraan
            dan keamanan mereka. Kami memahami betapa pentingnya peran PMI dalam
            mendukung perekonomian keluarga dan negara, serta tantangan yang
            mereka hadapi saat bekerja di luar negeri. Oleh karena itu, kami
            berdedikasi untuk memberikan layanan yang terbaik, mulai dari proses
            perekrutan hingga penempatan di negara tujuan, serta memberikan
            dukungan selama masa kerja mereka di Luar Negeri.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCompany;
