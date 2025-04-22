import { useState } from "react";
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const RegistrationStaff = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [imageProfile, setImageProfile] = useState("");
    const [photoPreview, setPhotoPreview] = useState("");
    const [photoError, setPhotoError] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const apiBackEndURL = import.meta.env.VITE_API_DATABASE;

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (file && validImageTypes.includes(file.type)) {
            if (file.size > 1024 * 1024) {
                setPhotoPreview('');
                setPhotoError('Ukuran file maksimal 1 MB');
            } else {
                setPhotoPreview(URL.createObjectURL(file));
                setImageProfile(file);
                setPhotoError('');
            }
        } else {
            setPhotoPreview('');
            setPhotoError('Mohon pilih foto dengan format file (JPG, JPEG, PNG)');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadingSubmit(true);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('full_name', fullName);
        formData.append('role', role);
        formData.append('image_profile', imageProfile);

        let result;

        try {
            const res = await axios.post(`${apiBackEndURL}/api/auth/registerAccount` , formData, { 
                headers: { 'Content-Type': 'multipart/form-data' } 
            });
            
            result = res.data;
            
            toast.success(result.message);

            setEmail("");
            setPassword("");
            setFullName("");
            setRole("");
            setImageProfile("");
            setPhotoPreview("");
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat mendaftar";
            toast.error(errorMessage);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="bg-white py-20 sm:py-18 relative z-10">
            <div className="mx-auto max-w-7xl px-6 items-center justify-center lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl lg:text-center">
                <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
                    Menambahkan Akun Baru
                </p>
                </div>
                <div className="max-w-3xl mx-auto px-4 py-1 bg-white shadow-lg rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-md font-semibold text-gray-800 mb-4">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Contoh: ahmadirfanxx28@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="namaLengkap" className="text-md font-semibold text-gray-800 mb-4">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: Ahmad Irfan Ma'ruf Maulana"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="namaLengkap" className="text-md font-semibold text-gray-800 mb-4">
                                Role
                            </label>
                            <select name={role} onChange={(e) => setRole(e.target.value)} className='w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500' required>
                                <option value="">Pilih Role</option>
                                <option value="Staff">Staff</option>
                                <option role="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="relative flex flex-col">
                            <label htmlFor="namaLengkap" className="text-md font-semibold text-gray-800 mb-4">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="*********"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 bottom-7 right-0 px-3 text-gray-700 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                            <button type="button" onClick={() => setPassword("SKA9988")} className="rounded-md bg-primary-400 hover:bg-primary-500 text-white p-3 mt-5 duration-300 trasnition ease-in-out">
                                Password Bawaan
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="image" className="text-md font-semibold text-gray-800 mb-4">
                                Gambar Profile
                            </label>
                            {photoError && (
                                <div className="bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2" role="alert">
                                <strong className="font-bold">File tidak Valid! </strong>
                                <span className="block sm:inline">{photoError}</span>
                                <button
                                    type="button"
                                    onClick={() => setPhotoError('')}
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
                                id="image"
                                onChange={handlePhotoChange}
                                type="file"
                                accept="image/*"
                                className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <button
                        type="submit"
                        disabled={loadingSubmit}
                        className="w-full py-2.5 px-5 text-center text-sm font-medium text-white bg-primary-secondary-800 rounded-lg hover:bg-primary-secondary-900 transition duration-400 ease-in-out"
                    >
                        {loadingSubmit ? (
                        <div className="flex flex-col justify-center items-center">
                            <svg
                            className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                            viewBox="0 0 24 24"
                            ></svg>
                        </div>
                        ) : (
                        'Tambah Akun'
                        )}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            <Toaster richColors position='bottom-right'/>
        </div>
    );
}

export default RegistrationStaff;
