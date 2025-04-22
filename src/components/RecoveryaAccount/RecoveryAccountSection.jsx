import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMail } from 'react-icons/ai';
import { FaIdCard } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import LogoInstansi from '../../assets/logo-pt-sentosakarya-aditama.svg';
import { Toaster, toast } from 'sonner';

const RecoveryAccountSection = ({ openModal }) => {
  const [step, setStep] = useState(0);
  const [recoveryFor, setRecoveryFor] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(null);
  const [nik, setNik] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [resultEmail, setResultEmail] = useState('');
  const [resultUsername, setResultUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingSubmitEmail, setLoadingSubmitEmail] = useState(false);
  const [loadingSubmitIdentify, setLoadingSubmitIdentify] = useState(false);
  const [loadingSubmitOtp, setLoadingSubmitOtp] = useState(false);
  const [loadingResendOtp, setLoadingResendOtp] = useState(false);
  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;
  const handleEmailChange = async (e) => {
    const value = e.target.value;
    setEmail(value);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrorMessage('');
      try {
        const response = await axios.post(
          `${apiDatabaseUrl}/check-verification-email`,
          { email },
        );

        if (response.data.exists) setErrorMessage('');
      } catch (error) {
        return setErrorMessage('Terjadi kesalahan saat memproses permintaan.');
      }
    }
  };

  const handleEmailRecovery = async (e) => {
    e.preventDefault();
    setLoadingSubmitEmail(true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Email tidak valid.');
      setLoadingSubmitEmail(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiDatabaseUrl}/check-verification-email`,
        { email },
      );

      if (
        response.data.exists === 'Staff' ||
        response.data.exists === 'Pekerja'
      ) {
        await axios.post(`${apiDatabaseUrl}/send-verification-email`, {
          email,
        });
        setStep(2);
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response.data.error === 'Email not found') {
        return setErrorMessage('Email belum terdaftar');
      }
      setErrorMessage('Terjadi kesalahan saat memproses permintaan Kamu.');
      console.error(error);
    } finally {
      setLoadingSubmitEmail(false);
    }
  };

  const handleIdentityVerification = async(e) => {
    e.preventDefault();
    setLoadingSubmitIdentify(true);

    try {
      const response = await axios.post(`${apiDatabaseUrl}/verify-identify`, {
        no_nik: nik,
        nama_lengkap: fullName,
        tanggal_lahir: selectedDateOfBirth,
      });

      if(response.data) {
        setResultEmail(response.data.email);
        setResultUsername(response.data.username);
        setRecoveryFor("CheckEmailUsername");
        setStep(2);
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
    } else {
        setErrorMessage('Terjadi kesalahan saat memproses permintaan.');
        return console.error(error);
    }
    } finally {
      setLoadingSubmitIdentify(false);
    }
  }

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = otp.map((d, idx) => (idx === index ? element.value : d));
    setOtp(newOtp);

    if (element.value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    if (!element.value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
        // Move to previous input if Backspace is pressed and current input is empty
        document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setLoadingSubmitOtp(true);

    try {
      const otpCode = otp.join('');
      const response = await axios.post(`${apiDatabaseUrl}/verify-email-code`, {
        email,
        otpCode,
      });
      if (response.data) setStep(3);
      else setErrorMessage('Kode OTP Salah');
    } catch (error) {
      if (error.response.data.error.match('Invalid verification code')) {
        setErrorMessage('Kode OTP salah, mohon cek kembali');
      } else if (error.response.data.error.match('OTP code has expired')) {
        setErrorMessage('Kode OTP sudah kedaluwarsa');
      } else {
        setErrorMessage('Terjadi kesalahan saat memproses permintaan Kamu.');
        console.error(error);
      }
    } finally {
      setLoadingSubmitOtp(false);
    }
  };

  const resetCodeOtp = async (e) => {
    e.preventDefault();
    setLoadingResendOtp(true);

    try {
      await axios.post(`${apiDatabaseUrl}/send-verification-email`, { email });
    } catch (error) {
      setErrorMessage('Terjadi kesalahan saat memproses permintaan Kamu.');
      console.error(error);
    } finally {
      setLoadingResendOtp(false);
    }
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault(e);
    if (newPassword !== confirmNewPassword) {
      setErrorMessage(
        'Password baru tidak sama dengan konfirmasi password baru',
      );
      setLoadingChangePassword(false);
      return;
    }

    setLoadingChangePassword(true);
    try {
      await axios.post(`${apiDatabaseUrl}/change-password`, {
        email,
        newPassword,
        confirmNewPassword,
      });
      setErrorMessage('');
      setEmail('');
      setNewPassword('');
      setConfirmNewPassword('');
      setRecoveryFor('');
      setStep(0);
      toast.success('Berhasil mengganti password!');
    } catch (error) {
      setErrorMessage('Terjadi kesalahan saat memproses permintaan Kamu.');
      console.error(error);
    } finally {
      setLoadingChangePassword(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
      <header className="w-full flex justify-center mb-6">
        <Link to="/">
          <img
            src={LogoInstansi}
            alt="LOGO PT. SENTOSAKARYA ADITAMA"
            className="max-w-xs"
            height="54"
          />
        </Link>
      </header>
      <Toaster richColors position="top-center" />
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-lg md:max-w-md p-6 space-y-6">
        {recoveryFor === '' && step === 0 && (
          <>
            <h2 className="text-center text-2xl font-semibold mb-3">
              Pemulihan Akun
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Jika Kamu memiliki kendala masuk ke Akun, silahkan pilih opsi
              pemulihan akun di bawah.
            </p>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-400">
                    Ganti Password
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setRecoveryFor('ChangePassword');
                  setStep(1);
                }}
                className="flex items-center gap-2 p-4 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition duration-400 ease-in-out"
              >
                <AiOutlineMail size={24} />
                <span className='text-left ml-2'>Melalui Email</span>
              </button>
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-400">
                    Cek Email dan Username
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setRecoveryFor('CheckEmailUsername');
                  setStep(1);
                }}
                className="flex items-center gap-2 p-4 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition duration-400 ease-in-out"
              >
                <FaIdCard size={24} />
                <span className='text-left ml-2'>Melalui Verifikasi Identitas (Pekerja)</span>
              </button>
            </div>
            <button
              onClick={openModal}
              className="mt-6 font-semibold text-center text-primary-400 hover:text-primary-500 transition duration-400 ease-in-out"
            >
              Kembali ke bagian Login
            </button>
            <hr className="bg-grey-100 border-grey-100" />
            <Link
              to="/"
              className="block mt-2 font-semibold text-center text-gray-500 hover:text-gray-600 transition duration-400 ease-in-out"
            >
              Kembali ke halaman Beranda
            </Link>
            <Link
              to="/bantuan/akun"
              className="block font-semibold text-center text-gray-500 hover:text-gray-600 transition duration-400 ease-in-out"
            >
              Bantuan tentang Akun
            </Link>
          </>
        )}
        {/* {step === 1 && (
          // Phone Verification Step
          <>
          
            <h2 className="text-center text-2xl font-semibold mb-6">Verifikasi Nomor Handphone</h2>
            <input
              type="text"
              placeholder="Masukkan nomor handphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button onClick={handlePhoneRecovery} className="w-full p-2 bg-blue-600 text-white rounded">
              Kirim Kode OTP
            </button>
            {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
            <button onClick={() => setStep(0)} className="mt-6 text-center text-blue-600">Kembali</button>
          </>
        )} */}
        {recoveryFor === 'ChangePassword' && step === 1 && (
          // Email Verification Step
          <form onSubmit={handleEmailRecovery} className="relative">
            <button
              type="button"
              onClick={() => {
                setRecoveryFor('');
                setStep(0);
              }}
              className="absolute top-1 left-0 ml-2 text-gray-500 flex items-center"
            >
              <IoArrowBack size={24} />
            </button>
            <h2 className="text-center text-2xl font-semibold mb-3">
              Ganti Password
            </h2>
            <p className="text-center text-sm mb-6 text-gray-500">
              Kami akan mengirimkan kode verifikasi OTP ke email aktif Kamu yang
              terdaftar
            </p>
            {errorMessage && (
              <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
            )}
            <input
              type="email"
              placeholder="Contoh: nama@gmail.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border rounded mb-4 outline-none focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-gray-100"
            />
            <button
              type="submit"
              className="w-full mb-6 p-2 bg-primary-400 hover:bg-primary-500 text-white rounded-md transition duration-400 ease-in-out"
            >
              {loadingSubmitEmail ? (
                <div className="flex flex-col justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                </div>
              ) : (
                'Lanjutkan'
              )}
            </button>
            <Link
              to="/bantuan/akun"
              className="block font-semibold text-center text-gray-500 hover:text-gray-600 transition duration-400 ease-in-out"
            >
              Bantuan tentang Akun
            </Link>
          </form>
        )}
        {recoveryFor === 'CheckEmailUsername' && step === 1 && (
          // Identity Verification Step
          <form onSubmit={handleIdentityVerification} className="relative">
            <button
              onClick={() => {
                setRecoveryFor('');
                setStep(0);
              }}
              className="absolute top-1 left-0 ml-2 text-gray-500 flex items-center"
            >
              <IoArrowBack size={24} />
            </button>
            <h2 className="text-center text-2xl font-semibold mb-3">
              Cek Email dan Username
            </h2>
            <p className="text-center text-sm mb-6 text-gray-500">
              Untuk mengetahui email dan username kamu, kamu harus memasuki identasi yang benar dengan data
              yang sudah terdaftar
            </p>
            {errorMessage && (
              <p className="text-red-600 text-sm mb-6">{errorMessage}</p>
            )}
            <input
              type="text"
              placeholder="Masukkan No. KTP"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type="text"
              placeholder="Masukkan Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type={selectedDateOfBirth ? "date" : "text"} 
              value={selectedDateOfBirth || ''}
              onChange={(e) => setSelectedDateOfBirth(e.target.value)}
              onFocus={(e) => (e.target.type = "date")} 
              onBlur={(e) => {
                if (!selectedDateOfBirth) {
                  e.target.type = "text";
                }
              }}
              className="w-full p-2 mb-4 text-sm md:text-base lg:text-lg border border-gray-300 rounded-lg"
              placeholder={recoveryFor === 'CheckEmailUsername' && !selectedDateOfBirth ? "Masukkan tanggal lahir" : ""}
              required
            />
            <button
              type="submit"
              className="w-full p-2 mb-6 bg-primary-400 text-white rounded"
            >
              {loadingSubmitIdentify ? (
                <div className="flex flex-col justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                </div>
              ) : (
                'Verifikasi Identitas'
              )}
            </button>
            <Link
              to="/bantuan/akun"
              className="block font-semibold text-center text-gray-500 hover:text-gray-600 transition duration-400 ease-in-out"
            >
              Bantuan tentang Akun
            </Link>
          </form>
        )}
        {recoveryFor === "ChangePassword" && step === 2 && (
          // OTP Verification Step
          <div className="max-w-md mx-auto px-4 sm:px-8 py-10">
            <header className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-1">Verifikasi Kode OTP</h1>
              <p className="text-sm text-slate-500">
                Masukkan kode verifikasi 4-digit yang telah dikirim ke email Kamu.
              </p>
              {errorMessage && (
                <p className="text-red-600 text-sm mt-3">{errorMessage}</p>
              )}
            </header>
            <form id="otp-form" onSubmit={handleSubmitOtp}>
              <div className="flex items-center justify-center gap-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    className="w-12 h-12 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-indigo-100 rounded-md"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                    pattern="\d*"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primary-400 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary-500 hover:bg-primary-500 focus:outline-none focus:ring focus:ring-gray-100 transition-colors duration-150"
                >
                  {loadingSubmitOtp ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                        viewBox="0 0 24 24"
                      ></svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    'Verifikasi Kode'
                  )}
                </button>
              </div>
            </form>
            <div className="text-sm text-slate-500 mt-4 text-center">
              Tidak menerima kode?{' '}
              <button
                className="font-medium text-primary-400 hover:text-primary-500"
                onClick={resetCodeOtp}
              >
                {loadingResendOtp ? (
                  <div className="flex items-center">Mengirim....</div>
                ) : (
                  'Kirim Ulang'
                )}
              </button>
            </div>
            <div className="text-sm text-slate-500 mt-4 text-center">
              Ingin mengganti email?{' '}
              <button
                className="font-medium text-primary-400 hover:text-primary-500"
                onClick={() => {
                  setStep(0);
                  setRecoveryFor('ChangePassword');
                }}
              >
                Kembali
              </button>
            </div>
          </div>
        )}
        {recoveryFor === "CheckEmailUsername" && step === 2 && (
          <div className="max-w-lg mx-auto px-4 sm:px-8 py-10 text-center">
            <header className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Verifikasi Identitas Berhasil</h1>
              <p className="text-sm text-slate-500">
                Informasi tentang Email dan Username kamu berada di bawah.
              </p>
            </header>
          
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-xl text-gray-800">Email kamu adalah:</h2>
                <p className="text-lg text-gray-600">{resultEmail}</p>
              </div>
              <div>
                <h2 className="font-semibold text-xl text-gray-800">Username kamu adalah:</h2>
                <p className="text-lg text-gray-600">{resultUsername}</p>
              </div>
            </div>
          
            <button
              onClick={openModal}
              className="mt-6 font-semibold text-primary-400 hover:text-primary-500 transition duration-300"
            >
              Kembali ke bagian Login
            </button>
          
            <hr className="my-3 border-gray-300" />
          
            <Link
              to="/"
              className="block text-center font-semibold text-gray-500 hover:text-gray-600 transition duration-300"
            >
              Kembali ke halaman Beranda
            </Link>
          </div>
        )}
        {recoveryFor === "ChangePassword" && step === 3 && (
          // Password Reset Step
          <form onSubmit={handleSubmitChangePassword}>
            <h2 className="text-center text-2xl font-semibold mb-6">
              Ganti Password
            </h2>
            {errorMessage && (
              <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
            )}
            <div className="relative mb-4">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Masukkan password baru"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 focus:outline-none"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
              
            </div>
            <div className="relative mb-4">
              <input
                type={showConfirmNewPassword ? 'text' : 'password'}
                placeholder="Konfirmasi password baru"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 focus:outline-none"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              >
                {showConfirmNewPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-primary-400 hover:bg-primary-500 text-white rounded-md transition duration-400 ease-in-out"
            >
              {loadingChangePassword ? (
                <div className="flex flex-col justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                </div>
              ) : (
                'Ganti Password'
              )}
            </button>
          </form>
        )}
      </div>

      <footer className="flex justify-center mt-6">
        <span className="text-gray-500 font-bold">
          COPYRIGHT @ <Link to="/">PT. SENTOSAKARYA ADITAMA</Link>
        </span>
      </footer>
    </div>
  );
};

RecoveryAccountSection.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default RecoveryAccountSection;
