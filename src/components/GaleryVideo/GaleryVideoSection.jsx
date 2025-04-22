import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ModalAddVideos from './ModalAddVideos';
import { Toaster, toast } from 'sonner';
import ModalEditVideos from './ModalEditVideo';
import ModalDeleteConfirmationMultiple from './ModalDeleteConfirmation';

const GaleryVideoSection = () => {
  const { user } = useAuth(); 
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalAddVideo, setModalAddVideo] = useState(false);
  const [modalEditVideo, setModalEditVideo] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDeleteVideos, setSelectedDeleteVideos] = useState([]);
  const [isDeleteConfirmationOpenMultiple, setIsDeleteConfirmationOpenMultiple] = useState(false);
  const [selectedEditVideo, setSelectedEditVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;
  const [pageInput, setPageInput] = useState(1);
  const videoRefs = useRef([]);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

  useEffect(() => {
    setLoadingVideos(true);
    axios.get(`${apiDatabaseUrl}/api/gallery/videos/list`)
    .then(response => {
      setVideos(response.data);
      setLoadingVideos(false);
    })
    .catch(error => {
      console.error('Error fetching gallery videos:', error);
      if(error.response.data.includes("Too many requests, please try again later.")) {
        toast.error('Terlalu banyak permintaan ke server, silahkan coba lagi nanti');
      }
      setLoadingVideos(false);
    });
  }, [apiDatabaseUrl]);

  const handlePlay = (index) => {
    videoRefs.current.forEach((ref, i) => {
      if (ref && i !== index) {
        if (ref.tagName === 'IFRAME') {
          ref.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*',
          );
        } else {
          ref.pause();
        }
      }
    });
  };

  const categories = ['all', ...new Set(videos.map((video) => video.category))];

  const filteredVideos =
  selectedCategory === 'all'
    ? videos
    : videos.filter((video) => video.category === selectedCategory);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo,
  );

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setPageInput(page);
  };

  const handlePageInputChange = (e) => {
    const page = Number(e.target.value);
    if (page >= 1 && page <= totalPages) {
      setPageInput(page);
      setCurrentPage(page);
    } else {
      setPageInput('');
    }
  };

  const handleSelectDeleteVideos = (video) => {
    setSelectedDeleteVideos((prevSelected) =>
      prevSelected.some((item) => item.id === video.id)
        ? prevSelected.filter((item) => item.id !== video.id)
        : [...prevSelected, { id: video.id, video_src: video.src }]
    );
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedEditVideo(null);
  };

  const handleSelectEditVideos = (videoId) => {
    setSelectedEditVideo((prevId) => prevId === videoId ? null : videoId);
  };

  const handleVideoClick = (video) => {
    if (isDeleteMode) {
      handleSelectDeleteVideos(video);
    } else if (isEditMode) {
      handleSelectEditVideos(video.id); 
    }
  };

  return (
    <section className="bg-white py-20 sm:py-18">
      <div className="mx-auto max-w-7xl px-5 lg:px-32">
        <div className="text-center mb-10">
          <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
            Koleksi Galeri Video Kami
          </p>
        </div>
          {loadingVideos ? (
            <>
              <div className="px-5 flex flex-col items-center justify-center">
                {/* Skeleton untuk Dropdown Kategori */}
                <div className="w-full md:w-1/5 mb-5">
                  <div className="bg-gray-200 animate-pulse h-10 rounded-md"></div>
                </div>
                {user && (
                  <div className="flex mb-5 space-x-4">
                    <div className="bg-gray-200 animate-pulse h-10 w-32 rounded-md"></div>
                    <div className="bg-gray-200 animate-pulse h-10 w-32 rounded-md"></div>
                    <div className="bg-gray-200 animate-pulse h-10 w-32 rounded-md"></div>
                  </div>
                )}
              </div>
            
              {/* Skeleton untuk Galeri Video */}
              <div className="columns-1 md:columns-2 xl:columns-3 gap-7">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="relative break-inside-avoid mb-8">
                    {/* Skeleton Loading untuk Video */}
                    <div className="relative h-60 bg-gray-200 animate-pulse rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    {/* Skeleton Loading untuk Checkbox/Radiobutton */}
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            
              {/* Skeleton Loading untuk Pagination */}
              <div className="flex justify-center mt-4">
                <div className="flex rounded-md items-center space-x-2">
                  <div className="relative inline-flex items-center px-2 py-2 rounded-md border bg-gray-200 animate-pulse text-sm font-medium">
                    <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                  </div>
                  <span className="mx-5 flex items-center space-x-2">
                  <div className="text-gray-600">Halaman</div>
                    <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="text-gray-600">dari</div>
                    <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  </span>
                  <div className="relative inline-flex items-center px-2 py-2 rounded-md border bg-gray-200 animate-pulse text-sm font-medium">
                    <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="px-5 flex flex-col items-center justify-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-2 py-2 border rounded-md w-full md:w-1/5 mb-5"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category === 'all' ? 'Semua Kategori' : category}
                    </option>
                  ))}
                </select>
                {user && (
                  <div className="flex mb-5 space-x-4">
                    <button
                      onClick={() => setModalAddVideo(true)}
                      className="flex items-center justify-center bg-gray-500 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                    >
                      <FaPlus className="mr-2" /> Tambah Video
                    </button>
                    {!isEditMode && (
                      <>
                        <button
                          onClick={() => setIsDeleteMode(!isDeleteMode)}
                          className="flex items-center justify-center bg-red-500 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-red-600 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                        >
                          <FaTrash className="mr-2" /> {isDeleteMode ? 'Batalkan Hapus' : 'Hapus'}
                        </button>
                        {isDeleteMode && selectedDeleteVideos.length > 0 && (
                          <button
                            onClick={() => setIsDeleteConfirmationOpenMultiple(true)}
                            className="flex items-center justify-center bg-red-500 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-red-600 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                          >
                            <FaTrash className="mr-2" /> Hapus
                          </button>
                        )}
                      </>
                    )}
                    {!isDeleteMode && (
                      <>
                        <button
                          onClick={toggleEditMode}
                          className="flex items-center justify-center bg-primary-400 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-primary-500 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                        >
                          <FaEdit className="mr-2" /> {isEditMode ? 'Batalkan Ubah' : 'Ubah'}
                        </button>
                        {isEditMode && selectedEditVideo && (
                          <button
                            onClick={() => setModalEditVideo(true)}
                            className="flex items-center justify-center bg-primary-400 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-primary-500 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                          >
                            <FaEdit className="mr-2" /> Ubah
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="columns-1 md:columns-2 xl:columns-3 gap-7">
                {currentVideos.length < 0 ? (
                  <div className="w-full text-center text-gray-600">
                    Tidak ada video yang ditemukan.
                  </div>
                ) : (
                  currentVideos.map((video, index) => (
                    <div 
                      key={video.id || index} 
                      className="relative break-inside-avoid mb-8"
                      onClick={() => handleVideoClick(video)}
                    >
                      <video
                        className={`w-full h-auto rounded-lg ${isDeleteMode || isEditMode ? 'opacity-50 pointer-events-none' : ''}`}
                        ref={(el) => (videoRefs.current[index] = el)}
                        onPlay={() => handlePlay(index)}
                        controls={!isDeleteMode && !isEditMode}
                      >
                        <source src={`${apiDatabaseUrl}/api/uploads/videos/${video.src}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {isDeleteMode && (
                        <input
                          type="checkbox"
                          checked={selectedDeleteVideos.some((item) => item.id === video.id)}
                          onChange={() => handleSelectDeleteVideos(video)}
                          className="absolute top-4 right-4 bg-white border border-gray-300 rounded-sm"
                        />
                      )}
                      {isEditMode && (
                        <input
                          type="radio"
                          checked={selectedEditVideo === video.id}
                          onChange={() => setSelectedEditVideo(video.id)}
                          className="absolute top-4 right-4 bg-white border border-gray-300 rounded-sm"
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex rounded-md items-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`relative inline-flex items-center px-2 py-2 rounded-md border text-sm font-medium ${currentPage === 1 ? 'text-gray-400 bg-gray-200 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <span className="mx-5 flex items-center">
                    Halaman{' '}
                    <input
                      type="text"
                      inputMode="numeric"
                      min="1"
                      max={totalPages}
                      value={pageInput}
                      onChange={handlePageInputChange}
                      className="mx-2 px-3 py-2 border rounded-md w-16 text-center"
                      onBlur={() => {
                        const pageNumber = Number(pageInput);
                        if (
                          !isNaN(pageNumber) &&
                          pageNumber >= 1 &&
                          pageNumber <= totalPages
                        ) {
                          handlePageChange(pageNumber);
                        }
                      }}
                    />{' '}
                    dari {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`relative inline-flex items-center px-2 py-2 rounded-md border text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 bg-gray-200 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}
      </div>
      {isDeleteConfirmationOpenMultiple && (
          <ModalDeleteConfirmationMultiple
            isOpen={isDeleteConfirmationOpenMultiple}
            closeModal={() => setIsDeleteConfirmationOpenMultiple(false)}
            totalSelectedVideo={selectedDeleteVideos.length}
            selectedDeleteVideos={selectedDeleteVideos}
            setVideos={setVideos}
            setSelectedDeleteVideos={setSelectedDeleteVideos}
            setIsDeleteMode={setIsDeleteMode}
            setIsDeleteConfirmationOpenMultiple={setIsDeleteConfirmationOpenMultiple}
            toast={toast}
          />
      )}
      {modalAddVideo && (
        <ModalAddVideos isOpen={modalAddVideo} closeModal={() => setModalAddVideo(false)} toast={toast} refreshVideos={() => {
          axios
            .get(`${apiDatabaseUrl}/api/gallery/videos/list`)
            .then((response) => setVideos(response.data))
            .catch((error) => console.error('Error fetching videos:', error));
        }}/>
      )}
      {modalEditVideo && (
        <ModalEditVideos 
          isOpen={modalEditVideo} 
          closeModal={() => setModalEditVideo(false)} 
          toast={toast} 
          selectedVideoId={selectedEditVideo} 
          refreshVideos={() => setVideos(prev => [...prev])}
        />
      )}
      <Toaster richColors/>
    </section>
  );
};

export default GaleryVideoSection;
