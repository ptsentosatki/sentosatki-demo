import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/Auth/LoginModal';
import Footer from '../components/Footer';
import AddJobsSection from '../components/JobList/AddJobsSection';

const AddJobs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.title = 'TAMBAH PEKERJAAN - PT. SENTOSAKARYA ADITAMA';
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="App">
            {/* Navbar */}
            <header className="absolute inset-x-0 top-0 z-50">
            <Navbar openModal={openModal} />
            </header>

            {/* Tambah Berita Section */}
            <AddJobsSection />

            {/* Footer */}
            <div className="absolute inset-x-0 z-50">
                <Footer />
            </div>

            {isModalOpen && (
            <LoginModal closeModal={closeModal} isOpen={isModalOpen} />
            )}

            <div className="fixed bottom-0 left-0 p-4 z-50">
            <div
                id="google_translate_element"
                className="bg-white border border-gray-300 p-2 rounded-lg shadow-lg"
            ></div>
            </div>
        </div>
    );
};

export default AddJobs;
