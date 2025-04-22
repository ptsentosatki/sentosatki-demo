import founderImage from '../../assets/founder-image.jpg';

const HistoryCompanySection = () => {
  return (
    <section className="flex justify-center mb-20 px-6 lg:px-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 lg:w-1/3 relative">
          <img
            src={founderImage}
            alt="Team working"
            className="rounded-tl-[50px] md:rounded-tl-[80px] object-cover w-full h-auto"
          />
          <div className="absolute inset-x-0 bottom-4 mx-auto bg-primary-400 text-white text-sm font-semibold py-2 px-4 rounded-lg w-fit">
            Teguh Riyanto - Direktur Utama
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/3 text-left">
          <h3 className="text-gray-500 font-semibold uppercase text-sm md:text-base">
            Sejarah kami!
          </h3>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mt-2 uppercase">
            Kami memiliki sejarah yang menarik
          </h2>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
                <span className="font-semibold text-primary-secondary-800">
                  PT. SENTOSAKARYA ADITAMA{' '}
                </span>
                didirikan sejak tahun 1999, dan mulai dipegang oleh Teguh Riyanto, SH, dengan
                visi untuk menjadi Perusahaan Jasa Rekrutmen, Pelatihan, dan
                Penempatan Tenaga Kerja Migran Indonesia yang dihormati, dengan
                fokus pada kesejahteraan, keamanan, dan kualitas hidup pekerja
                Kami. Berawal dari semangat untuk memberikan peluang kerja yang
                lebih baik dan memastikan kesejahteraan tenaga kerja kami, dan
                juga Kami selalu mengikuti gaya manajemen moderen sesuai
                perkembangan zaman. Perusahaan ini telah berkembang menjadi
                salah satu yang paling dipercaya dan dihormati di industri ini.
                Kami berdedikasi untuk memberikan layanan terbaik, mulai dari
                pelatihan, penempatan, hingga dukungan selama masa kerja di luar
                negeri. Kami percaya bahwa tenaga kerja Indonesia memiliki
                potensi besar untuk sukses di panggung internasional, dan kami
                ada di sini untuk membantu mewujudkannya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className="mb-20 px-4 md:px-8 lg:px-16">
    //     <div className="container mx-auto text-center">
    //         <h2 className="text-3xl font-bold mb-5 text-gray-800">SEJARAH KAMI</h2>
    //         <div className="flex flex-col items-center">
    //             <img
    //                 src={founderImage}
    //                 alt="Founder Teguh Riyanto, SH"
    //                 className="w-48 h-48 object-cover rounded-full shadow-lg mb-6 transition-transform duration-500 hover:scale-105"
    //             />
    //             <h3 className="text-xl font-semibold text-gray-800 mb-2">Teguh Riyanto, SH</h3>
    //             <p className="text-gray-600 mb-4">Direktur Utama</p>
    //             <p className="max-w-4xl text-lg text-gray-600 leading-relaxed">
    //                 PT. SENTOSAKARYA ADITAMA telah dipegang oleh Teguh Riyanto, SH sejak tahun 1999, dengan visi untuk menjadi Perusahaan Jasa Rekrutmen, Pelatihan, dan Penempatan Tenaga Kerja Migran Indonesia yang dihormati, dengan fokus pada kesejahteraan, keamanan, dan kualitas hidup pekerja Kami. Berawal dari semangat untuk memberikan peluang kerja yang lebih baik dan memastikan kesejahteraan tenaga kerja kami, dan juga Kami selalu mengikuti gaya manajemen moderen sesuai perkembangan zaman. Perusahaan ini telah berkembang menjadi salah satu yang paling dipercaya dan dihormati di industri ini. Kami berdedikasi untuk memberikan layanan terbaik, mulai dari pelatihan, penempatan, hingga dukungan selama masa kerja di luar negeri. Kami percaya bahwa tenaga kerja Indonesia memiliki potensi besar untuk sukses di panggung internasional, dan kami ada di sini untuk membantu mewujudkannya.
    //             </p>
    //         </div>
    //     </div>
    // </section>
  );
};

export default HistoryCompanySection;
