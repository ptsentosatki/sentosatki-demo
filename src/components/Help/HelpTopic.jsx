import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBriefcase,
  FaRegFileAlt,
  FaHandsHelping,
  FaSuitcase,
  FaPaperPlane,
  FaPenNib,
} from 'react-icons/fa';
import { PiCertificateBold } from 'react-icons/pi';
import { MdSwitchAccount, MdAppRegistration } from 'react-icons/md';
import { GrTroubleshoot } from "react-icons/gr";
import forgotPasswordImg from '../../assets/forgot-password-image.jpg';
import howRegistrationImg from '../../assets/registration-image.jpg';
import programPelatihanImg from '../../assets/program-pelatihan-image.jpg';

const topics = [
  {
    id: 'akun',
    title: 'Akun',
    subtopics: [
      {
        id: 'apa-itu-akun-sentosatki',
        title: 'Apa itu akun SentosaTKI ?',
        icon: <MdSwitchAccount className="text-lg" />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/premium-vector/online-registration-sign-up-concept-flat-vector-illustration-young-male-cartoon-character-sitting-huge-smartphone-login-account-social-media-app-user-interface-secure-login_241107-1247.jpg" 
                            alt="Image Account"
                            className="rounded-md h-full max-w-sm"
                        />
                        Akun SentosaTKI adalah layanan single sign on (SSO) untuk semua layanan ketenagakerjaan yang di sediakan pada PT. SENTOSAKARYA ADITAMA.
                        <br/><br/>
                        Jika Kamu sebelumnya pernah login ke layanan ketenagakerjaan pada PT. SENTOSAKARYA ADITAMA apa pun, artinya Kamu sudah memiliki Akun SentosaTKI.
                        <br/><br/>
                        Kamu dapat menggunakan Alamat Email/Nomor KTP dan Password yang sama untuk  dapat login dan menikmati layananan ketenagakerjaan lainnya.
                        <br/><br/>
                        Jika Kamu tidak ingat pernah login dan ingin memeriksa apakah Kamu punya akun, silakan masukan Alamat Email/Nomor KTP Kamu pada halaman login. 
                        Maka Kamu akan melihat pesan jika tidak ada Akun Kemnaker yang terkait dengan Alamat Email Kamu/Nomor KTP Kamu
                    </p>`,
      },
      {
        id: 'bagaimana-untuk-mendaftar-akun-sentosatki',
        title: 'Bagaimana untuk mendaftar Akun SentosaTKI ?',
        icon: <MdAppRegistration className="text-lg" />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src=${howRegistrationImg} 
                            alt="Image Signup"
                            className="rounded-md h-full max-w-sm"
                        /> 
                        Untuk mendaftar Akun SentosaTKI kamu harus tervalidasi menjadi Pekerja Migran Indonesia di PT. SENTOSAKARYA ADITAMA, ikuti langkah-langkah berikut:<br/><br/>1. Kunjungi halaman pendaftaran di situs kami.
                        <br/>
                        2. Lalu klik tombol “Registrasi” pada header halaman pendaftaran
                        <br/>
                        2. Isi formulir registrasi calon PMI dengan data yang valid.
                        <br/>
                        3. Verifikasi alamat email Kamu melalui pesan yang akan di kirimkan ke email kamu masukkan.
                        <br/>
                        4. Setelah verifikasi, Kamu dapat masuk atau Login ke akun Kamu melalui Username / Email / Nama Lengkap Kamu dan Password yang akan di berikan setelah Kamu berhasil daftar dan kamu dapat mulai menggunakan layanan kami.
                        <br/><br/>
                        Jika Kamu mengalami masalah selama proses pendaftaran, jangan ragu untuk <a href="/kontak" className="text-primary-400 hover:text-primary-500 hover:cursor-pointer">
                            menghubungi kami.
                        </a>
                    </p>`,
      },
      {
        id: 'bagaimana-jika-saya-terdapat-kendala-saat-login',
        title: 'Bagaimana jika saya terdapat kendala saat login ?',
        icon: <GrTroubleshoot />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src=${forgotPasswordImg} 
                            alt="Image Forgot Password"
                            className="rounded-md h-full max-w-sm"
                        /> 
                        Jika Kamu terdapat kendala pada saat login, ikuti langkah-langkah berikut:
                        <br/><br/>
                        1. Klik button atau tombol login di bagian navbar dan klik “Kendala Pada Akun ?”.
                        <br/>
                        2. Pilih opsi kendala yang terjadi pada kamu.
                        <br/>
                        <br/>
                        Jika kamu memilih “Melalui Email (Ganti Password)”, lanjuti langkah-langkah berikut:
                        <br/>
                        3. Masukkan email kamu yang sudah terdaftar untuk mereset password.
                        <br/>
                        4. Masukkan Kode OTP yang di berikan ke email Kamu.
                        <br/>
                        5. Masukkan password baru dan konfirmasi password baru untuk mengganti password akun kamu
                        <br/><br/>
                        Jika kamu memilih “Melalui Verifikasi Identitas (Cek Email dan Username)”, lanjuti langkah-langkah berikut:
                        <br/>
                        3. Masukkan No. NIK / KTP, Nama Lengkap, Tanggal Lahir Kamu.
                        <br/>
                        4. Ketahui Email dan Username Kamu.
                        <br/><br/>
                        Jika Kamu tidak menerima email atau mengalami masalah, silakan 
                        <a href="/kontak" className="text-primary-400 hover:text-primary-500 hover:cursor-pointer">
                            hubungi kami
                        </a>.
                    </p>`,
      },
    ],
  },
  {
    id: 'program-pelatihan',
    title: 'Program Pelatihan',
    subtopics: [
      {
        id: 'apa-itu-program-pelatihan',
        title: 'Apa itu Program Pelatihan?',
        icon: <FaChalkboardTeacher className="text-lg" />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src=${programPelatihanImg} 
                            alt="Image Training Program"
                            className="rounded-md h-full max-w-xs md:max-w-sm"
                        /> 
                        Program Pelatihan adalah serangkaian kursus atau pelatihan yang dirancang untuk meningkatkan keterampilan dan pengetahuan pekerja dalam bidang tertentu.
                        <br/><br/>
                        Di PT. SENTOSAKARYA ADITAMA, kami menawarkan berbagai program pelatihan yang disesuaikan dengan kebutuhan industri dan standar internasional untuk memastikan bahwa pekerja migran kami siap menghadapi tantangan di luar negeri.
                    </p>`,
      },
      {
        id: 'bagaimana-cara-mengikuti-program-pelatihan',
        title: 'Bagaimana cara mengikuti Program Pelatihan?',
        icon: <FaCalendarAlt />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/application-process-concept_1150-12065.jpg" 
                            alt="Image Participate"
                            className="rounded-md mb-5"
                        /> 
                        Untuk mengikuti Program Pelatihan, Kamu dapat mendaftar melalui portal kami dengan langkah-langkah berikut:
                        <br/><br/>
                        1. Kunjungi halaman registrasi <a href="https://lpksentosa.com/home/daftarsiswa" className="text-primary-400 hover:text-primary-500 hover:cursor-pointer">LPK kami (ketuk untuk menuju halaman registrasi LPK kami).</a>
                        <br/>
                        2. Isi formulir registrasi dengan data yang valid.
                        <br/>
                        3. Tunggu konfirmasi dari staff kami dan ikuti instruksi selanjutnya.
                        <br/><br/>
                        Jika Kamu memiliki pertanyaan atau memerlukan bantuan, 
                        <a href="/kontak" className="text-primary-400 hover:text-primary-500 hover:cursor-pointer">
                            hubungi kami
                        </a>.
                    </p>`,
      },
    ],
  },
  {
    id: 'praktek-kerja-lapangan',
    title: 'Praktek Kerja Lapangan',
    subtopics: [
      {
        id: 'apa-itu-praktek-kerja-lapangan',
        title: 'Apa itu Praktek Kerja Lapangan?',
        icon: <FaBriefcase />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/field-practice-concept_1150-5097.jpg" 
                            alt="Image Field Practice"
                            className="rounded-md mb-5"
                        /> 
                        Praktek Kerja Lapangan adalah pengalaman kerja yang didapatkan di tempat kerja yang sesungguhnya, memberikan kesempatan untuk menerapkan keterampilan yang telah dipelajari dalam program pelatihan.
                        <br/><br/>
                        Di PT. SENTOSAKARYA ADITAMA, kami menyediakan kesempatan praktek kerja lapangan untuk mempersiapkan pekerja migran kami agar siap menghadapi lingkungan kerja di luar negeri.
                    </p>`,
      },
      {
        id: 'bagaimana-cara-mengikuti-praktek-kerja-lapangan',
        title: 'Bagaimana cara mengikuti Praktek Kerja Lapangan?',
        icon: <FaRegFileAlt />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/internship-opportunity-concept_1150-14153.jpg" 
                            alt="Image Field Practice"
                            className="rounded-md mb-5"
                        /> 
                        Untuk mengikuti Praktek Kerja Lapangan, Kamu dapat mendaftar melalui portal kami dengan langkah-langkah berikut:
                        <br/><br/>
                        1. Kunjungi halaman Praktek Kerja Lapangan di situs kami.
                        <br/>
                        2. Pilih program praktek yang sesuai dengan keterampilan dan minat Kamu.
                        <br/>
                        3. Isi formulir pendaftaran dan lengkapi dokumen yang diperlukan.
                        <br/>
                        4. Ikuti proses seleksi dan terima konfirmasi dari tim kami.
                        <br/><br/>
                        Untuk informasi lebih lanjut, hubungi tim dukungan kami.
                    </p>`,
      },
    ],
  },
  {
    id: 'layanan',
    title: 'Layanan',
    subtopics: [
      {
        id: 'apa-saja-layanan-yang-di-tawarkan',
        title: 'Apa saja layanan yang di tawarkan?',
        icon: <FaHandsHelping />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/customer-support-services-concept_1150-5404.jpg" 
                            alt="Image Services"
                            className="rounded-md mb-5"
                        /> 
                        PT. SENTOSAKARYA ADITAMA menawarkan berbagai layanan termasuk:
                        <br/><br/>
                        1. Penempatan Pekerja Migran Indonesia ke luar negeri.
                        <br/>
                        2. Program pelatihan dan pengembangan keterampilan.
                        <br/>
                        3. Dukungan dan bimbingan sebelum keberangkatan.
                        <br/>
                        4. Bantuan administratif dan legal.
                        <br/><br/>
                        Kami berkomitmen untuk memberikan layanan terbaik dan memastikan kepuasan serta kesejahteraan pekerja kami.
                    </p>`,
      },
    ],
  },
  {
    id: 'pekerjaan',
    title: 'Pekerjaan',
    subtopics: [
      {
        id: 'jenis-pekerjaan-apa-yang-tersedia',
        title: 'Jenis pekerjaan apa yang tersedia?',
        icon: <FaSuitcase />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/job-search-concept_1150-11351.jpg" 
                            alt="Image Jobs"
                            className="rounded-md mb-5"    
                        /> 
                        Kami menawarkan berbagai jenis pekerjaan di berbagai sektor industri termasuk:
                        <br/><br/>
                        1. Konstruksi
                        <br/>
                        2. Perhotelan
                        <br/>
                        3. Kesehatan
                        <br/>
                        4. Manufaktur
                        <br/><br/>
                        Kamu dapat menemukan daftar pekerjaan yang tersedia dan persyaratan di halaman pekerjaan kami di situs web.
                    </p>`,
      },
      {
        id: 'bagaimana-cara-melamar-pekerjaan',
        title: 'Bagaimana cara melamar pekerjaan?',
        icon: <FaPaperPlane />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/job-application-process_1150-5078.jpg" 
                            alt="Image Apply Job"
                            className="rounded-md mb-5"
                        /> 
                        Untuk melamar pekerjaan, ikuti langkah-langkah berikut:
                        <br/><br/>
                        1. Kunjungi halaman Pekerjaan di situs kami.
                        <br/>
                        2. Pilih pekerjaan yang sesuai dengan keterampilan dan minat Kamu.
                        <br/>
                        3. Klik “Lamar Sekarang” dan isi formulir aplikasi dengan data yang diperlukan.
                        <br/>
                        4. Unggah dokumen pendukung dan kirim aplikasi Kamu.
                        <br/><br/>
                        Jika Kamu memerlukan bantuan, hubungi tim dukungan kami.
                    </p>`,
      },
    ],
  },
  {
    id: 'sertifikasi-kompetensi',
    title: 'Sertifikasi Kompetensi',
    subtopics: [
      {
        id: 'apa-itu-sertifikasi-kompetensi',
        title: 'Apa itu Sertifikasi Kompetensi?',
        icon: <PiCertificateBold className="text-lg" />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/competency-certification-concept_1150-5259.jpg" 
                            alt="Image Certification"
                            className="rounded-md mb-"
                        /> 
                        Sertifikasi Kompetensi adalah proses penilaian yang dilakukan untuk memastikan bahwa seseorang memiliki keterampilan dan pengetahuan yang diperlukan untuk pekerjaan tertentu.
                        <br/><br/>
                        Di PT. SENTOSAKARYA ADITAMA, kami menyediakan sertifikasi kompetensi untuk berbagai bidang untuk memastikan pekerja migran kami memenuhi standar internasional.
                    </p>`,
      },
      {
        id: 'bagaimana-cara-mendapatkan-sertifikasi',
        title: 'Bagaimana cara mendapatkan sertifikasi?',
        icon: <FaPenNib />,
        content: `
                    <p className="text-gray-500 leading-relaxed text-md">
                        <img 
                            src="https://img.freepik.com/free-vector/certification-exam-concept_1150-11688.jpg" 
                            alt="Image Certification"
                            className="rounded-md mb-5"
                        /> 
                        Untuk mendapatkan sertifikasi kompetensi, ikuti langkah-langkah berikut:
                        <br/><br/>
                        1. Pilih program sertifikasi yang sesuai dengan bidang yang ingin Kamu sertifikasi.
                        <br/>
                        2. Daftar untuk ujian sertifikasi melalui portal kami.
                        <br/>
                        3. Ikuti ujian dan tunggu hasilnya.
                        <br/>
                        4. Terima sertifikat jika Kamu lulus.
                        <br/><br/>
                        Jika Kamu memerlukan informasi lebih lanjut, hubungi tim dukungan kami.
                    </p>`,
      },
    ],
  },
];

const HelpTopic = () => {
  const { topicId, subtopicId } = useParams();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    const topic = topics.find((t) => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
    }
  }, [topicId]);

  useEffect(() => {
    const subtopic = selectedTopic?.subtopics.find(
      (st) => st.id === subtopicId
    );
    if (subtopic) {
      setSelectedSubtopic(subtopic);
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedTopic, subtopicId]);

  const handleSubtopicClick = (subtopic, topic) => {
    navigate(`/bantuan/${topic.id}/${subtopic.id}`);
  };

  return (
    <section className="bg-white relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-72 md:border-r md:border-gray-200">
            <div className="flex flex-col">
              <ul className="pt-24">
                {topics.map((topic) => (
                  <li key={topic.id} className="relative transition">
                    <input
                      className="peer hidden"
                      type="checkbox"
                      id={`menu-${topic.id}`}
                    />
                    <div className="relative text-left mx-3 flex items-center rounded-xl border-b-4 border-gray-300 bg-gray-50 py-3 text-sm text-gray-500">
                      <span className="mr-5 flex w-5 text-gray-500"></span>
                      {topic.title}
                      {topic.subtopics.length > 0 && (
                        <label
                          htmlFor={`menu-${topic.id}`}
                          className="absolute inset-0 h-full w-full cursor-pointer"
                          onClick={() => setSelectedTopic(topic)}
                        ></label>
                      )}
                    </div>
                    {topic.subtopics.length > 0 && (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="peer-checked:rotate-180 absolute top-3 right-0 mr-5 ml-auto h-4 text-gray-500 transition"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        <ul className="duration-400 text-left peer-checked:max-h-96 m-2 flex max-h-0 flex-col overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300">
                          {topic.subtopics.map((subtopic) => (
                            <li
                              key={subtopic.id}
                              onClick={() =>
                                handleSubtopicClick(subtopic, topic)
                              }
                              className={`mx-2 my-1 flex cursor-pointer rounded-xl py-3 pl-5 text-sm ${
                              subtopicId === subtopic.id
                                ? 'text-primary-500'
                                : 'text-gray-500 hover:bg-gray-200'
                              }
                            `}
                            >
                              <span className="mr-2">{subtopic.icon}</span>
                              {subtopic.title}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-grow px-6 py-8 md:py-20" ref={contentRef}>
            {selectedSubtopic ? (
              <div className="text-left">
                <h2 className="text-2xl font-semibold mt-4 uppercase">
                  {selectedSubtopic.title}
                </h2>
                <div className="mt-4 text-gray-600 max-w-4xl md:max-w-2xl lg:max-w-4xl">
                  {parse(selectedSubtopic.content)}
                </div>
              </div>
            ) : (
              selectedTopic && (
                <div className="mt-4 text-gray-600">
                  <h1 className="text-2xl mx-4 font-semibold text-gray-800 text-left uppercase">
                    Pilih topik bantuan
                  </h1>
                  {selectedTopic.subtopics.map((subtopic) => (
                    <button
                      key={subtopic.id}
                      onClick={() =>
                        handleSubtopicClick(subtopic, selectedTopic)
                      }
                      className="flex items-center mx-4 py-2 text-gray-700 hover:text-primary-400"
                    >
                      {subtopic.icon}
                      <span className="ml-3 text-md font-medium text-left">
                        {subtopic.title}
                      </span>
                    </button>
                  ))}
                </div>
              )
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default HelpTopic;
