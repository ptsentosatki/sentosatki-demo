import advantageImage1 from '../../assets/kelebihan-image-1.jpg';

const AdvantageSection = () => {
  return (
    <div className="flex flex-col items-center justify-center py-17 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5 order-2 md:order-1">
          <div className="space-y-5 sm:text-center md-text-right lg:text-right">
            <div>
              <h2 className="text-3xl font-bold text-primary-secondary-800">
                Perlindungan dari Kami
              </h2>
              <p className="mt-2 text-gray-600">
                Kami berkomitmen sebagai mitra resmi KEMNAKER dan BP2MI untuk
                melindungi hak-hak Pekerja Migran Indonesia di luar negeri. Kami
                memberikan perlindungan hukum yang komprehensif dan memastikan
                kepatuhan terhadap regulasi yang berlaku.
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                Kami fokus pada kesejahteraan pekerja dengan menyediakan
                pendampingan hukum, bantuan penyelesaian masalah, dan memastikan
                akses terhadap informasi penting. Kami percaya bahwa setiap
                individu berhak bekerja dalam lingkungan yang aman dan adil.
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                Kami tidak hanya memenuhi standar internasional dalam penempatan
                pekerja migran tetapi juga berperan dalam meningkatkan kondisi
                kerja di tempat tujuan, menciptakan dampak positif bagi
                komunitas pekerja migran dan keluarga mereka di Indonesia.
              </p>
            </div>
          </div>
        </div>
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden order-2 md:order-1">
          <div className="aspect-w-16 aspect-h-9 md:h-full lg:h-full">
            <img
              src={advantageImage1}
              alt="Background"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="ms:aspect-w-16 ms:aspect-h-9 md:h-full lg:h-full">
            <img
              src={advantageImage1}
              alt="Background"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
        <div className="space-y-5 sm:text-center md-text-left lg:text-left">
          <div>
            <h2 className="text-3xl font-bold text-primary-secondary-800">
              PT. SENTOSAKARYA ADITAMA
            </h2>
            <p className="mt-2 text-gray-600">
              merupakan sebuah Perusahaan Penempatan Pekerja Migran Indonesia
              yang berdedikasi untuk menyediakan layanan Penempatan Pekerja
              Migran Indonesia (P2MI) ke Luar Negeri.
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              Kami berfokus pada penempatan yang aman, pelatihan yang
              berkualitas, dan pemantauan yang kontinu untuk memastikan
              kesejahteraan pekerja migran kami. Dengan dukungan dari KEMNAKER
              dan BP2MI, kami menyediakan layanan yang aman dan terpercaya,
              membangun jembatan antara Pekerja Migran Indonesia dan peluang
              kerja Internasional.
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              Kami percaya bahwa setiap pekerja adalah aset berharga bagi
              bangsa, dan kami berkomitmen untuk memberdayakan mereka melalui
              kesempatan kerja di luar negeri. Hubungi kami sekarang dan
              mulailah perjalanan Kamu ke Luar Negeri yang penuh peluang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantageSection;
