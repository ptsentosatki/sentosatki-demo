import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition, DialogTitle, DialogPanel } from '@headlessui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ModalAddVideos = ({ isOpen, closeModal, toast, refreshVideos }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

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

    if(user) {
        const handleVideoChange = (e) => {
            const file = e.target.files[0];
            if(file) {
                if(videoPreview) {
                    URL.revokeObjectURL(videoPreview);
                }
                setVideo(file);
            
                const videoURL = URL.createObjectURL(file);
                setVideoPreview(videoURL);
            }
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoadingSubmit(true);
    
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('video', video);
    
            await axios.post(`${apiDatabaseUrl}/api/gallery/videos/add`, formData).then(() => {
                closeModal();
                toast.success('Video berhasil ditambahkan!');
                setLoadingSubmit(false);
                refreshVideos();
            }).catch((error) => {
                console.error('Error:', error);
                toast.error('Gagal menambahkan video. Silakan coba lagi.');
                setLoadingSubmit(false);
            });
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
                                    Tambahkan Video Baru
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
                                        <label className="block text-sm font-medium text-gray-700">Video</label>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            className="mt-1 p-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                            onChange={handleVideoChange}
                                            required
                                        />
                                        {videoPreview && (
                                            <div className="mt-2 flex justify-center">
                                                <video
                                                    key={videoPreview}
                                                    controls
                                                    autoPlay
                                                    className="w-full h-auto max-w-md max-h-72 object-contain rounded-lg"
                                                >
                                                    <source src={videoPreview} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
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
                                                'Tambah Video'
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

ModalAddVideos.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    toast: PropTypes.func.isRequired,
    refreshVideos: PropTypes.func.isRequired,
};

export default ModalAddVideos;
