import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMinusCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

const EditJobSection = () => {
    const [jobData, setJobData] = useState({
        negara: "",
        sektor: "",
        nama: "",
        tipe: "",
        jumlahPekerjaLakiLaki: "",
        jumlahPekerjaWanita: "",
        kontrakPeriode: "",
        gaji: ""
    });
    
    const [details, setDetails] = useState({
        jenis_kelamin: "",
        umur: "",
        tinggi_badan: "",
        berat_badan: "",
        fisik: "",
        pendidikan_terakhir: "",
        status_pernikahan: "",
        sertifikat_vaksin: "",
        pengalaman_bekerja: "",
        jumlah_jam_kerja: "",
        lembur: "",
        makanan_akomodasi: "",
        asuransi: "",
    });
    const location = useLocation();
    const [tasks, setTasks] = useState([""]);
    const [documents, setDocuments] = useState([""]);
    const navigate = useNavigate();
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

    useEffect(() => {
        if(!location.state || !location.state.jobId) {
            return navigate('/job-list');
        }

        const fetchJob = async () => {
            try {
                const response = await axios.get(`${apiDatabaseUrl}/api/jobs/${location.state.jobId}`);
                let cleanSalary = response.data.gaji.replace(/[^\d]/g, ''); 
                let getCurrency = response.data.gaji.replace(/[\s\d.]/g, '');
                setJobData({
                    ...response.data,
                    gaji: cleanSalary ? cleanSalary : 0,
                });

                setDetails({
                    jenis_kelamin: response.data.requirements.gender,
                    umur: response.data.requirements.age,
                    tinggi_badan: response.data.requirements.height,
                    berat_badan: response.data.requirements.weight,
                    fisik: response.data.requirements.physical,
                    pendidikan_terakhir: response.data.requirements.lastEducation,
                    status_pernikahan: response.data.requirements.marriageStatus,
                    sertifikat_vaksin: response.data.requirements.vaccineCertificate,
                    pengalaman_bekerja: response.data.requirements.workExperience,
                    jumlah_jam_kerja: response.data.workingConditions.jumlahJamKerja,
                    lembur: response.data.workingConditions.overTime,
                    makanan_akomodasi: response.data.workingConditions.mealsAndAccommodation,
                    asuransi: response.data.workingConditions.insurance
                });

                setImagePreview(`${apiDatabaseUrl}/api/uploads/images/${response.data.gambar}`);
                setSelectedCurrency(getCurrency);
                setTasks(response.data.tasks.map(taskObj => taskObj.task));
                setDocuments(response.data.documentRequirements.map(docObj => docObj.document));
            } catch (error) {
                console.error('Error fetching jobs detail:', error);
                return navigate('/job-list');
            }
        }

        fetchJob();
    }, [apiDatabaseUrl, location.state, navigate]);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    const currencyMap = {
        SG$: 'SGD',
        RM: 'MYR',
        HK$: 'HKD',
        KRW: 'KRW',
        NT$: 'TWD',
        YEN: 'YEN',
        USD: 'USD'
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setImage(file);
        }
    };
        

    const handleJobChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleDetailChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleTaskChange = (index, value) => {
        const newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks);
    };

    const handleDocumentChange = (index, value) => {
        const newDocuments = [...documents];
        newDocuments[index] = value;
        setDocuments(newDocuments);
    };

    const addTaskField = () => setTasks([...tasks, ""]);

    const removeTaskField = (index) => {
        if (tasks.length > 1) {
            const newTasks = tasks.filter((_, i) => i !== index);
            setTasks(newTasks);
        }
    };

    const addDocumentField = () => setDocuments([...documents, ""]);

    const removeDocumentField = (index) => {
        if (documents.length > 1) {
            const newDocuments = documents.filter((_, i) => i !== index);
            setDocuments(newDocuments);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);

        const formData = new FormData();

        formData.append("negara", jobData.negara);
        formData.append("sektor", jobData.sektor);
        formData.append("nama", jobData.nama);
        formData.append("tipe", jobData.tipe);
        formData.append("jumlahPekerjaLakiLaki", jobData.jumlahPekerjaLakiLaki);
        formData.append("jumlahPekerjaWanita", jobData.jumlahPekerjaWanita);
        formData.append("kontrakPeriode", jobData.kontrakPeriode);
        formData.append("gaji", `${selectedCurrency} ${jobData.gaji}`);
        formData.append("details", JSON.stringify(details));
        formData.append("tasks", JSON.stringify(tasks));
        formData.append("documents", JSON.stringify(documents));
        if (image) formData.append("image", image);

        try {
            await axios.put(`${apiDatabaseUrl}/api/jobs/update/${location.state.jobId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            navigate('/job-list');
        } catch (error) { 
            console.error('Error:', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="bg-white py-20 sm:py-18 relative z-10">
            <div className="mx-auto max-w-7xl px-6 items-center justify-center lg:px-8">
            <div className="mx-auto mb-10 max-w-2xl lg:text-center">
                <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
                    Memperbarui Pekerjaan {jobData.nama}
                </p>
            </div>
            <div className="max-w-8xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Negara Penempatan</label>
                        <input type="text" name="negara" value={jobData.negara} onChange={handleJobChange} placeholder='Contoh: Korea Selatan'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                        
                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Sektor</label>
                        <select name="sektor" value={jobData.sektor} onChange={handleJobChange} className="w-full px-3 py-3 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required>
                            <option value="">Pilih Sektor</option>
                            <option value="formal">Formal</option>
                            <option value="informal">Informal</option>
                        </select>

                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Nama Pekerjaan</label>
                        <input type="text" name="nama" value={jobData.nama} onChange={handleJobChange} placeholder='Contoh: Welder 3G/4G'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div>
                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Kontrak Periode</label>
                        <input type="text" name="kontrakPeriode" value={jobData.kontrakPeriode} placeholder='Contoh: 3 Tahun'
                            onChange={handleJobChange} className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />

                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Gaji</label>
                        <div className="flex">
                            <select 
                                name="currency" 
                                value={selectedCurrency} 
                                onChange={(e) => setSelectedCurrency(e.target.value)} 
                                className="px-3 py-2 bg-gray-100 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                {Object.keys(currencyMap).map((symbol) => (
                                    <option key={symbol} value={symbol}>{symbol}</option>
                                ))}
                            </select>
                            <input type="number" name="gaji" value={jobData.gaji} onChange={handleJobChange} placeholder='Contoh: 27.470'
                                className="w-full px-3 py-2 text-gray-800 bg-gray-100 rounded-r border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500" required />
                        </div>

                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left mt-3">Gambar</label>
                        <input type="file" name="gambar" accept="image/*" onChange={handleImageChange}
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded-md" />}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Deskripsi</label>
                        <textarea name="tipe" value={jobData.tipe} onChange={handleJobChange} placeholder='Contoh: Welder 3G/4G adalah seorang profesional yang bertanggung jawab untuk merakit potongan-potongan logam atau memperbaiki kerusakan pada komponen dengan menggunakan mesin berat yang mengeluarkan panas tinggi, melelehkan logam menjadi bentuk tertentu.'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Jumlah Pekerja Laki - Laki</label>
                        <input type="number" name="jumlahPekerjaLakiLaki" value={jobData.jumlahPekerjaLakiLaki} placeholder='Contoh: 100'
                            onChange={handleJobChange} className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-md font-semibold text-gray-800 mb-3 text-left">Jumlah Pekerja Wanita</label>
                        <input type="number" name="jumlahPekerjaWanita" value={jobData.jumlahPekerjaWanita} placeholder='Contoh: 0'
                            onChange={handleJobChange} className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div>
                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Jenis Kelamin</label>
                        <select name="jenis_kelamin" value={details.jenis_kelamin} onChange={handleDetailChange} className="w-full px-3 py-3 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required>
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="pria">Laki-Laki</option>
                            <option value="wanita">Perempuan</option>
                            <option value="campur">Laki-Laki dan Perempuan</option>
                        </select>

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Usia</label>
                        <input type="text" name="umur" value={details.umur} onChange={handleDetailChange} placeholder='Contoh: 21-47 Tahun'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Tinggi Badan</label>
                        <input type="text" name="tinggi_badan" value={details.tinggi_badan} onChange={handleDetailChange} placeholder='Contoh: 160cm ke atas'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div>
                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Fisik</label>
                        <input type="text" name="fisik" value={details.fisik} onChange={handleDetailChange} placeholder='Contoh: Sehat Jasmani & Rohani'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Pendidikan Terakhir</label>
                        <input type="text" name="pendidikan_terakhir" value={details.pendidikan_terakhir} onChange={handleDetailChange} placeholder='Minimal SLTP'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Berat Badan</label>
                        <input type="text" name="berat_badan" value={details.berat_badan} onChange={handleDetailChange} placeholder='Contoh: 55kg'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div>
                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Status Pernikahan</label>
                        <select name="status_pernikahan" value={details.status_pernikahan} onChange={handleDetailChange} className="w-full px-3 py-3 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required>
                            <option value="">Pilih Status Pernikahan</option>
                            <option value="kawin">Kawin</option>
                            <option value="belum kawin">Belum Kawin</option>
                            <option value="cerai hidup">Cerai Hidup</option>
                            <option value="cerai mati">Cerai Mati</option>
                            <option value="tidak ditentukan">Tidak Ditentukan</option>
                        </select>

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Sertifikat Vaksin</label>
                        <input type="text" name="sertifikat_vaksin" value={details.sertifikat_vaksin} onChange={handleDetailChange} placeholder='Contoh: Memiliki 2 kali Sertifikasi Vaksin'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Pengalaman Bekerja</label>
                        <input type="text" name="pengalaman_bekerja" value={details.pengalaman_bekerja} onChange={handleDetailChange} placeholder='Contoh: Memiliki pengalaman di pekerjaan Welder 3G/4G'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div>
                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Jumlah Jam Kerja</label>
                        <input type="text" name="jumlah_jam_kerja" value={details.jumlah_jam_kerja} onChange={handleDetailChange} placeholder='Contoh: 8 jam/hari'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Lembur</label>
                        <input type="text" name="lembur" value={details.lembur} onChange={handleDetailChange} placeholder='Contoh: Rata-Rata 1-2 jam/hari (Sesuai peraturan Welder 3G/4G)'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />

                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Makanan dan Akomodasi</label>
                        <input type="text" name="makanan_akomodasi" value={details.makanan_akomodasi} onChange={handleDetailChange} placeholder='Contoh: Sesuai peraturan Pemerintahaan Korea Selatan'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div className='col-span-1 md:col-span-2'>
                        <label className='block text-md font-semibold text-gray-800 mb-3 text-left'>Asuransi</label>
                        <input type="text" name="asuransi" value={details.asuransi} onChange={handleDetailChange} placeholder='Contoh: Sesuai peraturan Pemerintahan Korea Selatan'
                            className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3" required />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h3 className="block text-md font-semibold text-gray-800 mb-3 text-left">Tugas Pekerjaan</h3>
                        {tasks.map((task, index) => (
                            <div key={index} className="flex gap-2">
                            <input type="text" value={task} onChange={(e) => handleTaskChange(index, e.target.value)} placeholder='Contoh: Mengoperasikan dan memelihara peralatan pengelasan yang ditugaskan'
                                className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3 flex-1" required />
                            {tasks.length > 1 && (
                                <button type="button" onClick={() => removeTaskField(index)}
                                className="text-red-600 hover:text-red-700 transition duration-300 ease-in-out">
                                    <FaMinusCircle size={20} />
                                </button>
                            )}
                            </div>
                        ))}
                        <button type="button" onClick={addTaskField} className="btn-add px-4 py-2 font-medium text-white bg-primary-secondary-800 border border-transparent rounded-md hover:bg-primary-secondary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-secondary-800 transition duration-400 ease-in-out">Tambah Kolum Tugas</button>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h3 className="block text-md font-semibold text-gray-800 mb-3 text-left">Dokumen Pekerjaan</h3>
                        {documents.map((document, index) => (
                            <div key={index} className="flex gap-2">
                            <input type="text" value={document} onChange={(e) => handleDocumentChange(index, e.target.value)} placeholder='Contoh: E-KTP'
                                className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3 flex-1" required />
                            {documents.length > 1 && (
                                <button type="button" onClick={() => removeDocumentField(index)}
                                className="text-red-600 hover:text-red-700 transition duration-300 ease-in-out">
                                    <FaMinusCircle size={20} />
                                </button>
                            )}
                            </div>
                        ))}
                        <button type="button" onClick={addDocumentField} className="btn-add px-4 py-2 font-medium text-white bg-primary-secondary-800 border border-transparent rounded-md hover:bg-primary-secondary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-secondary-800 transition duration-400 ease-in-out">Tambah Kolum Dokumen</button>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={loadingSubmit}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-400 border border-transparent rounded-md hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 transition duration-400 ease-in-out"
                        >
                            {loadingSubmit ? (
                                <div className="flex flex-col justify-center items-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                                        viewBox="0 0 24 24"
                                    ></svg>
                                </div>
                            ) : (
                                'Perbarui Pekerjaan'
                            )}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default EditJobSection;
