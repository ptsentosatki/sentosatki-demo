import { useEffect, useState } from 'react';
import LoginModal from '../components/Auth/LoginModal';
import ResetPasswordSection from '../components/Auth/ResetPassword';

const ResetPasswordPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
    document.title = 'RESET PASSWORD - PT. SENTOSAKARYA ADITAMA';
    }, []);

    return (
    <div className="App">
        {/* Help Center */}
        <ResetPasswordSection/>

        <div className="fixed bottom-0 left-0 p-4 z-50">
        <div
            id="google_translate_element"
            className="bg-white border border-gray-300 p-2 rounded-lg shadow-lg"
        ></div>
        </div>

        {isModalOpen && (
        <LoginModal
            closeModal={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
        />
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

export default ResetPasswordPage;
