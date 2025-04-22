import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import videoTesti1 from '../../assets/testimonial-video-1.mp4';

const TestimonialSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedVideo(null);
  };

  const testimonials = [
    {
      id: 1,
      name: 'Sahidin',
      jobs: 'Kontruksi',
      profilePic: 'https://via.placeholder.com/50',
      content:
        'Terima kasih kepada PT. SENTOSAKARYA ADITAMA dan staff atas proses yang mudah, terpercaya, dan transparansi pembiayaan.',
      video: videoTesti1,
      rating: 5,
    },
    {
      id: 2,
      name: 'Lina Aryani',
      jobs: 'Baby sitter',
      profilePic: 'https://via.placeholder.com/50',
      content:
        'PT. SENTOSAKARYA ADITAMA memberikan layanan yang sangat memuaskan dan proses yang cepat dan jelas.',
      video: videoTesti1,
      rating: 5,
    },
    {
      id: 3,
      name: 'Rudi Hartono',
      jobs: 'Kontruksi',
      profilePic: 'https://via.placeholder.com/50',
      content:
        'Pengalaman bekerja dengan PT. SENTOSAKARYA ADITAMA sangat menyenangkan. Detail dan kreativitas mereka luar biasa.',
      video: videoTesti1,
      rating: 4,
    },
    {
      id: 4,
      name: 'Nina Putri',
      jobs: 'Nurshing Home',
      profilePic: 'https://via.placeholder.com/50',
      content:
        'Pelayanan dari PT. SENTOSAKARYA ADITAMA sangat baik dan berpengalaman. Prosesnya jelas dan dukungan staff nya sangat memuaskan.',
      video: videoTesti1,
      rating: 4.5,
    },
    {
      id: 5,
      name: 'Rizky Pratama',
      jobs: 'Operator Worker',
      profilePic: 'https://via.placeholder.com/50',
      content:
        'PT. SENTOSAKARYA ADITAMA menawarkan layanan yang profesional dan sangat efesien dengan dukungan dan bimbingannya.',
      video: videoTesti1,
      rating: 4.5,
    },
  ];

  const starRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.362 2.16 10.638 2.16 10.951 2.927L12.717 7.1l4.728.688c.902.131 1.263 1.24.61 1.875l-3.422 3.339.808 4.705c.153.893-.785 1.57-1.58 1.149L10 16.347l-4.261 2.239c-.794.417-1.732-.256-1.58-1.149l.808-4.705-3.422-3.339c-.653-.634-.292-1.744.61-1.875l4.728-.688 1.766-4.173z" />
          </svg>,
        );
      } else if (i - rating < 1) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={`grad${i}`}>
                <stop
                  offset={`${(rating - (i - 1)) * 100}%`}
                  stopColor="currentColor"
                />
                <stop
                  offset={`${(rating - (i - 1)) * 100}%`}
                  stopColor="rgb(209 213 219)"
                />
              </linearGradient>
            </defs>
            <path
              fill={`url(#grad${i})`}
              d="M9.049 2.927C9.362 2.16 10.638 2.16 10.951 2.927L12.717 7.1l4.728.688c.902.131 1.263 1.24.61 1.875l-3.422 3.339.808 4.705c.153.893-.785 1.57-1.58 1.149L10 16.347l-4.261 2.239c-.794.417-1.732-.256-1.58-1.149l.808-4.705-3.422-3.339c-.653-.634-.292-1.744.61-1.875l4.728-.688 1.766-4.173z"
            />
          </svg>,
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.362 2.16 10.638 2.16 10.951 2.927L12.717 7.1l4.728.688c.902.131 1.263 1.24.61 1.875l-3.422 3.339.808 4.705c.153.893-.785 1.57-1.58 1.149L10 16.347l-4.261 2.239c-.794.417-1.732-.256-1.58-1.149l.808-4.705-3.422-3.339c-.653-.634-.292-1.744.61-1.875l4.728-.688 1.766-4.173z" />
          </svg>,
        );
      }
    }
    return <div className="flex items-center">{stars}</div>;
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <div>
          <p className="inline-block px-3 py-1 mb-3 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-200">
            TESTIMONIAL
          </p>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          INI KATA PELANGGAN KAMI
        </h2>
      </div>
      <div className="mt-8">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 10000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.profilePic}
                    alt={`${testimonial.name} Profile`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-400">{testimonial.jobs}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex items-center">
                    {starRating(testimonial.rating)}
                  </div>
                  <button
                    onClick={() => openModal(testimonial)}
                    className="text-primary-400 hover:text-primary-500"
                  >
                    Lihat Video Testimoni
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={closeModal}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />
          <div className="flex items-center justify-center min-h-screen">
            <DialogPanel className="relative bg-white rounded-lg max-w-sm mx-auto p-6">
              {selectedVideo && (
                <>
                  <DialogTitle className="text-xl font-bold">
                    {selectedVideo.name} - {selectedVideo.jobs}
                  </DialogTitle>
                  <button
                    onClick={closeModal}
                    className="absolute top-6 right-2"
                  >
                    <span className="bg-transparent text-gray-800 h-6 w-6 text-4xl block outline-none focus:outline-none hover:text-gray-900">
                      ×
                    </span>
                  </button>
                  <div className="mb-4">{starRating(selectedVideo.rating)}</div>
                  <video
                    src={selectedVideo.video}
                    controls
                    autoPlay
                    className="w-full h-full rounded-md"
                  ></video>
                </>
              )}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default TestimonialSection;
