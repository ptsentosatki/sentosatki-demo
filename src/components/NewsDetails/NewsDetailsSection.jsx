import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Blank from './Blank';
import SkeletonLoading from './SkeletonLoading';
import ModalDeleteNews from '../News/ModalDeleteNews';
import ModalEditNews from '../News/ModalEditNews';
import parse from 'html-react-parser';
import {
  FaFacebook,
  FaWhatsapp,
  FaTelegramPlane,
  FaCopy,
  FaTrash,
  FaEdit,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Toaster, toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';

const NewsDetailsSection = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

  const deleteSelectedNews = () => {
    setShowDeleteModal(true);
  };

  const editSelectedNews = () => {
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${apiDatabaseUrl}/api/news/${id}`);
        setArticle(response.data);

        const relatedResponse = await axios.get(`${apiDatabaseUrl}/api/news/list`);
        setRelatedArticles(relatedResponse.data.filter((art) => art.category === response.data.category && art.id !== parseInt(id)));

        const latestResponse = await axios.get(`${apiDatabaseUrl}/api/news/list`);
        setLatestArticles(latestResponse.data.filter((news) => news.id !== parseInt(id)));

        document.title = `${response.data.title.toUpperCase()} - PT. SENTOSAKARYA ADITAMA`;
      } catch (error) {
        console.error('Error fetching the article:', error);
        if(error.response.data.includes("Too many requests, please try again later.")) {
          toast.error('Terlalu banyak permintaan ke server, silahkan coba lagi nanti');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [apiDatabaseUrl, id]);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (!article) {
    return <Blank />;
  }

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.log('Terjadi kesalahan:', err);
      toast.error('Gagal menyalin tautan!');
    });
    toast.success('Berhasil menyalin tautan!');
  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const formattedDate = formatDate(article.date);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden my-20 p-4">
      <img
        className="w-full h-64 object-cover rounded-md mb-4"
        src={`${apiDatabaseUrl}/api/uploads/images/${article.image}`}
        alt={`${article.title} image`}
      />
      <div className="px-4 md:px-3 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1 md:pr-8 text-left">
          <div className="uppercase tracking-wide text-sm text-primary-400 font-semibold mb-2">
            {formattedDate} - {article.category}
          </div>
          <h1 className="text-2xl md:text-4xl leading-tight font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <div className="news-content text-left text-gray-600 leading-relaxed mb-8">
            {parse(article.content)}
          </div>
          {user && (
            <div className="flex flex-col space-y-2">
              <button
                className="flex items-center justify-center bg-primary-400 hover:bg-primary-500 text-white px-4 py-2 rounded-md transition duration-400 ease-in-out"
                onClick={editSelectedNews}
              >
                <FaEdit className="mr-2" />  EDIT
              </button>
              <button
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-400 ease-in-out"
                onClick={deleteSelectedNews}
              >
                <FaTrash className="mr-2" /> DELETE
              </button>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/4 flex flex-col items-end space-y-4">
          <div className="w-full text-left">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Bagikan</h2>
            <div className="flex justify-start space-x-3 py-1">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target='_blank'
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-400 ease-in-out"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=Berita%20dari%20PT.%20SENTOSAKARYA%20ADITAMA%20tentang%20${article.title}:%20${window.location.href}`}
                target='_blank'
                className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-400 ease-in-out"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://x.com/intent/post?text=Berita%20dari%20PT.%20SENTOSAKARYA%20ADITAMA%20tentang%20${article.title}&url=${window.location.href}`}
                target='_blank'
                className="p-2 rounded-full bg-black text-white hover:bg-gray-900 transition duration-400 ease-in-out"
              >
                <FaXTwitter />
              </a>
              <a
                href={`https://t.me/share/url?url=${window.location.href}`}
                target='_blank'
                className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition duration-400 ease-in-out"
              >
                <FaTelegramPlane />
              </a>
              <button
                onClick={() => copyToClipboard(window.location.href)}
                className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition duration-400 ease-in-out"
              >
                <FaCopy />
              </button>
            </div>
          </div>
          <div className="w-full text-left">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Berita Terkait
            </h2>
            <div className="space-y-4">
              {relatedArticles.slice(0, 3).map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-sm flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <img
                      src={`${apiDatabaseUrl}/api/uploads/images/${post.image}`}
                      className="rounded-md mb-2 aspect-video object-cover shadow-lg w-auto h-auto"
                      alt="Post Image"
                    />
                  </div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <p className="text-gray-500">{formatDate(post.date)}</p>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-primary-secondary-800">
                      <Link to={`/berita/${post.id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-600 overflow-hidden">
                      {stripHtmlTags(
                        post.content.replace(
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                          '',
                        ),
                      )}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="w-full text-left">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Berita Terbaru
            </h2>
            <div className="space-y-4">
              {latestArticles.slice(0, 3).map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-sm flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <img
                      src={`${apiDatabaseUrl}/api/uploads/images/${post.image}`}
                      className="rounded-md mb-2 aspect-video object-cover shadow-lg w-auto h-auto"
                      alt="Post Image"
                    />
                  </div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <p className="text-gray-500">{formatDate(post.date)}</p>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-primary-secondary-800">
                      <Link to={`/berita/${post.id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-600 overflow-hidden">
                      {stripHtmlTags(
                        post.content.replace(
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                          '',
                        ),
                      )}
                    </p>
                  </div>
                </article>
              ))}
              <div className="flex items-start justify-start">
                <Link
                  to="/berita"
                  className="group flex items-center gap-2 text-sm text-primary-secondary-800 font-semibold hover:-translate-x-1 transition duration-300 md:w-auto"
                >
                  Lihat Selengkapnya{' '}
                  <span
                    className="group-hover:translate-x-2 transition duration-300"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-center" />

      {showDeleteModal && (
        <ModalDeleteNews
          setPosts={setArticle}
          selectedNewsId={id}
          setOpen={setShowDeleteModal}
          open={showDeleteModal}
        />
      )}

      {showEditModal && (
        <ModalEditNews
          selectedNewsId={id}
          isOpen={showEditModal}
          setOpen={setShowEditModal}
          onClose={() => setShowEditModal(false)}
          toast={toast}
          refreshNews={() => {
            axios
              .get(`${apiDatabaseUrl}/api/news/${id}`)
              .then((response) => setArticle(response.data))
              .catch((error) => console.error('Error:', error));
          }}
        />
      )}
    </div>
  );
};

export default NewsDetailsSection;
