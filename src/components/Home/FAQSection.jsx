import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium text-left">{title}</p>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 text-gray-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="2,7 12,17 22,7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-4 pt-0">
          <p className="text-gray-600 leading-relaxed text-left">{children}</p>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const FAQSection = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-1 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
              FAQ
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-9 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-14 sm:block"
              >
                <defs>
                  <pattern
                    id="9012817d-af60-45bb-9786-89646bc1c945"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#9012817d-af60-45bb-9786-89646bc1c945)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">PERTANYAAN</span>
            </span>{' '}
            SERING DITANYAKAN
          </h2>
        </div>
        <div className="space-y-4">
          <Item title="Apa itu PT. SENTOSAKARYA ADITAMA?">
            PT. SENTOSAKARYA ADITAMA adalah perusahaan yang berfokus pada
            Penempatan Pekerja Migran Indonesia ke Luar Negeri. Kami berdedikasi
            untuk memberikan layanan terbaik dan memastikan kesejahteraan tenaga
            kerja kami.
          </Item>
          <Item title="Negara apa saja yang tervalidasi ?">
            Kami memiliki lowongan pekerjaan tervalidasi di berbagai negara
            seperti Hongkong, Taiwan, Jepang, Korea Selatan, Singapura,
            Malaysia, Hongkong, Rusia, Denmark
          </Item>
          <Item title="Berapa gaji seorang Pekerja Migran Indonesia di Luar Negeri ?">
            Gaji bagi Pekerja Migran Indonesia (PMI) di berbagai negara memiliki
            perbedaan tergantung pada jabatan atau jenis pekerjaan yang
            dilakukan. Setiap posisi memiliki tingkat gaji yang berbeda
            berdasarkan tanggung jawab, keterampilan yang dibutuhkan, dan lokasi
            kerja.
            <br />
            <br />
            Untuk informasi lebih detail mengenai gaji berdasarkan jabatan atau
            pekerjaan tertentu, Kamu dapat melihat daftar pekerjaan dan gaji
            yang tersedia di halaman
            <Link
              href="/job-list"
              className="text-primary-400 hover:text-primary-500"
            >
              {' '}
              Job List (Ketuk untuk melihat daftar pekerjaan)
            </Link>{' '}
            di situs kami. Di sana, Kamu akan menemukan informasi lengkap
            mengenai berbagai posisi yang kami tawarkan serta gaji yang sesuai
            dengan masing-masing pekerjaan.
          </Item>
          <Item title="Bagaimana cara mendaftar sebagai Pekerja Migran Indonesia?">
            Kamu bisa mendaftar melalui online / dengan mengisi formulir
            pendaftaran yang tersedia di
            <Link
              to="/registrasi"
              className="text-primary-400 hover:text-primary-500"
            >
              {' '}
              situs web kami (Ketuk untuk melakukan registrasi)
            </Link>{' '}
            atau mengunjungi{' '}
            <Link
              to="/kontak"
              className="text-primary-400 hover:text-primary-500"
            >
              Kantor cabang yang tersedia (Ketuk untuk melihat kantor kami)
            </Link>
            . Proses pendaftaran melibatkan wawancara awal, pengumpulan dokumen,
            dan pelatihan sesuai kebutuhan posisi yang Kamu lamar.
          </Item>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
