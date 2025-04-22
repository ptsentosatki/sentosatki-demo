import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/Auth/LoginModal.jsx';
import Footer from '../components/Footer';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import RegistrationForm from '../components/Registration/RegistrationForm';
import WhatsappWidget from '../components/WhatsappWidget';

const Registration = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [modalAnimation, setModalAnimation] = useState('animate-fadeindown');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'REGISTRASI CALON PMI - PT. SENTOSAKARYA DITAMA';
  }, []);

  const openModalLogin = () => {
    setIsModalOpen(true);
  };

  const closeModalLogin = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setModalAnimation('animate-fadeindown');
    setModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setModalAnimation('animate-flyoutdown');
    setTimeout(() => {
      setModalOpen(false);
      document.body.classList.remove('modal-open');
    }, 600);
  };

  const handleAccept = () => {
    setIsCheckboxChecked(true);
    closeModal();
  };

  const handleDecline = () => {
    setIsCheckboxChecked(false);
    closeModal();
  };

  const handleCheckboxChange = () => {
    if (isCheckboxChecked) {
      setIsCheckboxChecked(false);
    } else {
      openModal();
    }
  };

  return (
    <div className="App">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar openModal={openModalLogin} />
      </header>

      {/* Form Registrasi */}
      <RegistrationForm
        isCheckboxChecked={isCheckboxChecked}
        handleCheckboxChange={handleCheckboxChange}
      />

      {/* Modal Syarat dan Ketentuan */}
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-start justify-center bg-gray-800 bg-opacity-50 overflow-y-auto"
      >
        <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />
        <DialogPanel
          className={`relative w-full max-w-2xl px-4 mt-4 bg-white rounded-lg shadow p-8 ${modalAnimation}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <DialogTitle className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Syarat dan Ketentuan
            </DialogTitle>
            <button
              type="button"
              className="p-1 ml-auto bg-transparent border-0 text-gray-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeModal}
            >
              <span className="bg-transparent text-gray-800 h-6 w-6 text-2xl block outline-none focus:outline-none hover:text-gray-900">
                ×
              </span>
            </button>
          </div>
          {/* Body */}
          <div className="p-6 space-y-6 border-t border-gray-300">
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-base leading-relaxed">
              <li>
                Telah mengisi data ini dengan benar untuk kepentingan Registrasi
                Sebagai Calon Tenaga Kerja Luar Negeri (Calon Pekerja Migran
                Indonesia).
              </li>
              <li>
                Menyetujui data saya dapat di Akses oleh Agency Resmi (P3MI)
                Perusahaan Penempatan Pekerja Migran Indonesia dan Agency di
                Luar Negeri (Negara Penempatan).
              </li>
              <li>Siap menunggu dan mengikuti proses lebih lanjut.</li>
            </ol>
          </div>
          {/* Footer */}
          <div className="flex justify-end space-x-2 mt-6 p-6 border-t border-gray-300 rounded-b">
            <button
              className="px-4 py-2 bg-primary-secondary-800 text-white rounded hover:bg-primary-secondary-900 focus:outline-none focus:bg-primary-secondary-900"
              onClick={handleAccept}
            >
              Terima
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
              onClick={handleDecline}
            >
              Tolak
            </button>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Footer */}
      <div className="relative w-full p-5">
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="rounded-2xl bg-primary-secondary-800 px-5 py-6 md:px-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="gap flex flex-col">
                <p className="text-3xl text-white font-bold">
                  Tertarik untuk bekerja diluar negeri?
                </p>
                <p className="text-xl text-white">
                  Perusahaan Terbaik Untuk Tenaga Kerja Migran Indonesia
                </p>
              </div>
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="w-full rounded-md bg-white px-6 py-4 text-center text-xl font-semibold text-primary-secondary-800 hover:opacity-90 md:w-auto"
                href="https://api.whatsapp.com/send/?phone=+62%20822-9898-3076&text=Halo+Saya+ingin+menanyakan+lebih+lanjut+tentang+Penempatan+Pekerja+Migran+ke+Luar+Negeri+%E2%9C%88"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 z-0">
        <Footer />
      </div>

      {isModalOpen && (
        <LoginModal closeModal={closeModalLogin} isOpen={isModalOpen} />
      )}

      <div className="fixed bottom-0 left-0 p-4 z-50">
        <div
          id="google_translate_element"
          className="bg-white border border-gray-300 p-2 rounded-lg shadow-lg"
        ></div>
      </div>

      <div className="fixed bottom-0 right-0 p-4 z-50">
        <WhatsappWidget />
      </div>
    </div>
  );
};

export default Registration;
