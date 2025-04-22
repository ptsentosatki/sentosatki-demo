import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FaDownload, FaShareAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
import ModalAddPhoto from './ModalAddPhoto';
import ModalEditPhoto from './ModalEditPhoto';
import ModalDeleteConfirmationSingle from './ModalDeleteConfirmationSingle';
import ModalDeleteConfirmationMultiple from './ModalDeleteConfirmationMultiple';

const GaleryPhotoSection = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedEditPhoto, setSelectedEditPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const photosPerPage = 10;
  const [pageInput, setPageInput] = useState(1);
  const photoRef = useRef(null);
  const [modalAddPhoto, setModalAddPhoto] = useState(false);
  const [modalEditPhoto, setModalEditPhoto] = useState(false);
  const [isDeleteConfirmationOpenMultiple, setIsDeleteConfirmationOpenMultiple] = useState(false);
  const [isDeleteConfirmationOpenSingle, setIsDeleteConfirmationOpenSingle] = useState(false);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

  useEffect(() => {
    setLoadingPhotos(true);
    axios.get(`${apiDatabaseUrl}/api/gallery/photos/list`)
    .then(response => {
      setPhotos(response.data);
      setLoadingPhotos(false);
    })
    .catch(error => {
      console.error('Error fetching gallery photos:', error);
      if(error.response.data.includes("Too many requests, please try again later.")) {
        toast.error('Terlalu banyak permintaan ke server, silahkan coba lagi nanti');
      }
      setLoadingPhotos(false);
    });
  }, [apiDatabaseUrl]);

  useEffect(() => {
    if (selectedPhoto && photoRef.current) {
      photoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedPhoto]);
  
  useEffect(() => {
    document.body.style.overflow = isDeleteConfirmationOpenMultiple || isDeleteConfirmationOpenSingle ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDeleteConfirmationOpenMultiple, isDeleteConfirmationOpenSingle]);
  //   {
  //     url: Welder,
  //     title: 'Pelatihan Pekerja Welder 3G/4G',
  //     category: 'Kegiatan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: PelepasanPMI,
  //     title: 'Rapat Pelepasan 100 PMI PT. SENTOSAKARYA ADITAMA',
  //     category: 'Kegiatan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: WelderTraning,
  //     title: 'Pelatihan Pekerja Welder 3G/4G',
  //     category: 'Kegiatan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: keberangkatanPMI,
  //     title: 'Keberangkatan PMI PT. SENTOSAKARYA ADITAMA',
  //     category: 'Penerbangan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: PemberianSertifikatBSNP,
  //     title: 'RAPAT PELEPASAN 100 PMI PT. SENTOSAKARYA ADITAMA',
  //     category: 'Kegiatan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: dokumentasiUpacaraKemerdekaanIndonesia79,
  //     title: 'Upacara Kemerdekaan Indonesia Ke-79',
  //     category: 'Kegiatan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: dokumentasiUpacaraKemerdekaanIndonesia792,
  //     title: 'Upacara Kemerdekaan Indonesia Ke-79',
  //     category: 'Kegiatan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: keberhasilanKeberangkatanWelder,
  //     title: 'Keberhasilan Keberangkatan Welder 3G/4G ke Korea Selatan',
  //     category: 'Penerbangan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: keberhasilanKeberangkatanWelderWorker,
  //     title: 'Keberhasilan Keberangakatan Welder ke Korea Selatan E-7',
  //     category: 'Penerbangan',
  //     description: 'Deskripsi foto',
  //   },
  //   {
  //     url: dokumentasiUpacaraKemerdekaanIndonesia793,
  //     title: 'Upacara Kemerdekaan Indonesia Ke-79',
  //     category: 'Kegiatan',
  //     description: 'Deskripsi foto',
  //   },
  // ];

  const categories = ['all', ...new Set(photos.map((photo) => photo.category))];

  const getCategory = () => {
    return selectedPhoto ? selectedPhoto.category : '';
  };

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const filteredPhotosSelected = photos.filter(
    (photo) => 
      photo.category === getCategory() && photo.image_url !== selectedPhoto?.image_url,
  );

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto,
  );

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  const openModal = (photo) => setSelectedPhoto(photo);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const groupedPhotos = chunkArray(currentPhotos, 3);

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

  const handleDownload = async (photo) => {
    const url = `${apiDatabaseUrl}/api/uploads/images/${photo.image_url}`;
    const response = await fetch(url);
    const blob = await response.blob();
  
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `foto-${photo.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (url) => {
    const shareUrl = `${apiDatabaseUrl}/api/uploads/images/${url}`;
  
    if (navigator.share) {
      navigator
        .share({
          title: 'Lihat foto ini!',
          text: 'Saya menemukan foto ini di galeri kami.',
          url: shareUrl,
        })
        .then(() => console.log('Berbagi sukses!'))
        .catch((error) => console.error('Error berbagi foto:', error));
    } else {
      toast.error('Fitur berbagi tidak didukung di browser ini.');
    }
  };

  const handleSelectPhoto = (photo) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.some((item) => item.id === photo.id)
        ? prevSelected.filter((item) => item.id !== photo.id)
        : [...prevSelected, { id: photo.id, image_url: photo.image_url }]
    );
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedEditPhoto(null);
  };

  const handleSelectEditPhoto = (photoId) => {
    setSelectedEditPhoto((prevId) => prevId === photoId ? null : photoId);
  };
  
  return (
    <div className="bg-white py-20 sm:py-18 relative z-10">
      <div className="mx-auto max-w-7xl items-center justify-center">
        <div className="mx-auto lg:text-center" ref={photoRef}>
          <p className="mt-5 font-extrabold tracking-tight text-gray-800 text-2xl md:text-4xl uppercase">
            Koleksi Galeri Foto Kami
          </p>
        </div>
        <div className="mx-auto px-5 py-2 lg:px-6 lg:pt-5">
          {loadingPhotos ? (
            <div className="px-5 flex flex-col items-center justify-center">
              <div className="w-full md:w-1/5 mb-5">
                <div className="bg-gray-200 animate-pulse h-10 rounded-md"></div>
              </div>
              
              {user && (
                <div className="flex mb-5 space-x-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-gray-200 animate-pulse h-16 w-16 md:w-32 rounded-md"></div>
                  ))}
                </div>
              )}

              <div className="-m-1 flex flex-wrap">
                {[...Array(6)].map((_, groupIndex) => (
                  <div key={groupIndex} className="flex flex-wrap w-full md:w-1/2">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className={`relative overflow-hidden ${index === 0 ? 'w-full' : 'w-1/2'} p-1 md:p-2`}
                      >
                        <div className="rounded-lg block h-full w-full overflow-hidden">
                          <div className="bg-gray-200 animate-pulse block h-60 w-screen max-w-xs md:max-w-2xl lg:max-w-6xl object-cover object-center" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {selectedPhoto && !isDeleteMode && !isEditMode && (
                <div className='px-5 flex flex-col items-center justify-center'>
                  <div className="flex mb-5 space-x-4 flex-wrap">
                    {user && (
                      <>
                        <button
                          onClick={() => setIsDeleteConfirmationOpenSingle(true)}
                          className="flex items-center justify-center bg-red-500 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-red-600 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                        >
                          <FaTrash className="mr-2" /> Hapus
                        </button>
                        <button
                          onClick={() => { setModalEditPhoto(true); setSelectedEditPhoto(selectedPhoto.id) }}
                          className="flex items-center justify-center bg-primary-400 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-primary-500 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                        >
                          <FaEdit className="mr-2" /> Ubah
                        </button>
                      </>
                    )}
                  </div>
                  <div className="relative grid gap-4 mb-8">
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="absolute top-4 right-4 md:left-4 md:right-auto bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start">
                      <img
                        className="h-auto sm:h-48 md:h-full max-w-full rounded-lg lg:w-2/3 mb-5 lg:mb-0"
                        src={`${apiDatabaseUrl}/api/uploads/images/${selectedPhoto.image_url}`}
                        alt={selectedPhoto.title}
                        crossOrigin='anonymous'
                      />
                      <div className="lg:ml-6 flex flex-col justify-center w-full lg:w-1/3">
                        <p className="text-xl text-left font-bold mb-2 text-gray-900">
                          {selectedPhoto.title}
                        </p>
                        <p className="text-gray-600 text-left mb-4">
                          {selectedPhoto.description}
                        </p>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleDownload(selectedPhoto)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                          >
                            <FaDownload className="mr-2" /> Unduh
                          </button>
                          <button
                            onClick={() => handleShare(selectedPhoto.image_url)}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                          >
                            <FaShareAlt className="mr-2" /> Bagikan
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="items-center justify-center mt-10 lg:mt-0">
                      <p className="mb-2 font-bold text-2xl sm:text-center lg:text-left uppercase">
                        Foto yang terkait
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredPhotosSelected.map((photo, index) => (
                          <div
                            key={index}
                            className="relative"
                            onClick={() => openModal(photo)}
                          >
                            <div className="rounded-lg w-full h-full overflow-hidden">
                              <img
                                className="h-auto sm:h-44 md:h-52 max-w-full w-full object-cover rounded-lg cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105"
                                src={`${apiDatabaseUrl}/api/uploads/images/${photo.image_url}`}
                                alt={photo.title}
                                crossOrigin="anonymous"
                              />
                              <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-75 p-2 rounded-md text-center">
                                <p className="text-sm font-bold">{photo.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!selectedPhoto && (
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
                  <div className="flex mb-5 space-x-4">
                    {user && (
                      <>
                        <button
                          onClick={() => setModalAddPhoto(true)}
                          className="flex items-center justify-center bg-gray-500 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                        >
                          <FaPlus className="mr-2" /> Tambah Foto
                        </button>
                        {!isEditMode && (
                          <>
                            <button
                              onClick={() => setIsDeleteMode(!isDeleteMode)}
                              className="flex items-center justify-center bg-red-500 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-red-600 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                            >
                              <FaTrash className="mr-2" /> {isDeleteMode ? 'Batalkan Hapus' : 'Hapus'}
                            </button>
                            {isDeleteMode && selectedPhotos.length > 0 && (
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
                            {isEditMode && selectedEditPhoto && (
                              <button
                                onClick={() => setModalEditPhoto(true)}
                                className="flex items-center justify-center bg-primary-400 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-primary-500 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg"
                              >
                                <FaEdit className="mr-2" /> Ubah
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="-m-1 flex flex-wrap">
                    {groupedPhotos.map((group, index) => (
                      <div key={index} className="flex flex-wrap w-full md:w-1/2">
                        {group.map((photo, photoIndex) => (
                          <div
                            key={photoIndex}
                            className={`relative overflow-hidden ${isDeleteMode || isEditMode ? 'cursor-pointer' : ''} ${photoIndex === 0 ? 'w-full' : 'w-1/2'} p-1 md:p-2`}
                            onClick={() => {
                              if (isDeleteMode) {
                                handleSelectPhoto(photo);
                              } else if(isEditMode) {
                                handleSelectEditPhoto(photo.id);
                              } else {
                                openModal(photo);
                              }
                            }}
                          >
                            <div className="rounded-lg block h-full w-full overflow-hidden">
                              <img
                                alt="gallery"
                                className={`block h-full w-full object-cover object-center cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105 ${isDeleteMode || isEditMode ? 'opacity-50 pointer-events-none' : ''}`}
                                src={`${apiDatabaseUrl}/api/uploads/images/${photo.image_url}`}
                                crossOrigin="anonymous"
                              />
                              {isDeleteMode && (
                                <input
                                  type="checkbox"
                                  checked={selectedPhotos.some((item) => item.id === photo.id)}
                                  onChange={() => handleSelectPhoto(photo)}
                                  className="absolute top-4 right-4"
                                />
                              )}
                              {isEditMode && (
                                <input
                                  type="radio"
                                  checked={selectedEditPhoto === photo.id}
                                  onChange={() => setSelectedEditPhoto(photo.id)}
                                  className="absolute top-4 right-4"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
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
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {modalAddPhoto && (
        <ModalAddPhoto isOpen={modalAddPhoto} closeModal={() => setModalAddPhoto(false)} toast={toast} onLoadPhoto={() => {
          axios
            .get(`${apiDatabaseUrl}/api/gallery/photos/list`)
            .then((response) => setPhotos(response.data))
            .catch((error) => console.error('Error fetching news:', error));
        }}/>
      )}
      {isDeleteConfirmationOpenMultiple && (
        <ModalDeleteConfirmationMultiple 
          isOpen={isDeleteConfirmationOpenMultiple} 
          closeModal={() => setIsDeleteConfirmationOpenMultiple(false)} 
          totalSelectedPhoto={selectedPhotos.length} 
          selectedPhotos={selectedPhotos}
          toast={toast}
          setPhotos={setPhotos}
          setSelectedPhotos={setSelectedPhotos}
          setIsDeleteMode={setIsDeleteMode}
          setIsDeleteConfirmationOpenMultiple={setIsDeleteConfirmationOpenMultiple}
        />
      )}
      {isDeleteConfirmationOpenSingle && (
        <ModalDeleteConfirmationSingle 
          isOpen={isDeleteConfirmationOpenSingle} 
          closeModal={() => setIsDeleteConfirmationOpenSingle(false)} 
          selectedPhoto={selectedPhoto}
          selectedPhotos={selectedPhotos}
          toast={toast}
          setPhotos={setPhotos}
          setSelectedPhoto={setSelectedPhoto}
          setIsDeleteConfirmationOpenSingle={setIsDeleteConfirmationOpenSingle}
        />
      )}
      {modalEditPhoto && (
        <ModalEditPhoto isOpen={modalEditPhoto} closeModal={() => setModalEditPhoto(false)} toast={toast} selectedPhotoId={selectedEditPhoto} refreshPhoto={() => {
          axios
            .get(`${apiDatabaseUrl}/api/gallery/photos/list`)
            .then((response) => { setPhotos(response.data); setIsEditMode(false); })
            .catch((error) => console.error('Error fetching news:', error));
        }}/>
      )}
      <Toaster richColors position='bottom-right'/>
    </div>
  );
};

export default GaleryPhotoSection;
