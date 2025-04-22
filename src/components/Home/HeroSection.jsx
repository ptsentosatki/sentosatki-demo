import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import image1 from '../../assets/employment-2.png';
import image2 from '../../assets/world.jpg';
import image3 from '../../assets/happy-work.jpeg';
import image4 from '../../assets/analythic-chart.jpg';

const backgroundData = [
  {
    image: image1,
    title: 'Agen Tenaga Kerja Terbaik untuk Karir Internasional Kamu',
    description: 'Kami membantu Kamu membuka Peluang Kerja ke Berbagai Negara',
  },
  {
    image: image2,
    title: 'Temukan Peluang Terbaik untuk Karir Kamu dari Berbagai Negara',
    description:
      'Temukan informasi lowongan pekerjaan dari Berbagai negara yang telah terverifikasi dan sesuai dengan Minat Kamu',
  },
  {
    image: image3,
    title: 'Kesempatan Karir Besar Menanti Kamu di Luar Negeri',
    description:
      'Dengan pengalaman dan dedikasi Kami, Kami membantu Kamu mencapai kesuksesan di Pasar Kerja Global',
  },
  {
    image: image4,
    title: 'Peluang Emas untuk Karir Profesional di Luar Negeri',
    description:
      'Kamu akan mendapatkan Peluang Kerja di Berbagai Negara dengan Bantuan Kami',
  },
];

const HeroSection = () => {
  return (
    <section className="relative inset-0 w-full h-full md:h-[50vh] overflow-hidden mt-24 object-cover z-0">
      <Swiper
        autoplay={{ delay: 10000 }}
        loop
        modules={[Autoplay, Pagination, Navigation]}
        className="relative w-full h-full"
      >
        {backgroundData.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover z-10 order-1 md:order-2"
              />
              <div className="relative md:absolute inset-0 flex flex-col items-left justify-center px-4 sm:px-6 lg:px-8 md:bg-black/40 w-full order-2 md:order-1">
                <div className="p-4 md:p-0 rounded md:rounded-none max-w-3xl md:max-w-md lg:max-w-3xl text-left md:text-left">
                  <h2 className="text-gray-800 sm:text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-gray-800 sm:text-white text-sm sm:text-base md:text-lg lg:text-xl mb-6">
                    {slide.description}
                  </p>
                  <Link
                    to="/job-list"
                    className="inline-block bg-primary-400 text-white px-6 py-3 rounded-md text-sm font-semibold shadow-lg hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-600 transition duration-400 ease-in-out"
                  >
                    Lihat Lowongan Pekerjaan
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
