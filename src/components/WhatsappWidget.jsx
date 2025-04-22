import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { IoChatboxEllipses } from 'react-icons/io5';

const WhatsappWidget = () => {
  const [clicked, setClicked] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleAutoClick = () => {
      setClicked(true);
      setAutoOpened(true);
    };

    const startTimer = () => {
      timerRef.current = setTimeout(handleAutoClick, 30000);
    };

    startTimer();

    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (clicked && autoOpened) {
      const autoClose = () => {
        setClicked(false);
        setAutoOpened(false);
      };

      timerRef.current = setTimeout(autoClose, 10000);

      return () => clearTimeout(timerRef.current);
    }
  }, [clicked, autoOpened]);

  const handleManualClick = () => {
    setClicked((prev) => !prev);
    setAutoOpened(false);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col md:flex-row items-end md:items-center space-x-2">
      <div
        className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white cursor-pointer`}
        onClick={handleManualClick}
      >
        {clicked ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaWhatsapp className="text-4xl" />
        )}
      </div>
      {clicked && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg w-80">
          <div className="bg-green-500 p-4 rounded-t-lg flex items-center">
            <FaWhatsapp className="text-6xl text-gray-100 mr-2" />
            <div className="text-left">
              <p className="text-gray-100 font-semibold">Silahkan tanya Kami</p>
              <p className="text-gray-200 text-sm">
                Hai! klik tombol dibawah untuk mengobrol di WhatsApp
              </p>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center justify-between p-2 rounded-lg transition-colors border-l-4 border-green-500">
              <div className="flex items-center space-x-2">
                <FaWhatsapp className="w-6 h-6 text-green-500" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800 text-sm">
                    PT. SENTOSAKARYA ADITAMA
                  </p>
                  <p className="text-sm text-gray-500 text-sm">Admin</p>
                </div>
              </div>
            </div>
            <a
              className="relative inline-flex items-center justify-center w-full p-2 mt-4 rounded-lg bg-green-500 shadow-lg text-white hover:bg-green-600"
              href="https://api.whatsapp.com/send/?phone=+62%20822-9898-3076&text=Halo+Saya+ingin+menanyakan+lebih+lanjut+tentang+Penempatan+Pekerja+Migran+ke+Luar+Negeri+%E2%9C%88"
              target="_blank"
            >
              <span className="mr-2">Hubungi Admin Kami</span>
              <IoChatboxEllipses className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappWidget;
