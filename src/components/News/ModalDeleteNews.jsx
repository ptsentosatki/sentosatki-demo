import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth';

const ModalDeleteNews = ({ setOpen, open, selectedNewsId, setPosts }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

    if(user) {
        const confirmDelete = () => {
            axios.delete(`${apiDatabaseUrl}/api/news/delete/${selectedNewsId}`)
                .then(() => {
                    if (window.location.pathname.includes(`/berita/${selectedNewsId}`)) {
                        navigate("/berita");
                    } else if (window.location.pathname.includes("/berita")) {
                        axios.get(`${apiDatabaseUrl}/api/news/list`)
                            .then(response => {
                                setPosts(response.data);
                            })
                            .catch(error => console.error('Error fetching news:', error));
                    }
                })
                .catch(error => console.error('Error deleting news:', error));
            setOpen(false);
        };
    
    
        return(
            <Dialog open={open} onClose={setOpen} className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center px-4">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Konfirmasi Hapus Berita
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Apakah kamu yakin ingin menghapus berita ini ?
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Hapus
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Tidak
                            </button>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
        )
    } else {
        return navigate('/unauthorized');
    }
}

ModalDeleteNews.propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedNewsId: PropTypes.string.isRequired,
    setPosts: PropTypes.func.isRequired,
};

export default ModalDeleteNews;