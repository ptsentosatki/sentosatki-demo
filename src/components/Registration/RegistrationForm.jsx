import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const RegistrationForm = ({ handleCheckboxChange, isCheckboxChecked }) => {
  const [jobs, setJobs] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [isVillageDisabled, setIsVillageDisabled] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;
  const apiWilayahUrl = import.meta.env.VITE_API_WILAYAH;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiDatabaseUrl}/api/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiDatabaseUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiWilayahUrl}/provinces.json`);
        const data = response.data
          .map((prov) => ({
            province_id: prov.id,
            province_name: prov.name,
          }))
          .sort((a, b) => a.province_name.localeCompare(b.province_name));

        setProvinces(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiWilayahUrl]);

  const handleProvinceChange = async (province_id) => {
    if (!province_id) {
      setCities([]);
      setDistricts([]);
      setVillages([]);
      setIsVillageDisabled(true);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiWilayahUrl}/regencies/${province_id}.json`,
        );
        const data = response.data
          .map((city) => ({
            city_id: city.id,
            city_name: city.name,
          }))
          .sort((a, b) => a.city_name.localeCompare(b.city_name));

        setCities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setDistricts([]);
  };

  const handleCityChange = async (city_id) => {
    if (!city_id) {
      setDistricts([]);
      setVillages([]);
      setIsVillageDisabled(true);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiWilayahUrl}/districts/${city_id}.json`,
        );
        const data = response.data
          .map((district) => ({
            district_id: district.id,
            district_name: district.name,
          }))
          .sort((a, b) => a.district_name.localeCompare(b.district_name));

        setDistricts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setVillages([]);
    setIsVillageDisabled(true);
  };

  const handleDistrictChange = async (district_id) => {
    if (!district_id) {
      setVillages([]);
      setIsVillageDisabled(true);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiWilayahUrl}/villages/${district_id}.json`,
        );
        const data = response.data
          .map((village) => ({
            village_id: village.id,
            village_name: village.name,
          }))
          .sort((a, b) => a.village_name.localeCompare(b.village_name));

        setVillages(data);
        setIsVillageDisabled(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  };

  const toPascalCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?<=\s|^)\w/g, (match) => match.toUpperCase());
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file && validImageTypes.includes(file.type)) {
      if (file.size > 1024 * 1024) {
        setPhotoPreview('');
        setPhotoError('Ukuran file maksimal 1 MB');
        fileInputRef.current.value = '';
      } else {
        setPhotoPreview(URL.createObjectURL(file));
        setPhotoError('');
      }
    } else {
      setPhotoPreview('');
      setPhotoError('Mohon pilih foto dengan format file (JPG, JPEG, PNG)');
      fileInputRef.current.value = '';
    }
  };

  const handleClosePhotoError = () => {
    setPhotoError('');
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedSector('');
    setSelectedPosition('');
  };

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
    setSelectedPosition('');
  };

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const uniqueCountries = [...new Set(jobs.map((job) => job.negara))];
  const sectorsByCountry = jobs
    .filter((job) => job.negara === selectedCountry)
    .map((job) => capitalizeFirstLetter(job.sektor));
  const uniqueSectors = [...new Set(sectorsByCountry)];

  const positionsBySector = jobs
    .filter(
      (job) =>
        job.negara === selectedCountry && capitalizeFirstLetter(job.sektor) === selectedSector,
    )
    .map((job) => job.posisi);

  const years = [];
  const currentYear = new Date().getFullYear();
  const startYear = 1985;
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoadingSubmit(true);

    const formData = new FormData();

    formData.append('nik', form.elements['no_nik_tki'].value),
      formData.append('nama_lengkap', form.elements.nama_tki.value),
      formData.append('jenis_kelamin', form.elements.kelamin_tki.value),
      formData.append('agama', form.elements.agama_tki.value),
      formData.append('tempat_lahir', form.elements.tmplahir_tki.value),
      formData.append('tanggal_lahir', form.elements.tgllahir_tki.value),
      formData.append('tinggi_badan', form.elements.tgibdn_tki.value),
      formData.append('berat_badan', form.elements.brtbdn_tki.value),
      formData.append(
        'pendidikan_terakhir',
        form.elements.pendidikan_tki.value,
      ),
      formData.append('tahun_kelulusan', form.elements.luluss_tki.value),
      formData.append('status_kawin', form.elements.stskawin_tki.value),
      formData.append(
        'alamat_provinsi',
        form.elements.provinsi.options[form.elements.provinsi.selectedIndex]
          .text,
      ),
      formData.append(
        'alamat_kabupaten_kota',
        form.elements.kab_kota.options[form.elements.kab_kota.selectedIndex]
          .text,
      ),
      formData.append(
        'alamat_kecamatan',
        form.elements.kecamatan.options[form.elements.kecamatan.selectedIndex]
          .text,
      ),
      formData.append(
        'alamat_kelurahan',
        form.elements.alamatkeldes_tki.options[
          form.elements.alamatkeldes_tki.selectedIndex
        ].text,
      ),
      formData.append('alamat_rt', form.elements.rt.value),
      formData.append('alamat_rw', form.elements.rw.value),
      formData.append('alamat_singkat', form.elements.alamat_tki.value),
      formData.append('no_hp', form.elements.nohp_tki.value),
      formData.append('no_wa', form.elements.nohp_tki.value),
      formData.append('email', form.elements.email_tki.value),
      formData.append(
        'tujuan_daftar',
        form.elements.TJdaftar_tki.options[
          form.elements.TJdaftar_tki.selectedIndex
        ].text,
      ),
      formData.append(
        'tujuan_negara',
        form.elements.ntujuan_tki.options[
          form.elements.ntujuan_tki.selectedIndex
        ].text,
      ),
      formData.append(
        'sektor_tujuan',
        form.elements.sektor_tki.options[form.elements.sektor_tki.selectedIndex]
          .text,
      ),
      formData.append(
        'jabatan_pekerjaan',
        form.elements.jabatan_tki.options[
          form.elements.jabatan_tki.selectedIndex
        ].text,
      ),
      formData.append('pengalaman_kerja1_negara', form.elements.negara1.value),
      formData.append(
        'pengalaman_kerja1_nama_perusahaan',
        form.elements.nama_perusahaan1.value,
      ),
      formData.append(
        'pengalaman_kerja1_tahun_bekerja',
        form.elements.tahun_bekerja1.value,
      ),
      formData.append('pengalaman_kerja1_tugas', form.elements.keahlian1.value),
      formData.append(
        'pengalaman_kerja1_masa_kerja',
        form.elements.masa_kerja1.value,
      ),
      formData.append('nama_lpk', form.elements.nama_lpk_bnsp.value),
      formData.append('alamat_lpk', form.elements.alamat_lpk_bnsp.value),
      formData.append('no_sertifikat', form.elements.sertifikasi_bnsp.value),
      formData.append(
        'jenis_sertifikat',
        form.elements.jenis_sertifikasi_bnsp.value,
      ),
      formData.append('masa_berlaku', form.elements.masa_berlaku_bnsp.value),
      formData.append('tanggal_pengeluaran', form.elements.tgl_peng_bnsp.value),
      formData.append('tanggal_medikal', form.elements.tgl_medikal_mcu.value),
      formData.append('hasil_medikal', form.elements.hasil_medikal_mcu.value),
      formData.append('no_blanko', form.elements.no_blanko_mcu.value),
      formData.append('nama_rs', form.elements.nama_rs_klinik_mcu.value),
      formData.append(
        'username',
        `${form.elements.nama_tki.value.replace(' ', '').toUpperCase()}SENTOSATKI${new Date().getFullYear()}`,
      ),
      formData.append(
        'password',
        `${form.elements.nama_tki.value.replace(' ', '').toUpperCase()}SENTOSATKI${new Date().getFullYear()}`,
      );
    if (form.elements.filetki.files.length > 0) {
      formData.append('filetki', form.elements.filetki.files[0]);
    }
    if (
      form.elements.negara2.value &&
      form.elements.nama_perusahaan2.value &&
      form.elements.tahun_bekerja2.value &&
      form.elements.keahlian2.value &&
      form.elements.masaKerja2.value
    ) {
      formData.append('pengalaman_kerja2_negara', form.elements.negara2.value),
        formData.append(
          'pengalaman_kerja2_nama_perusahaan',
          form.elements.nama_perusahaan2.value,
        ),
        formData.append(
          'pengalaman_kerja2_tahun_bekerja',
          form.elements.tahun_bekerja2.value,
        ),
        formData.append(
          'pengalaman_kerja2_tugas',
          form.elements.keahlian2.value,
        ),
        formData.append(
          'pengalaman_kerja2_masa_kerja',
          form.elements.masaKerja2.value,
        );
    } else {
      formData.append('pengalaman_kerja2_negara', ''),
        formData.append('pengalaman_kerja2_nama_perusahaan', ''),
        formData.append('pengalaman_kerja2_tahun_bekerja', ''),
        formData.append('pengalaman_kerja2_tugas', ''),
        formData.append('pengalaman_kerja2_masa_kerja', '');
    }
    if (
      form.elements.negara3.value &&
      form.elements.nama_perusahaan3.value &&
      form.elements.tahun_bekerja3.value &&
      form.elements.keahlian3.value &&
      form.elements.masaKerja3.value
    ) {
      formData.append('pengalaman_kerja3_negara', form.elements.negara3.value),
        formData.append(
          'pengalaman_kerja3_nama_perusahaan',
          form.elements.nama_perusahaan3.value,
        ),
        formData.append(
          'pengalaman_kerja3_tahun_bekerja',
          form.elements.tahun_bekerja3.value,
        ),
        formData.append(
          'pengalaman_kerja3_tugas',
          form.elements.keahlian3.value,
        ),
        formData.append(
          'pengalaman_kerja3_masa_kerja',
          form.elements.masaKerja3.value,
        );
    } else {
      formData.append('pengalaman_kerja3_negara', ''),
        formData.append('pengalaman_kerja3_nama_perusahaan', ''),
        formData.append('pengalaman_kerja3_tahun_bekerja', ''),
        formData.append('pengalaman_kerja3_tugas', ''),
        formData.append('pengalaman_kerja3_masa_kerja', '');
    }
    if (
      form.elements.negara4.value &&
      form.elements.nama_perusahaan4.value &&
      form.elements.tahun_bekerja4.value &&
      form.elements.keahlian4.value &&
      form.elements.masaKerja4.value
    ) {
      formData.append('pengalaman_kerja4_negara', form.elements.negara4.value),
        formData.append(
          'pengalaman_kerja4_nama_perusahaan',
          form.elements.nama_perusahaan4.value,
        ),
        formData.append(
          'pengalaman_kerja4_tahun_bekerja',
          form.elements.tahun_bekerja4.value,
        ),
        formData.append(
          'pengalaman_kerja4_tugas',
          form.elements.keahlian4.value,
        ),
        formData.append(
          'pengalaman_kerja4_masa_kerja',
          form.elements.masaKerja4.value,
        );
    } else {
      formData.append('pengalaman_kerja4_negara', ''),
        formData.append('pengalaman_kerja4_nama_perusahaan', ''),
        formData.append('pengalaman_kerja4_tahun_bekerja', ''),
        formData.append('pengalaman_kerja4_tugas', ''),
        formData.append('pengalaman_kerja4_masa_kerja', '');
    }
    if (
      form.elements.negara5.value &&
      form.elements.nama_perusahaan5.value &&
      form.elements.tahun_bekerja5.value &&
      form.elements.keahlian5.value &&
      form.elements.masaKerja5.value
    ) {
      formData.append('pengalaman_kerja5_negara', form.elements.negara5.value),
        formData.append(
          'pengalaman_kerja5_nama_perusahaan',
          form.elements.nama_perusahaan5.value,
        ),
        formData.append(
          'pengalaman_kerja5_tahun_bekerja',
          form.elements.tahun_bekerja5.value,
        ),
        formData.append(
          'pengalaman_kerja5_tugas',
          form.elements.keahlian5.value,
        ),
        formData.append(
          'pengalaman_kerja5_masa_kerja',
          form.elements.masaKerja5.value,
        );
    } else {
      formData.append('pengalaman_kerja5_negara', ''),
        formData.append('pengalaman_kerja5_nama_perusahaan', ''),
        formData.append('pengalaman_kerja5_tahun_bekerja', ''),
        formData.append('pengalaman_kerja5_tugas', ''),
        formData.append('pengalaman_kerja5_masa_kerja', '');
    }

    try {
      await axios.post(`${apiDatabaseUrl}/tambah-pekerja`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      form.reset();
      setPhotoPreview('');
      toast.success('Kamu berhasil mendaftar sebagai PMI!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('NIK sudah terdaftar, silahkan gunakan NIK lain!');
      } else {
        console.error('Terjadi kesalahan: ', error.message);
      }
    } finally {
      setLoadingSubmit(false);
    }

    // const formData = {
    //     nik: form.elements['no_nik_tki'].value,
    //     namaLengkap: form.elements.nama_tki.value,
    //     jenisKelamin: form.elements.kelamin_tki.value,
    //     agama: form.elements.agama_tki.value,
    //     tempatLahir: form.elements.tmplahir_tki.value,
    //     tanggalLahir: form.elements.tgllahir_tki.value,
    //     tinggiBadan: form.elements.tgibdn_tki.value,
    //     beratBadan: form.elements.brtbdn_tki.value,
    //     pendidikanTerakhir: form.elements.pendidikan_tki.value,
    //     tahunKelulusan: form.elements.luluss_tki.value,
    //     statusKawin: form.elements.stskawin_tki.value,
    //     alamat: {
    //         provinsi: form.elements.provinsi.options[form.elements.provinsi.selectedIndex].text,
    //         kabupatenKota: form.elements.kab_kota.options[form.elements.kab_kota.selectedIndex].text,
    //         kecamatan: form.elements.kecamatan.options[form.elements.kecamatan.selectedIndex].text,
    //         kelurahan: form.elements.alamatkeldes_tki.options[form.elements.alamatkeldes_tki.selectedIndex].text,
    //         rt: form.elements.rt.value,
    //         rw: form.elements.rw.value,
    //         alamatSingkat: form.elements.alamat_tki.value,
    //     },
    //     noHp: {
    //         noHp: form.elements.nohp_tki.value,
    //         noWa: form.elements.nohp_tki.value
    //     },
    //     email: form.elements.email_tki.value,
    //     tujuanDaftar: form.elements.TJdaftar_tki.options[form.elements.TJdaftar_tki.selectedIndex].text,
    //     tujuanNegaraSektorJabatan: {
    //         negaraTujuan: form.elements.ntujuan_tki.options[form.elements.ntujuan_tki.selectedIndex].text,
    //         sektorTujuan: form.elements.sektor_tki.options[form.elements.sektor_tki.selectedIndex].text,
    //         jabatanPekerjaan: form.elements.jabatan_tki.options[form.elements.jabatan_tki.selectedIndex].text,
    //     },
    //     pengalamanKerja1: {
    //         negara: form.elements.negara1.value,
    //         namaPerusahaan: form.elements.nama_perusahaan1.value,
    //         tahunBekerja: form.elements.tahun_bekerja1.value,
    //         tugasPekerjaan: form.elements.keahlian1.value,
    //         masaKerja: form.elements.masa_kerja1.value,
    //     },
    //     pengalamanKerja2: {
    //         negara: form.elements.negara2.value,
    //         namaPerusahaan: form.elements.nama_perusahaan2.value,
    //         tahunBekerja: form.elements.tahun_bekerja2.value,
    //         tugasPekerjaan: form.elements.keahlian2.value,
    //         masaKerja: form.elements.masa_kerja2.value,
    //     },
    //     pengalamanKerja3: {
    //         negara: form.elements.negara3.value,
    //         namaPerusahaan: form.elements.nama_perusahaan3.value,
    //         tahunBekerja: form.elements.tahun_bekerja3.value,
    //         tugasPekerjaan: form.elements.keahlian3.value,
    //         masaKerja: form.elements.masa_kerja3.value,
    //     },
    //     pengalamanKerja4: {
    //         negara: form.elements.negara4.value,
    //         namaPerusahaan: form.elements.nama_perusahaan4.value,
    //         tahunBekerja: form.elements.tahun_bekerja4.value,
    //         tugasPekerjaan: form.elements.keahlian4.value,
    //         masaKerja: form.elements.masa_kerja4.value,
    //     },
    //     pengalamanKerja5: {
    //         negara: form.elements.negara5.value,
    //         namaPerusahaan: form.elements.nama_perusahaan5.value,
    //         tahunBekerja: form.elements.tahun_bekerja5.value,
    //         tugasPekerjaan: form.elements.keahlian5.value,
    //         masaKerja: form.elements.masa_kerja5.value,
    //     },
    //     namaLPK: form.elements.nama_lpk_bnsp.value,
    //     alamatLPK: form.elements.alamat_lpk_bnsp.value,
    //     noSertifikat: form.elements.sertifikasi_bnsp.value,
    //     jenisSertifikat: form.elements.jenis_sertifikasi_bnsp.value,
    //     masaBerlaku: form.elements.masa_berlaku_bnsp.value,
    //     tanggalPengeluaran: form.elements.tgl_peng_bnsp.value,
    //     tanggalMedikal: form.elements.tgl_medikal_mcu.value,
    //     hasilMedika: form.elements.hasil_medikal_mcu.value,
    //     noBlanko: form.elements.no_blanko_mcu.value,
    //     namaRS: form.elements.nama_rs_klinik_mcu.value
    // };

    // console.log('Form submitted:', formData);
    // setLoadingSubmit(false);
  };

  return (
    <div className="bg-white py-20 sm:py-18 min-h-screen z-10">
      <div className="mx-auto items-center justify-center">
        <div className="container mx-auto p-4">
          <div className="mx-auto max-w-8xl lg:text-center">
            <p className="mt-5 mb-10 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
              Formulir Pendaftaran Calon PMI / TKI Online
            </p>
            <div className="relative flex-auto">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="no_nik_tki"
                    >
                      NIK / No. KTP{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="number"
                      id="no_nik_tki"
                      name="no_nik_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="NIK / No. KTP"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="nama_tki"
                    >
                      Nama Lengkap{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="text"
                      id="nama_tki"
                      name="nama_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nama Lengkap (Sesuai KTP / Passport)"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="kelamin_tki"
                  >
                    Jenis Kelamin <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <select
                    id="kelamin_tki"
                    name="kelamin_tki"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="LAKI-LAKI">Laki-Laki</option>
                    <option value="PEREMPUAN">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="agama_tki"
                  >
                    Agama <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <select
                    id="agama_tki"
                    name="agama_tki"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Agama</option>
                    <option value="ISLAM">Islam</option>
                    <option value="KRISTEN">Kristen</option>
                    <option value="KATHOLIK">Katholik</option>
                    <option value="HINDU">Hindu</option>
                    <option value="BUDHA">Buddha</option>
                    <option value="KHONG HUCU">Khong Hucu</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="tmplahir_tki"
                    >
                      Tempat Lahir{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="text"
                      id="tmplahir_tki"
                      name="tmplahir_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tempat Lahir (Sesuai KTP / Passport)"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="tgllahir_tki"
                    >
                      Tanggal Lahir{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="date"
                      id="tgllahir_tki"
                      name="tgllahir_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="tgibdn_tki"
                    >
                      Tinggi Badan{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="tgibdn_tki"
                      name="tgibdn_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Tinggi Badan</option>
                      <option value="146">146 cm</option>
                      <option value="147">147 cm</option>
                      <option value="148">148 cm</option>
                      <option value="149">149 cm</option>
                      <option value="150">150 cm</option>
                      <option value="151">151 cm</option>
                      <option value="152">152 cm</option>
                      <option value="153">153 cm</option>
                      <option value="154">154 cm</option>
                      <option value="155">155 cm</option>
                      <option value="156">156 cm</option>
                      <option value="157">157 cm</option>
                      <option value="158">158 cm</option>
                      <option value="159">159 cm</option>
                      <option value="160">160 cm</option>
                      <option value="161">161 cm</option>
                      <option value="162">162 cm</option>
                      <option value="163">163 cm</option>
                      <option value="164">164 cm</option>
                      <option value="165">165 cm</option>
                      <option value="166">166 cm</option>
                      <option value="167">167 cm</option>
                      <option value="168">168 cm</option>
                      <option value="169">169 cm</option>
                      <option value="170">170 cm</option>
                      <option value="171">171 cm</option>
                      <option value="172">172 cm</option>
                      <option value="173">173 cm</option>
                      <option value="174">174 cm</option>
                      <option value="175">175 cm</option>
                      <option value="176">176 cm</option>
                      <option value="177">177 cm</option>
                      <option value="178">178 cm</option>
                      <option value="179">179 cm</option>
                      <option value="180">180 cm</option>
                      <option value="181">181 cm</option>
                      <option value="182">182 cm</option>
                      <option value="183">183 cm</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="brtbdn_tki"
                    >
                      Berat Badan <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="brtbdn_tki"
                      name="brtbdn_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Berat Badan</option>
                      <option value="44">44 kg</option>
                      <option value="45">45 kg</option>
                      <option value="46">46 kg</option>
                      <option value="47">47 kg</option>
                      <option value="48">48 kg</option>
                      <option value="49">49 kg</option>
                      <option value="50">50 kg</option>
                      <option value="51">51 kg</option>
                      <option value="52">52 kg</option>
                      <option value="53">53 kg</option>
                      <option value="54">54 kg</option>
                      <option value="55">55 kg</option>
                      <option value="56">56 kg</option>
                      <option value="57">57 kg</option>
                      <option value="58">58 kg</option>
                      <option value="59">59 kg</option>
                      <option value="60">60 kg</option>
                      <option value="61">61 kg</option>
                      <option value="62">62 kg</option>
                      <option value="63">63 kg</option>
                      <option value="64">64 kg</option>
                      <option value="65">65 kg</option>
                      <option value="66">66 kg</option>
                      <option value="67">67 kg</option>
                      <option value="68">68 kg</option>
                      <option value="69">69 kg</option>
                      <option value="70">70 kg</option>
                      <option value="71">71 kg</option>
                      <option value="72">72 kg</option>
                      <option value="73">73 kg</option>
                      <option value="74">74 kg</option>
                      <option value="75">75 kg</option>
                      <option value="76">76 kg</option>
                      <option value="77">77 kg</option>
                      <option value="78">78 kg</option>
                      <option value="79">79 kg</option>
                      <option value="80">80 kg</option>
                      <option value="81">81 kg</option>
                      <option value="82">82 kg</option>
                      <option value="83">83 kg</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="pendidikan_tki"
                    >
                      Pendidikan Terakhir{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="pendidikan_tki"
                      name="pendidikan_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Pendidikan Terakhir</option>
                      <option value="SARJANA/SI">Sarjana/SI</option>
                      <option value="DIPLOMA III">Diplomasi III</option>
                      <option value="SLTA/SEDERAJAT">SLTA/Sederajat</option>
                      <option value="SLTP/SEDERAJAT">SLTP/Sederajat</option>
                      <option value="SD/SEDERAJAT">SD/Sederajat</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="luluss_tki"
                    >
                      Tahun Kelulusan{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="luluss_tki"
                      name="luluss_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Tahun Kelulusan</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="stskawin_tki"
                  >
                    Status Kawin <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <select
                    id="stskawin_tki"
                    name="stskawin_tki"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Status Kawin</option>
                    <option value="kawin">Kawin</option>
                    <option value="BELUM KAWIN">Belum Kawin</option>
                    <option value="CERAI HIDUP">Cerai Hidup</option>
                    <option value="CERAI MAIT">Cerai Mati</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="alamat_tki"
                    >
                      Alamat <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="provinsi"
                      name="provinsi"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      required
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map((prov) => (
                        <option key={prov.province_id} value={prov.province_id}>
                          {toPascalCase(prov.province_name)}
                        </option>
                      ))}
                    </select>
                    <select
                      id="kab_kota"
                      name="kab_kota"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => handleCityChange(e.target.value)}
                      required={cities.length > 0}
                      disabled={cities.length === 0}
                    >
                      <option value="">Pilih Kabupaten / Kota</option>
                      {cities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                          {toPascalCase(city.city_name)}
                        </option>
                      ))}
                    </select>
                    <select
                      id="kecamatan"
                      name="kecamatan"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      required={districts.length > 0}
                      disabled={districts.length === 0}
                    >
                      <option value="">Pilih Kecamatan</option>
                      {districts.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_id}
                        >
                          {toPascalCase(district.district_name)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full mt-0 sm:mt-auto">
                    <select
                      id="alamatkeldes_tki"
                      name="alamatkeldes_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={villages.length > 0}
                      disabled={isVillageDisabled}
                    >
                      <option value="">Pilih Kelurahan</option>
                      {villages.map((village) => (
                        <option
                          key={village.village_id}
                          value={village.village_name}
                        >
                          {toPascalCase(village.village_name)}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                      <input
                        type="number"
                        id="rt"
                        name="rt"
                        className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="RT"
                        required
                      />
                      <input
                        type="number"
                        id="rw"
                        name="rw"
                        className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="RW"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      id="alamat_tki"
                      name="alamat_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Alamat (Tanpa RT/RW, Kel/Desa)"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="nohp_tki"
                    >
                      No. Handphone{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="number"
                      id="nohp_tki"
                      name="nohp_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="No. Telp / Hp Orang Tua"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="nohp2_tki"
                    >
                      No. Whatsapp{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="number"
                      id="nohp2_tki"
                      name="nohp2_tki"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="No. Whatsapp Pribadi"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="email_tki"
                  >
                    Email <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <input
                    type="email"
                    id="email_tki"
                    name="email_tki"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="filetki"
                  >
                    Pas Foto (Ukuran File Maksimal 1 MB){' '}
                    <span className="text-red-600">*(Wajib)</span>
                  </label>
                  {photoError && (
                    <div
                      className="bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
                      role="alert"
                    >
                      <strong className="font-bold">File tidak Valid! </strong>
                      <span className="block sm:inline">{photoError}</span>
                      <button
                        type="button"
                        onClick={handleClosePhotoError}
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                      >
                        <svg
                          className="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    id="filetki"
                    name="filetki"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".jpg,.jpeg,.png"
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                    required
                  />
                  {photoPreview && (
                    <div className="mt-4 p-2 border border-gray-300 rounded-md flex justify-center">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="rounded-md"
                        style={{
                          maxWidth: '300px',
                          maxHeight: '400px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="TJdaftar_tki"
                  >
                    Tujuan Daftar <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <select
                    id="TJdaftar_tki"
                    name="TJdaftar_tki"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Tujuan Daftar</option>
                    <option value="BR0606240000">
                      BLK LN Tri Tunggal Mandiri
                    </option>
                    <option value="BR2802240000">
                      LPK LN Bimo Putra Sentosa (BPS)
                    </option>
                    <option value="BR2601240001">
                      LPK LN Bintang Jaya Mandiri (BJM)
                    </option>
                    <option value="BR2601240000">
                      LPK LN Dimas Pranata Lampung (DPL)
                    </option>
                    <option value="BR1302240000">
                      LPK LN Maris Gama Mulya
                    </option>
                    <option value="BR2601240002">
                      LPK LN Mentari Cahaya Buana (MCB)
                    </option>
                    <option value="BR1302240001">
                      LPK LN Tali Asih Lampung (TAL)
                    </option>
                    <option value="BR1206230001">SKA Cilacap</option>
                    <option value="BR1206230000">SKA Cirebon</option>
                    <option value="BR1206230003">SKA Lampung</option>
                    <option value="BR1406230000">SKA Makassar</option>
                    <option value="BR1206230004">SKA Pusat</option>
                    <option value="BR1206230002">SKA Subang</option>
                    <option value="BR0202240000">PT. Pal</option>
                  </select>
                </div>
                <h1 className="font-semibold text-center py-4 text-primary-secondary-800 uppercase">
                  Tujuan Negara, Sektor, dan Jabatan
                </h1>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="ntujuan_tki"
                    >
                      Negara Tujuan{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="ntujuan_tki"
                      name="ntujuan_tki"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      required
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Tujuan Negara</option>
                      {uniqueCountries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="sektor_tki"
                    >
                      Sektor <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="sektor_tki"
                      name="sektor_tki"
                      value={selectedSector}
                      onChange={handleSectorChange}
                      required={selectedCountry !== ''}
                      disabled={selectedCountry === ''}
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Sektor</option>
                      {uniqueSectors.map((sector, index) => (
                        <option key={index} value={sector}>
                          {sector}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="jabatan_tki"
                    >
                      Jabatan <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <select
                      id="jabatan_tki"
                      name="jabatan_tki"
                      value={selectedPosition}
                      onChange={handlePositionChange}
                      required={selectedSector !== ''}
                      disabled={selectedSector === ''}
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Jabatan</option>
                      {positionsBySector.map((position, index) => (
                        <option key={index} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <h1 className="font-semibold text-center py-4 text-primary-secondary-800 uppercase">
                  Pengalaman Kerja
                </h1>
                <div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="ntujuan_tki"
                    >
                      Pengalaman Kerja 1{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="text"
                      id="negara1"
                      name="negara1"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Negara"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <input
                      type="text"
                      id="nama_perusahaan1"
                      name="nama_perusahaan1"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nama Perusahaan"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      id="tahun_bekerja1"
                      name="tahun_bekerja1"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tahun Bekerja"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="keahlian1"
                      name="keahlian1"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tugas / Pekerjaan"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="masa_kerja1"
                      name="masa_kerja1"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masa Kerja"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="ntujuan_tki"
                    >
                      Pengalaman Kerja 2{' '}
                      <span className="text-gray-500">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      id="negara2"
                      name="negara2"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Negara"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <input
                      type="text"
                      id="nama_perusahaan2"
                      name="nama_perusahaan2"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nama Perusahaan"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      id="tahun_bekerja2"
                      name="tahun_bekerja2"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tahun Bekerja"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="keahlian2"
                      name="keahlian2"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tugas / Pekerjaan"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="masa_kerja2"
                      name="masa_kerja2"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masa Kerja"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="ntujuan_tki"
                    >
                      Pengalaman Kerja 3{' '}
                      <span className="text-gray-500">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      id="negara3"
                      name="negara3"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Negara"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <input
                      type="text"
                      id="nama_perusahaan3"
                      name="nama_perusahaan3"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nama Perusahaan"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      id="tahun_bekerja3"
                      name="tahun_bekerja3"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tahun Bekerja"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="keahlian3"
                      name="keahlian3"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tugas / Pekerjaan"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="masa_kerja3"
                      name="masa_kerja3"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masa Kerja"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="ntujuan_tki"
                    >
                      Pengalaman Kerja 4{' '}
                      <span className="text-gray-500">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      id="negara4"
                      name="negara4"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Negara"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <input
                      type="text"
                      id="nama_perusahaan4"
                      name="nama_perusahaan4"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nama Perusahaan"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      id="tahun_bekerja4"
                      name="tahun_bekerja4"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tahun Bekerja"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="keahlian4"
                      name="keahlian4"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tugas / Pekerjaan"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="masa_kerja4"
                      name="masa_kerja4"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masa Kerja"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="ntujuan_tki"
                    >
                      Pengalaman Kerja 5{' '}
                      <span className="text-gray-500">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      id="negara5"
                      name="negara5"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Negara"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <input
                      type="text"
                      id="nama_perusahaan5"
                      name="nama_perusahaan5"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nama Perusahaan"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      id="tahun_bekerja5"
                      name="tahun_bekerja5"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tahun Bekerja"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="keahlian5"
                      name="keahlian5"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tugas / Pekerjaan"
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="masa_kerja5"
                      name="masa_kerja5"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masa Kerja"
                    />
                  </div>
                </div>
                <div className="py-7">
                  <p className="text-md text-gray-700 mb-2">
                    Sesuai{' '}
                    <span className="font-semibold text-primary-secondary-800">
                      Undang-Undang Republik Indonesia Nomor 18 Tahun 2017,
                      Tanggal 22 November 2017
                    </span>
                    , Tentang Perlindungan Pekerja Migran Indonesia <br />
                    yaitu:
                  </p>
                  <p className="text-md text-gray-700 mb-2">
                    <span className="font-semibold text-primary-secondary-800">
                      BAB II Pasal 5 (b)
                    </span>
                    : Setiap Pekerja Migran Indonesia yang akan bekerja ke luar
                    negeri harus memenuhi persyaratan memiliki kompetensi.
                  </p>
                  <p className="text-md text-gray-700 mb-2">
                    Apakah Kamu telah memiliki{' '}
                    <span className="font-semibold text-primary-secondary-800">
                      Sertifikat BNSP
                    </span>
                    ?
                  </p>
                  <p className="text-md text-gray-700 mb-4">
                    Apabila belum memiliki, silakan daftarkan diri kamu melalui{' '}
                    <a
                      href="https://lpksentosa.com/home/daftarsiswa"
                      target="_blank"
                      className="text-primary-400 hover:underline"
                    >
                      link ini
                    </a>
                    , kami akan membantu Kamu.
                    <br />
                    Apabila telah memiliki SERTIFIKASI BNSP, silakan kolom di
                    bawah ini:
                  </p>
                </div>
                <h1 className="font-semibold text-center pb-2 text-primary-secondary-800 uppercase">
                  Biodata Sertifikat BNSP
                </h1>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="nama_lpk_bnsp"
                  >
                    Nama LPK <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <input
                    type="text"
                    id="nama_lpk_bnsp"
                    name="nama_lpk_bnsp"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama LPK"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="alamat_lpk_bnsp"
                  >
                    Alamat LPK <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <textarea
                    id="alamat_lpk_bnsp"
                    name="alamat_lpk_bnsp"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alamat LPK"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="sertifikasi_bnsp"
                    >
                      No. Sertifikasi BNSP{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="text"
                      id="sertifikasi_bnsp"
                      name="sertifikasi_bnsp"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="No. Sertifikasi BNSP"
                      required
                    />
                  </div>
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="jenis_sertifikasi_bnsp"
                    >
                      Jenis Sertifikasi{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="text"
                      id="jenis_sertifikasi_bnsp"
                      name="jenis_sertifikasi_bnsp"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Jenis Sertifikasi"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="masa_berlaku_bnsp"
                    >
                      Habis Masa Berlaku{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="date"
                      id="masa_berlaku_bnsp"
                      name="masa_berlaku_bnsp"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="tgl_peng_bnsp"
                  >
                    Tanggal Pengeluaran{' '}
                    <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <input
                    type="date"
                    id="tgl_peng_bnsp"
                    name="tgl_peng_bnsp"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></input>
                </div>
                <div className="py-7">
                  <p className="text-base text-gray-800">
                    <span className="font-semibold text-primary-secondary-800">
                      BAB II Pasal 5 (c)
                    </span>
                    : Setiap Pekerja Migran Indonesia yang akan bekerja ke luar
                    negeri harus memenuhi persyaratan kesehatan jasmani dan
                    rohani.
                    <br />
                    Apakah Kamu sudah melakukan pemeriksaan kesehatan (medikal
                    check-up)? Jika sudah, mohon kolom di bawah ini:
                  </p>
                </div>
                <h1 className="font-semibold text-center pb-2 text-primary-secondary-800 uppercase">
                  Biodata Medikal Check-up
                </h1>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="tgl_medikal_mcu"
                    >
                      Tanggal Medikal{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="date"
                      id="tgl_medikal_mcu"
                      name="tgl_medikal_mcu"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="w-full mb-4 sm:mb-0">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="hasil_medikal_mcu"
                    >
                      Hasil Medikal{' '}
                      <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="text"
                      id="hasil_medikal_mcu"
                      name="hasil_medikal_mcu"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Fit / Unfit"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-left text-gray-800 text-sm font-medium mb-2"
                      htmlFor="no_blanko_mcu"
                    >
                      No. Blanko <span className="text-red-600">*(Wajib)</span>
                    </label>
                    <input
                      type="text"
                      id="no_blanko_mcu"
                      name="no_blanko_mcu"
                      className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="No. Blanko"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-left text-gray-800 text-sm font-medium mb-2"
                    htmlFor="nama_rs_klinik_mcu"
                  >
                    Nama RS / Klinik{' '}
                    <span className="text-red-600">*(Wajib)</span>
                  </label>
                  <input
                    type="text"
                    id="nama_rs_klinik_mcu"
                    name="nama_rs_klinik_mcu"
                    className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama RS / Klinik"
                    required
                  />
                </div>
                {/*footer*/}
                <div className="py-4">
                  <div className="flex flex-col items-center justify-center p-6 border-t border-solid border-gray-300 rounded-b">
                    <label
                      htmlFor="invalidCheck"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="invalidCheck"
                        name="invalidCheck"
                        className="mr-2 cursor-pointer"
                        checked={isCheckboxChecked}
                        onChange={handleCheckboxChange}
                        required
                      />
                      <span className="text-base text-gray-800">
                        Saya setuju dengan{' '}
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={handleCheckboxChange}
                        >
                          Syarat dan Ketentuan{' '}
                          <span className="text-red-600">*</span>
                        </span>
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loadingSubmit}
                      className="mt-4 bg-primary-secondary-800 text-white active:bg-primary-secondary-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-primary-secondary-900 outline-none focus:outline-none"
                      style={{ transition: 'all .15s ease' }}
                    >
                      {loadingSubmit ? (
                        <div className="flex flex-col justify-center items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                            viewBox="0 0 24 24"
                          ></svg>
                        </div>
                      ) : (
                        'Daftar'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Toaster richColors position="top-center" />
        </div>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  isCheckboxChecked: PropTypes.bool.isRequired,
};

export default RegistrationForm;
