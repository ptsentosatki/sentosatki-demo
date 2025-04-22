import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition, DialogTitle, DialogPanel } from '@headlessui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ModalEditPhoto = ({ isOpen, closeModal, toast, selectedPhotoId, refreshPhoto }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

    useEffect(() => {
        axios.get(`${apiDatabaseUrl}/api/gallery/photos/${selectedPhotoId}`)
        .then((response) => { 
            const data = response.data;
            setTitle(data.title);
            setCategory(data.category);
            setDescription(data.description);
            setImagePreview(`${apiDatabaseUrl}/api/uploads/images/${data.image_url}`);
        })
        .catch((error) => console.error('Error fetching photo:', error));
    }, [apiDatabaseUrl, selectedPhotoId])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    if(user) {        
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoadingSubmit(true);
    
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            if(image) {
                formData.append('image', image);
            }
    
            try {
                await axios.put(`${apiDatabaseUrl}/api/gallery/photos/edit/${selectedPhotoId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });
                closeModal();
                toast.success('Foto berhasil diubah!');
                refreshPhoto();
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                toast.error('Gagal mengubah foto. Silakan coba lagi.');
            } finally {
                setLoadingSubmit(false);
            }
        };
    
        return (
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
                    </Transition.Child>
    
                    <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-lg md:max-w-xl lg:max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Tambahkan Foto Baru
                                </DialogTitle>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Judul</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                        <textarea
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Gambar</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 p-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                        {imagePreview && (
                                            <div className="mt-2 flex justify-center">
                                                <img
                                                    src={imagePreview}
                                                    alt="Image preview"
                                                    className="max-w-xs max-h-48 object-cover rounded-lg"
                                                    crossOrigin='anonymous'
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <button
                                            type="submit"
                                            disabled={loadingSubmit}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-400 border border-transparent rounded-md hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 transition duration-400 ease-in-out"
                                        >
                                            {loadingSubmit ? (
                                                <div className="flex flex-col justify-center items-center">
                                                    <svg
                                                        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                                                        viewBox="0 0 24 24"
                                                    ></svg>
                                                </div>
                                            ) : (
                                                'Ubah Foto'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="inline-flex justify-center px-4 py-2 ml-5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 transition duration-400 ease-in-out"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        );
    } else {
        return navigate('/unauthorized');
    }
};

ModalEditPhoto.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    toast: PropTypes.func.isRequired,
    refreshPhoto: PropTypes.func.isRequired,
    selectedPhotoId: PropTypes.number.isRequired
};

export default ModalEditPhoto;
