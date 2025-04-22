import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LatestNews = () => {
  const [posts, setPosts] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiDatabaseUrl}/api/news/list`);
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoadingNews(false);
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

  return (
    <div className="bg-white py-14 sm:py-18 relative z-10">
      <div className="mx-auto max-w-7xl px-6 items-center justify-center md:px-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="inline-block px-3 py-1 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
            BERITA TERBARU
          </h2>
          <p className="mt-5 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            BERITA TERBARU KAMI
          </p>
        </div>
        {loadingNews ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-200 animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <img
                      src={`${apiDatabaseUrl}/api/uploads/images/${post.image}`}
                      className="rounded-xl mb-4 aspect-video object-cover shadow-lg w-full h-auto"
                      alt="Post Image"
                    />
                  </div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <p className="text-gray-500">{formatDate(post.date)}</p>
                    <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-primary-400 text-left hover:bg-gray-100">
                      {post.category}
                    </p>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg text-left font-semibold leading-6 text-gray-900 group-hover:text-primary-secondary-800">
                      <Link to={`/berita/${post.id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-left text-sm leading-6 text-gray-600">
                      {stripHtmlTags(post.content)}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      src={`${apiDatabaseUrl}/api/${post.author_image_url}`}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        {post.author_name}
                      </p>
                      <p className="text-gray-600 text-left">
                        {post.author_role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
              {posts.length > 2 && (
                <div className="flex max-w-xl flex-col items-start justify-between">
                  <Link
                    to="/berita"
                    className="group flex items-center gap-2 text-sm text-primary-secondary-800 font-semibold hover:-translate-x-1 transition duration-300 md:w-auto"
                  >
                    Baca selengkapnya{' '}
                    <span
                      className="group-hover:translate-x-2 transition duration-300"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
