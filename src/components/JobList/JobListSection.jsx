import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaClock,
  FaPlus,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { TbCancel } from "react-icons/tb";
import { GrSettingsOption, GrUserWorker } from 'react-icons/gr';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';
import ModalDeleteJobs from './ModalDeleteJobs';
import { useAuth } from '../../hooks/useAuth';

const currencyMap = {
  SG$: 'SGD',
  RM: 'MYR',
  HK$: 'HKD',
  KRW: 'KRW',
  NT$: 'TWD',
  YEN: 'YEN',
  USD: 'USD'
};

const JobListSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [categorySector, setCategorySector] = useState('All');
  const [location, setLocation] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJobsId, setSelectedJobsId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingExchangeRates, setLoadingExchangeRates] = useState(true);
  const itemsPerPage = 10;
  const [pageInput, setPageInput] = useState(1);
  const jobListRef = useRef(null);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;
  const apiCurrencyConvertUrl = import.meta.env.VITE_API_CURRENCYCONVERT;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initialKeyword = searchParams.get('keyword') || '';
    const initialLocation = searchParams.get('location') || 'All';

    setKeyword(initialKeyword);
    setLocation(initialLocation);
  }, [searchParams]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${apiDatabaseUrl}/api/jobs`);
        setJobs(response.data);
        const uniqueLocations = [
          ...new Set(response.data.map((job) => job.negara)),
        ];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        if(error.response.data.includes("Too many requests, please try again later.")) {
          toast.error('Terlalu banyak permintaan ke server, silahkan coba lagi nanti');
        }
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, [apiDatabaseUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiCurrencyConvertUrl);
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoadingExchangeRates(false);
      }
    };

    fetchData();
  }, [apiCurrencyConvertUrl]);

  const isSalaryInRange = useCallback(
    (salaryString, filter) => {
      const [currency, amount] = salaryString.split(' ');
      const currencyCode = currencyMap[currency];
      const salaryAmount = parseFloat(amount.replace(/\D/g, ''));
      const exchangeRate = exchangeRates[currencyCode];

      if (!exchangeRate) return false;

      const convertedSalary = salaryAmount / exchangeRate;
      
      const [min, max] = parseSalaryFilter(filter);

      return convertedSalary >= min && convertedSalary <= max;
    },
    [exchangeRates],
  );

  const parseSalaryFilter = (filter) => {
    const regex = /Rp\. (\d+)-(\d+)jt/;
    const match = filter.match(regex);

    if (!match || match.length < 3) {
      return [0, 0];
    }

    const min = parseInt(match[1]) * 1000000;
    const max = parseInt(match[2]) * 1000000 + 999999;

    return [min, max];
  };

  useEffect(() => {
    setCurrentPage(1);
    const filtered = jobs.filter((job) => {
      const matchesKeyword =
        job.posisi.toLowerCase().includes(keyword.toLowerCase()) ||
        job.negara.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategorySector =
        categorySector === 'All' ||
        job.sektor.toLowerCase() === categorySector.toLowerCase();
      const matchesLocation =
        location === 'All' ||
        job.negara.toLowerCase().includes(location.toLowerCase());
      const matchesSalary =
        !salaryFilter || isSalaryInRange(job.gaji, salaryFilter);

      return (
        matchesKeyword &&
        matchesCategorySector &&
        matchesLocation &&
        matchesSalary
      );
    });

    setFilteredJobs(filtered);
  }, [keyword, categorySector, location, salaryFilter, jobs, isSalaryInRange]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleKeywordChange = (event) => setKeyword(event.target.value);
  const handleCategorySectorChange = (event) =>
    setCategorySector(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleSalaryFilterChange = (event) =>
    setSalaryFilter(event.target.value);

  const formatSalary = (amount) => {
    return amount.toLocaleString('id-ID');
  }

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
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

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const selectJobs = (jobsId) => {
    setSelectedJobsId(jobsId);
  };

  const deleteSelectedJobs = () => {
    setShowDeleteModal(true);
  };

  const editSelectedJobs = (jobId) => {
    navigate('/job-edit', { state: { jobId } })
  }

  useEffect(() => {
    if (jobListRef.current) {
      jobListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  return (
    <div className="bg-white py-20 sm:py-18 relative z-10">
      <div className="mx-auto max-w-7xl items-center justify-center ">
        <div className="container mx-auto p-4" ref={jobListRef}>
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
              Daftar Pekerjaan yang Terbuka
            </p>
          </div>

          {loadingJobs || loadingExchangeRates ? (
            <div className="mt-10 grid gap-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-md flex flex-col md:flex-row items-center animate-pulse"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                  <div className="ml-4 flex flex-col space-y-4 w-full">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-6 flex flex-wrap sm:flex-wrap gap-4 items-center justify-center">
                <input
                  type="text"
                  placeholder="Cari Pekerjaan / Lokasi"
                  value={keyword}
                  onChange={handleKeywordChange}
                  className="px-4 py-2 border rounded-md w-full md:w-1/5"
                />
                <select
                  value={categorySector}
                  onChange={handleCategorySectorChange}
                  className="px-4 py-2 border rounded-md w-full md:w-1/5"
                >
                  <option value="All">Sektor (Semua)</option>
                  <option value="Formal">Formal</option>
                  <option value="Informal">Informal</option>
                </select>

                <select
                  value={location}
                  onChange={handleLocationChange}
                  className="px-4 py-2 border rounded-md w-full md:w-1/5"
                >
                  <option value="All">Lokasi (Semua)</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>

                <select
                  value={salaryFilter}
                  onChange={handleSalaryFilterChange}
                  className="px-4 py-2 border rounded-md w-full md:w-1/5"
                >
                  <option value="">Gaji (Semua)</option>
                  <option value="Rp. 5-10jt">Rp. 5-10jt</option>
                  <option value="Rp. 11-20jt">Rp. 11-20jt</option>
                  <option value="Rp. 21-30jt">Rp. 21-30jt</option>
                  <option value="Rp. 31-40jt">Rp. 31-40jt</option>
                  <option value="Rp. 41-51jt">Rp. 41-50jt</option>
                </select>
              </div>

              <div className="mt-10 grid gap-4">
                {user && (
                  <NavLink
                    to="/job-add"
                    className='flex items-center justify-center bg-gray-500 text-white p-3 md:p-4 lg:p-5 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out text-xs md:text-base lg:text-lg'
                  >
                    <FaPlus className="mr-2" /> Tambah Pekerjaan
                  </NavLink>
                )}
                {currentJobs.map((job) => (
                  <div
                  key={job.id}
                  className="p-4 border rounded-lg shadow-md flex flex-col w-full"
                >
                  {user && (
                    <div className="mb-3 flex justify-between items-center bg-gray-100 p-3 rounded-md">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          onChange={() => selectJobs(job.id)}
                          checked={selectedJobsId === job.id}
                        />
                        <span className="uppercase tracking-wide text-sm text-primary-400 font-semibold">
                          {job.posisi}
                        </span>
                      </div>
                      <div>
                        {selectedJobsId === job.id && (
                          <div className='flex flex-col md:flex-row'>
                            <button
                              onClick={() => setSelectedJobsId(null)} 
                              className="flex items-center bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded-md ml-2 mb-1 transition duration-300 ease-in-out" 
                            >
                              <TbCancel className="mr-2" /> BATAL
                            </button>
                            <button
                              onClick={() => editSelectedJobs(selectedJobsId)}
                              className="flex items-center bg-primary-400 hover:bg-primary-500 text-white px-3 py-1 rounded-md ml-2 mb-1 transition duration-300 ease-in-out"
                            >
                              <FaEdit className="mr-2" /> EDIT
                            </button>
                            <button
                              onClick={deleteSelectedJobs}
                              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md ml-2 mb-1 transition duration-300 ease-in-out"
                            >
                              <FaTrash className="mr-2" /> DELETE
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
            
                  <div className="flex flex-col md:flex-row justify-between items-center w-full">
                    <div className="flex items-start space-x-4 text-left w-full md:w-3/4">
                      <img
                        src={`${apiDatabaseUrl}/api/uploads/images/${job.gambar}`}
                        alt={`${job.posisi} image`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h2 className="text-xl font-semibold mt-1 overflow-hidden text-ellipsis">{job.posisi}</h2>
                        <div className="flex flex-col lg:flex-row lg:space-x-4 md:mt-5">
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-primary-secondary-800" />
                            {job.negara}
                          </p>
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-gray-600">
                            <FaClock className="mr-2 text-primary-secondary-800" />
                            {job.kontrak}
                          </p>
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-gray-600 capitalize">
                            <GrSettingsOption className="mr-2 text-primary-secondary-800" />
                            {job.sektor}
                          </p>
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-gray-600">
                            <GrUserWorker className="mr-2 text-primary-secondary-800" />
                            {job.pekerja}
                          </p>
                          {exchangeRates &&
                            exchangeRates[currencyMap[job.gaji.split(' ')[0]]] && (
                              <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-gray-600">
                                <FaMoneyBillAlt className="mr-2 text-primary-secondary-800" />
                                {job.gaji.replace(/[\s\d.]/g, '')} {formatSalary(parseInt(job.gaji.replace(/\D/g, ''), 10))} ≈{' '}
                                {formatCurrency(
                                  parseFloat(job.gaji.split(' ')[1].replace(/\D/g, '')) /
                                    exchangeRates[currencyMap[job.gaji.split(' ')[0]]],
                                )}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
            
                    <div className="flex flex-col md:items-end w-full md:w-1/4">
                      <Link
                        to={`/job-detail/${job.id}`}
                        className="bg-primary-secondary-800 text-white px-4 py-2 rounded mb-2 hover:bg-primary-secondary-900 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Lihat Lebih Jelas
                      </Link>
                      <p className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-primary-secondary-800" />
                        Diposting {formatDate(job.tanggalPembuatan)}
                      </p>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </>
          )}

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
      </div>

      {showDeleteModal && (
        <ModalDeleteJobs
          setJobs={setJobs}
          selectedJobsId={selectedJobsId}
          setOpen={setShowDeleteModal}
          open={showDeleteModal}
          toast={toast}
        />
      )}
      <Toaster richColors position='bottom-right'/>
    </div>
  );
};

export default JobListSection;
