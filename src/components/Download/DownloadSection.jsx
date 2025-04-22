import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const TABLE_HEAD = ['No', 'Nama', 'Size', 'Tipe', 'Tanggal Input', 'Aksi'];
const TABLE_ROWS = [
  {
    name: 'Contoh Surat Pernyataan Izin Keluarga',
    size: '34.5 KB',
    type: 'DOC',
    date: '2024-07-22',
    link: '/src/assets/1597801327.doc',
  },
  {
    name: 'UU Nomor 18 Tahun 2017 Tentang Perlindungan PMI',
    size: '4.126 KB',
    type: 'PDF',
    date: '2024-07-22',
    link: '/src/assets/1591408315.pdf',
  },
  {
    name: 'Formulir Pendaftaran PMI PT. SENTOSAKARYA ADITAMA',
    size: '1.937 KB',
    type: 'IMAGE',
    date: '2024-07-22',
    link: '/src/assets/1586295929.jpg',
  },
];

const DownloadSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState(TABLE_ROWS);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      setFilteredRows(TABLE_ROWS);
    } else {
      const filtered = TABLE_ROWS.filter((row) =>
        row.name.toLowerCase().includes(query),
      );
      setFilteredRows(filtered);
    }
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
    <div className="bg-white py-20 sm:py-18 relative z-10">
      <div className="mx-auto max-w-7xl items-center justify-center">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
            File yang dapat di download
          </p>
        </div>
        <div className="container mx-auto p-4 mt-8">
          <div className="mb-4 flex flex-col justify-center gap-4 md:flex-row md:items-center">
            <div className="flex w-full md:w-1/3">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-2 border rounded-l-md focus:outline-none"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-gray-200">
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="p-4 text-left text-gray-600">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={index} className="border-b text-left">
                    <td className="p-4 text-gray-700">{index + 1}</td>
                    <td className="p-4 text-gray-700">{row.name}</td>
                    <td className="p-4 text-gray-700">{row.size}</td>
                    <td className="p-4 text-gray-700">{row.type}</td>
                    <td className="p-4 text-gray-700">
                      {formatDate(row.date)}
                    </td>
                    <td className="p-4 text-gray-700">
                      <a
                        href={row.link}
                        download
                        className="flex items-center text-primary-secondary-800 hover:underline"
                      >
                        <FaDownload className="mr-2" /> Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
