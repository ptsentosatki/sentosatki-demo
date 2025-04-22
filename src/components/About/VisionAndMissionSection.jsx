import aboutImage from '../../assets/kelebihan-image-1.jpg';
import aboutImage2 from '../../assets/penerimaan-surat-penerbangan.jpg';
import aboutImage3 from '../../assets/keberhasilan-penerbangan-welder.jpg';

const VisionAndMissionSection = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 mb-24 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg">
        <div className="space-y-5 text-left py-1 md:py-8">
          <h2 className="text-3xl font-bold text-gray-900">VISI KAMI</h2>
          <p className="text-gray-600 text-md leading-relaxed">
            Menjadi perusahaan jasa rekrutmen, pelatihan, dan Penempatan Tenaga
            Kerja Migran Indonesia yang dihormati, dengan fokus pada
            kesejahteraan, keamanan, dan kualitas hidup pekerja kami.
          </p>
          <h2 className="text-3xl font-bold text-gray-900">MISI KAMI</h2>
          <p className="text-gray-600 text-md leading-relaxed">
            1. Mensosialisasikan program pemerintah tentang peluang kerja, hak,
            dan kewajiban calon tenaga kerja migran Indonesia dan pengguna jasa
            <br />
            2. Meningkatkan mutu karyawan guna menciptakan lingkungan kerja yang
            baik dan mendukung kepuasan semua pihak terkait
            <br />
            3. Membangun dan meningkatkan mutu BLK-LN agar sesuai standar negara
            penempatan dan menciptakan tenaga kerja yang profesional
          </p>
        </div>
        <div className="flex items-center justify-center -mx-4 lg:pl-8">
          <div className="flex flex-col items-end">
            <img
              className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
              src={aboutImage}
              alt=""
            />
            <img
              className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
              src={aboutImage2}
              alt=""
            />
          </div>
          <div className="px-3">
            <img
              className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
              src={aboutImage3}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionAndMissionSection;
