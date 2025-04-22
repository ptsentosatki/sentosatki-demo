import trainingImage from '../../assets/Pelatihan-Welder.jpg';

const InstructureSection = () => {
  return (
    <div className="px-6 mb-20 mx-auto sm:max-w-xl md:max-w-full lg:px-8 lg:max-w-screen-xl">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div className="text-left lg:pr-10">
          <h5 className="mb-1 text-4xl font-bold text-gray-900 leading-none">
            Instruktur
          </h5>
          <h5 className="mb-4 text-4xl font-bold text-primary-400 leading-none">
            Pelatihan Kerja
          </h5>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Instruktur internal di Balai Latihan Kerja Luar Negeri (BLKLN)
            <span className="font-semibold text-primary-secondary-800">
              {' '}
              PT. SENTOSAKARYA ADITAMA
            </span>{' '}
            terdiri dari para profesional yang memiliki pengalaman lebih dari
            satu dekade dalam melatih dan mempersiapkan Pekerja Migran
            Indonesia. Dengan keahlian yang mendalam dan pemahaman yang kuat
            terhadap kebutuhan tenaga kerja, instruktur kami berkomitmen untuk
            memberikan pelatihan terbaik yang berfokus pada kualitas, keamanan,
            dan keterampilan yang relevan.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src={trainingImage}
            alt="Instruktur Pelatihan Kerja"
          />
        </div>
      </div>
    </div>
  );
};

export default InstructureSection;
