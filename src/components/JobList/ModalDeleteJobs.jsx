import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, Transition, DialogTitle, DialogPanel } from '@headlessui/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const ModalDeleteJobs = ({ setOpen, open, selectedJobsId, setJobs, toast }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if(user) {
        const confirmDelete = async () => {
            if(!selectedJobsId) return navigate('/job-list');
            setLoadingSubmit(true);

            try {
                const response = await axios.delete(`${apiDatabaseUrl}/api/jobs/delete/${selectedJobsId}`);
                            
                if (response.status === 200) {
                    setJobs(jobs => jobs.filter((job) => job.id !== selectedJobsId));
                    setOpen(false);
                    toast.success('Pekerjaan berhasil dihapus');
                }
            } catch (err) {
                console.error('Error deleting photo:', err);
                setOpen(false);
                toast.error('Terjadi kesalahan saat menghapus Pekerjaan');
            } finally {
                setLoadingSubmit(false);
            }

            axios.delete(`${apiDatabaseUrl}/api/jobs/delete/${selectedJobsId}`)
                .then(() => {
                    if (window.location.pathname.includes(`/job-detail/${selectedJobsId}`)) {
                        navigate("/job-list");
                    } else if (window.location.pathname.includes("/job-list")) {
                        axios.get(`${apiDatabaseUrl}/api/jobs`)
                            .then(response => {
                                setJobs(response.data);
                            })
                            .catch(error => console.error('Error fetching news:', error));
                    }
                })
                .catch(error => console.error('Error deleting news:', error));
            setOpen(false);
        };
    
    
        return(
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
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

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                        <div className="flex items-center justify-center">
                            <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
                        </div>
                        <DialogTitle
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Konfirmasi Hapus
                        </DialogTitle>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                            Apakah Kamu yakin ingin menghapus pekerjaan ini?
                            </p>
                        </div>

                        <div className="flex justify-center space-x-2 mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                                onClick={confirmDelete}
                            >
                                {loadingSubmit ? (
                                    <div className="flex flex-col justify-center items-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                                            viewBox="0 0 24 24"
                                        ></svg>
                                    </div>
                                ) : (
                                    'Iya, hapus'
                                )}
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                                onClick={() => setOpen(false)}
                            >
                            Tidak
                            </button>
                        </div>
                        </DialogPanel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        )
    } else {
        return navigate('/unauthorized');
    }
}

ModalDeleteJobs.propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedJobsId: PropTypes.string.isRequired,
    setJobs: PropTypes.func.isRequired,
    toast: PropTypes.func.isRequired
};

export default ModalDeleteJobs;