import { useEffect, useState } from 'react';
import LoginModal from '../components/Auth/LoginModal';
import RecoveryAccountSection from '../components/RecoveryaAccount/RecoveryAccountSection';

const HelpTopic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'PEMULIHAN AKUN - PT. SENTOSAKARYA ADITAMA';
  }, []);

  return (
    <div className="App">
      {/* Help Center */}
      <RecoveryAccountSection openModal={() => setIsModalOpen(true)} />

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

export default HelpTopic;
