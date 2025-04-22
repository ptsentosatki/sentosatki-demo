import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaClock,
} from 'react-icons/fa';
import { GrSettingsOption, GrUserWorker } from 'react-icons/gr';

const currencyMap = {
  SG$: 'SGD',
  RM: 'MYR',
  HK$: 'HKD',
  KRW: 'KRW',
  NT$: 'TWD',
  YEN: 'YEN',
};

const JobListSection = () => {
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [categorySector, setCategorySector] = useState('All');
  const [location, setLocation] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingExchangeRates, setLoadingExchangeRates] = useState(true);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;
  const apiCurrencyConvertUrl = import.meta.env.VITE_API_CURRENCYCONVERT;

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

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const formatSalary = (amount) => {
    return amount.toLocaleString('id-ID');
  }

  return (
    <div className="bg-white relative z-10">
      <div className="mx-auto max-w-7xl items-center justify-center ">
        <div className="container mx-auto p-4">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="inline-block px-3 py-1 text-sm font-semibold tracking-wider text-primary-400 uppercase rounded-full bg-gray-100">
              DAFTAR PEKERJAAN
            </h2>
            <p className="mt-5 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
              DAFTAR PEKERJAAN YANG TERBUKA
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
                  <option value="Rp. 41-50jt">Rp. 41-50jt</option>
                </select>
              </div>

              <div className="mt-10 grid gap-4">
                {filteredJobs.slice(0, 5).map((job) => (
                  <div
                    key={job.id}
                    className="p-4 border rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center md:items-start"
                  >
                    <div className="w-full md:w-3/4 flex items-start space-x-4 text-left">
                      <img
                        src={`${apiDatabaseUrl}/api/uploads/images/${job.gambar}`}
                        alt={`${job.posisi} image`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h2 className="text-xl font-semibold mt-1">
                          {job.posisi}
                        </h2>
                        <div className="flex flex-col lg:flex-row lg:space-x-4 md:mt-5">
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-left text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-primary-secondary-800" />
                            {job.negara}
                          </p>
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-left text-gray-600">
                            <FaClock className="mr-2 text-primary-secondary-800" />
                            {job.kontrak}
                          </p>
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-left text-gray-600 capitalize">
                            <GrSettingsOption className="mr-2 text-primary-secondary-800" />
                            {job.sektor}
                          </p>
                          <p className="grid grid-cols-[auto,1fr] gap-1 items-center text-left text-gray-600">
                            <GrUserWorker className="mr-2 text-primary-secondary-800" />
                            {job.pekerja}
                          </p>
                          {exchangeRates &&
                            exchangeRates[
                              currencyMap[job.gaji.split(' ')[0]]
                            ] && (
                              <p className="grid grid-cols-[auto,1fr] gap-1 items-center mr-3 items-center text-gray-600">
                                <FaMoneyBillAlt className="mr-2 text-primary-secondary-800" />
                                {job.gaji.replace(/[\s\d.]/g, '')} {formatSalary(parseInt(job.gaji.replace(/\D/g, ''), 10))} ≈ {' '}
                                {formatCurrency(
                                  parseFloat(
                                    job.gaji.split(' ')[1].replace(/\D/g, ''),
                                  ) /
                                    exchangeRates[
                                      currencyMap[job.gaji.split(' ')[0]]
                                    ],
                                )}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col items-start md:items-end mt-4 md:mt-0">
                      <Link
                        to={`/job-detail/${job.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="bg-primary-secondary-800 text-white px-4 py-2 rounded mb-2 hover:bg-primary-secondary-900 transition duration-300 ease-in-out transform hover:scale-105 "
                      >
                        Lihat Lebih Jelas
                      </Link>
                      <p className="mt-1 flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-primary-secondary-800" />
                        Diposting {formatDate(job.tanggalPembuatan)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {filteredJobs.length > 5 && (
                <div className="flex justify-center mt-4">
                  <Link
                    to="/job-list"
                    className="bg-primary-secondary-800 text-white px-4 py-2 rounded hover:bg-primary-secondary-900"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Lihat selangkapnya
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListSection;
