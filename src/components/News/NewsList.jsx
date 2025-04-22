import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Toaster, toast } from 'sonner';
import ModalEditNews from './ModalEditNews';
import ModalDeleteNews from './ModalDeleteNews';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TbCancel } from 'react-icons/tb';

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [selectedNewsId, setSelectedNewsId] = useState('');
  const itemsPerPage = 10;
  const [pageInput, setPageInput] = useState(1);
  const postsListRef = useRef(null);
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiDatabaseUrl}/api/news/list`);
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
        if(error.response.data.includes("Too many requests, please try again later.")) {
          toast.error('Terlalu banyak permintaan ke server, silahkan coba lagi nanti');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiDatabaseUrl]);

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

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

  const selectNews = (newsId) => {
    setSelectedNewsId(newsId);
  };

  const deleteSelectedNews = () => {
    setShowDeleteModal(true);
  };

  const editSelectedNews = () => {
    setShowEditModal(true);
  };

  const categories = [...new Set(posts.map((posts) => posts.category))];

  const filteredPosts = posts.filter((post) => {
    if (filterCategory && post.category !== filterCategory) {
      return false;
    }
    if (
      searchKeyword &&
      !post.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      !stripHtmlTags(post.content)
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (postsListRef.current) {
      postsListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentPage]);

  return (
    <div
      ref={postsListRef}
      className="bg-white py-20 px-5 md:px-4 sm:py-18 relative z-10"
    >
      <div className="mx-auto max-w-7xl items-center justify-center">
        <div className="lg:text-center">
          <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
            Daftar Berita dari Kami
          </p>
        </div>
        <div className="mt-10 flex flex-wrap sm:flex-wrap gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Cari Berita"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/5"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/5"
          >
            <option value="">Kategori (Semua)</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="max-w-md mx-auto bg-white mt-5 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col space-y-4 bg-gray-100 p-4 rounded-lg"
              >
                <div className="h-48 bg-gray-200 rounded-md"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          currentPosts.map((item) => (
            <div
              key={item.id}
              className="max-w-md mx-auto bg-white mt-5 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-7 md:mb-4 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {user && (
                <div className="flex justify-between items-center p-4 bg-gray-100">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      onChange={() => selectNews(item.id)}
                      checked={selectedNewsId === item.id}
                    />
                    <span className="uppercase text-start tracking-wide text-sm text-primary-400 font-semibold">
                      {item.title}
                    </span>
                  </div>
                  <div>
                    {selectedNewsId === item.id && (
                      <div className='flex flex-col md:flex-row'>
                        <button
                          onClick={editSelectedNews}
                          className="flex items-center bg-primary-400 hover:bg-primary-500 text-white px-3 py-1 rounded-md ml-2 mb-1 transition duration-300 ease-in-out"
                        >
                          <FaEdit className="mr-2" />  EDIT
                        </button>
                        <button
                          onClick={deleteSelectedNews}
                          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md ml-2 mb-1 transition duration-300 ease-in-out"
                        >
                          <FaTrash className="mr-2" />  DELETE
                        </button>
                        <button
                          onClick={() => setSelectedNewsId(null)} 
                          className="flex items-center bg-gray-500 hover:bg-gray-700 text-white  px-3 py-1 rounded-md ml-2 mb-1 transition duration-300 ease-in-out" 
                        >
                          <TbCancel className="mr-2" /> BATAL
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <Link to={`/berita/${item.id}`} className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-full w-full object-cover md:w-48 rounded-md"
                    src={`${apiDatabaseUrl}/api/uploads/images/${item.image}`}
                    alt={item.title}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-primary-400 font-semibold text-left">
                    {item.category} - {formatDate(item.date)}
                  </div>
                  <p className="block mt-1 text-lg leading-tight font-medium text-primary-secondary-800 text-left">
                    {item.title}
                  </p>
                  <p className="mt-2 text-gray-500 line-clamp-3 text-left">
                    {stripHtmlTags(item.content)}
                  </p>
                </div>
              </Link>
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

      {showDeleteModal && (
        <ModalDeleteNews
          setPosts={setPosts}
          selectedNewsId={selectedNewsId}
          setOpen={setShowDeleteModal}
          open={showDeleteModal}
        />
      )}

      {showEditModal && (
        <ModalEditNews
          selectedNewsId={selectedNewsId}
          isOpen={showEditModal}
          setOpen={setShowEditModal}
          onClose={() => setShowEditModal(false)}
          toast={toast}
          refreshNews={() => {
            axios
              .get(`${apiDatabaseUrl}/api/news/list`)
              .then((response) => response.data)
              .then((data) => setPosts(data))
              .catch((error) => console.error('Error fetching news:', error));
          }}
        />
      )}
      <Toaster richColors position='bottom-right'/>
    </div>
  );
};

export default NewsList;
