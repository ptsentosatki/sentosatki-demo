import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import Logo from '../assets/logo-pt-sentosakarya-aditama.svg';
import LogoKSP from '../assets/Logo-KSP-Sentosa-Surya-Sejahtera.png';
import LogoSentosaGroup from '../assets/sentosa-group.png';
import LogoLPKl from '../assets/logo-lpkl.png';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  PhotoIcon,
  VideoCameraIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { MdOutlineHelp, MdOutlineMedicalInformation } from 'react-icons/md';
import { PiCertificateFill } from 'react-icons/pi';
import { useAuth } from '../hooks/useAuth';

const galeri = [
  {
    name: 'Foto',
    description: 'Koleksi gambar kegiatan dan acara kami',
    href: '/galeri-foto',
    icon: PhotoIcon,
  },
  {
    name: 'Video',
    description: 'Koleksi video kegiatan dan layanan kami',
    href: '/galeri-video',
    icon: VideoCameraIcon,
  },
  {
    name: 'Download',
    description: 'Dokumen yang dapat diunduh',
    href: '/download',
    icon: ArrowDownTrayIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ openModal }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMoreMenuOpen, setDesktopMoreMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPopover, setHoveredPopover] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const apiBackEndURL = import.meta.env.VITE_API_DATABASE;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsTransparent(false);
      setIsScrolled(true);
    } else {
      setIsTransparent(true);
      setIsScrolled(false);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] ${isTransparent ? 'bg-transparent' : 'bg-blur backdrop-blur-lg bg-opacity-65'} ${isScrolled ? 'bg-white shadow-md' : ''}`}
    >
      <nav
        className="relative mx-auto flex items-center justify-between p-4 lg:p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex hidden lg:block">
          <button
            type="button"
            className="text-gray-700 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setDesktopMoreMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center justify-center lg:justify-start lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img className="h-14 w-auto" src={Logo} alt="Logo" />
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:order-3 lg:ml-4 mr-8">
          <PopoverGroup className="flex gap-x-12">
            <NavLink
              to="/"
              className={({ isActive }) => classNames(
                'text-sm font-semibold leading-6 hover:text-primary-400 transition duration-400 ease-in-out',
                  isActive || location.pathname.startsWith('/home') || location.pathname.startsWith('/beranda') ? 'text-primary-400' : 'text-gray-900'
              )}
            >
              Beranda
            </NavLink>
            <NavLink
              to="/tentang-kami"
              className={({ isActive }) => classNames(
                'text-sm font-semibold leading-6 hover:text-primary-400 transition duration-400 ease-in-out',
                isActive ? 'text-primary-400' : 'text-gray-900'
              )}
            >
              Tentang Kami
            </NavLink>
            <Popover
              className="relative"
              onMouseEnter={() => setHoveredPopover('galeri')}
              onMouseLeave={() => setHoveredPopover(null)}
            >
              <PopoverButton
                className={({ isActive }) => 
                  classNames(
                    'flex items-center gap-x-1 text-sm font-semibold leading-6 hover:text-primary-400 transition duration-400 ease-in-out',
                    location.pathname.startsWith('/galeri') || location.pathname.startsWith('/download') || isActive ? 'text-primary-400' : 'text-gray-900'
                  )
                }
              >
                Galeri
                <ChevronDownIcon
                  className={`h-5 w-5 flex-none text-gray-400 transition-transform duration-200 ${hoveredPopover === 'galeri' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </PopoverButton>
              <Transition
                as={Fragment}
                show={hoveredPopover === 'galeri'}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {galeri.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 transition duration-400 ease-in-out"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-primary-400 transition duration-400 ease-in-out"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <NavLink
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </NavLink>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>
            <NavLink
              to="/berita"
              className={({ isActive }) =>
                classNames(
                  'text-sm font-semibold leading-6 hover:text-primary-400 transition duration-400 ease-in-out',
                  isActive ? 'text-primary-400' : 'text-gray-900'
                )
              }
            >
              Berita
            </NavLink>
            <NavLink
              to="/job-list"
              className={({ isActive }) => 
                classNames(
                  'text-sm font-semibold leading-6 hover:text-primary-400 transition duration-400 ease-in-out',
                  isActive || location.pathname.startsWith('/job') ? 'text-primary-400' : 'text-gray-900'
                )
              }
            >
              Job List
            </NavLink>
            <NavLink
              to="/kontak"
              className={({ isActive }) => 
                classNames(
                  'text-sm font-semibold leading-6 hover:text-primary-400 transition duration-400 ease-in-out',
                  isActive ? 'text-primary-400' : 'text-gray-900'
                )
              }
            >
              Kontak
            </NavLink>
            <NavLink
              to="/pendaftaran"
              className={({ isActive }) => 
                classNames(
                  'text-sm font-semibold leading-6 hover:text-primary-400 transition duration-400 ease-in-out',
                  isActive || location.pathname.startsWith('/registrasi') ? 'text-primary-400' : 'text-gray-900'
                )
              }
            >
              Pendaftaran
            </NavLink>
          </PopoverGroup>
        </div>
        <div className="hidden lg:flex lg:order-3 lg:ml-4">
          {user ? (
            <Popover className="relative">
              {() => {
                return (
                  <>
                    <PopoverButton className="flex items-center text-sm font-medium text-black font-semibold rounded-full hover:text-primary-400">
                      <img
                        className="w-8 h-8 me-2 rounded-full"
                        src={`${apiBackEndURL}/api${user.image_url}`}
                        alt={`${user.full_name} photo`}
                      />
                      {user.full_name}
                      <span
                        className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <ChevronDownIcon className="w-5 h-5 ms-2" />
                      </span>
                    </PopoverButton>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <PopoverPanel className="absolute right-0 top-full z-10 mt-3 w-48 max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="px-4 py-2 text-sm text-gray-800 text-left">
                          <div className="truncate font-semibold">
                            {user.full_name}
                          </div>
                        </div>
                        <ul className="py-2 text-sm text-gray-800 text-left">
                          {['Admin'].includes(user.position) && (
                            <li>
                              <NavLink
                                to="/tambah-akun"
                                className={({ isActive }) => 
                                  classNames(
                                    'block px-4 py-2 hover:bg-gray-100 hover:text-primary-400 transition duration-400 ease-in-out',
                                    isActive || location.pathname.startsWith('/tambah-akun') ? 'text-primary-400' : 'text-gray-900'
                                  )
                                }
                              >
                                Tambah Akun
                              </NavLink>
                            </li>
                          )}
                          <li>
                            <NavLink
                              to="/tambah-berita"
                              className={({ isActive }) => 
                                classNames(
                                  'block px-4 py-2 hover:bg-gray-100 hover:text-primary-400 transition duration-400 ease-in-out',
                                  isActive || location.pathname.startsWith('/tambah-berita') ? 'text-primary-400' : 'text-gray-900'
                                )
                              }
                            >
                              Tambah Berita
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={logout}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-primary-400"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </PopoverPanel>
                    </Transition>
                  </>
                );
              }}
            </Popover>
          ) : (
            <button
              onClick={openModal}
              className="text-white bg-primary-secondary-800 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-secondary-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition duration-400 ease-in-out"
            >
              Login<span aria-hidden="true"> &rarr;</span>
            </button>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-gray-700 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Menu Lainnya untuk Device Desktop atau Besar */}

      <Transition.Root show={desktopMoreMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="hidden lg:block"
          onClose={setDesktopMoreMenuOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-50" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto bg-white shadow-lg ring-1 ring-black ring-opacity-5 px-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between mt-5">
                <NavLink to="#" className="-m-1.5 p-1.5">
                  <img className="h-14 w-auto" src={Logo} alt="Logo" />
                </NavLink>
                <button
                  type="button"
                  className="text-gray-700 inline-flex items-center justify-center rounded-md"
                  onClick={() => setDesktopMoreMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <h2 className="-mx-3 rounded-lg mb-2 px-2 text-base font-semibold leading-7 text-gray-900 uppercase">
                      Instansi yang terkait
                    </h2>
                    <NavLink
                      to="https://sentosaksp.com/"
                      target="_blank"
                      className="block -mx-3 rounded-lg py-2 px-2 text-base font-semibold leading-7 hover:bg-gray-100 transition duration-400 ease-in-out"
                    >
                      <img src={LogoKSP} className="h-12" />
                    </NavLink>
                    <NavLink
                      to="https://sentosa-group.com/"
                      target="_blank"
                      className="block -mx-3 rounded-lg py-2 px-2 text-base font-semibold leading-7 hover:bg-gray-100 transition duration-400 ease-in-out"
                    >
                      <img src={LogoSentosaGroup} className="h-12" />
                    </NavLink>
                    <NavLink
                      to="https://lpksentosa.com/"
                      target="_blank"
                      className="block -mx-4 rounded-lg py-2 text-base font-semibold leading-7 hover:bg-gray-100 transition duration-400 ease-in-out"
                    >
                      <img src={LogoLPKl} className="h-12" />
                    </NavLink>
                    <h2 className="-mx-3 rounded-lg pt-6 px-2 text-base font-semibold leading-7 text-gray-900 uppercase">
                      Layanan lainnya
                    </h2>
                    <div>
                      <NavLink
                        className="flex -mx-3 py-2 px-2 space-x-3 rounded-lg hover:bg-gray-100"
                        to="/bantuan"
                      >
                        <MdOutlineHelp className="flex-none h-5 text-primary-secondary-800 w-5" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-700">
                            Bantuan
                          </div>
                          <div className="text-xs text-grey-500 pt-1 text-gray-500">
                            Bantuan terkait masalah layanan
                          </div>
                        </div>
                      </NavLink>
                      <NavLink
                        className="flex -mx-3 py-2 px-2 space-x-3 rounded-lg hover:bg-gray-100"
                        to="https://lpksentosa.com/home/daftarsiswa"
                      >
                        <PiCertificateFill className="flex-none h-5 text-primary-secondary-800 w-5" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-700">
                            Sertifikasi BNSP
                          </div>
                          <div className="text-xs text-grey-500 pt-1 text-gray-500">
                            Pembuatan sertifikasi BNSP
                          </div>
                        </div>
                      </NavLink>
                      <NavLink
                        className="flex -mx-3 py-2 px-2 space-x-3 rounded-lg hover:bg-gray-100"
                        to="https://klinikmarchsya.com/medical-check-up"
                      >
                        <MdOutlineMedicalInformation className="flex-none h-5 text-primary-secondary-800 w-5" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-700">
                            Medikal Check-up
                          </div>
                          <div className="text-xs text-grey-500 pt-1 text-gray-500">
                            Pembuatan pemeriksaan kesehatan
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition.Root>

      {/* Mobile Menu */}

      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-50" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto bg-white shadow-lg ring-1 ring-black ring-opacity-5 px-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between mt-5">
                <NavLink to="#" className="-m-1.5 p-1.5">
                  <img className="h-14 w-auto" src={Logo} alt="Logo" />
                </NavLink>
                <button
                  type="button"
                  className="text-gray-700 inline-flex items-center justify-center rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        classNames(
                          'block -mx-3 rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 transition duration-400 ease-in-out',
                          isActive || location.pathname.startsWith('/home') || location.pathname.startsWith('/beranda') ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                        )
                      }
                    >
                      Beranda
                    </NavLink>
                    <NavLink
                      to="/tentang-kami"
                      className={({ isActive }) => 
                        classNames(
                          'block -mx-3 rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 transition duration-400 ease-in-out',
                          isActive ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                        ) 
                      }
                    >
                      Tentang Kami
                    </NavLink>
                    <Disclosure as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <DisclosureButton
                            className={({ isActive }) => 
                              classNames(
                                'flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 transition duration-400 ease-in-out',
                                location.pathname.startsWith('/galeri') || isActive ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                              )
                            }
                          >
                            Galeri
                            <ChevronDownIcon
                              className={classNames(
                                open ? 'rotate-180' : '',
                                'h-5 w-5 flex-none',
                              )}
                              aria-hidden="true"
                            />
                          </DisclosureButton>
                          <DisclosurePanel className="mt-2 space-y-2">
                            {galeri.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) => 
                                  classNames(
                                    'block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 transition duration-400 ease-in-out',
                                    isActive ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                                  )
                                }
                              >
                                {item.name}
                              </NavLink>
                            ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                    <NavLink
                      to="/berita"
                      className={({ isActive }) =>
                        classNames(
                          'block -mx-3 rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 transition duration-400 ease-in-out',
                          isActive ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                        )
                      }
                    >
                      Berita
                    </NavLink>
                    <NavLink
                      to="/job-list"
                      className={({ isActive }) => 
                        classNames(
                          'block -mx-3 rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 transition duration-400 ease-in-out',
                          isActive || location.pathname.startsWith('/job') ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                        )
                      }
                    >
                      Job List
                    </NavLink>
                    <NavLink
                      to="/kontak"
                      className={({ isActive }) =>
                        classNames(
                          'block -mx-3 rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 transition duration-400 ease-in-out',
                          isActive ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                        )
                      }
                    >
                      Kontak
                    </NavLink>
                    <NavLink
                      to="/pendaftaran"
                      className={({ isActive }) =>
                        classNames(
                          'block -mx-3 rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7',
                          isActive || location.pathname.startsWith('/registrasi') ? 'text-primary-400' : 'text-gray-900 hover:bg-gray-200'
                        )
                      }
                    >
                      Pendaftaran
                    </NavLink>
                  </div>
                  <div>
                    {user ? (
                      <Popover className="relative">
                        {({ open }) => {
                          setIsOpen(open);
                          return (
                            <>
                              <PopoverButton className="flex w-full items-center text-left justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-200 transition duration-400 ease-in-out">
                                <img
                                  className="w-8 h-8 me-2 rounded-full"
                                  src={user.image_profile}
                                  alt={`${user.full_name} photo`}
                                />
                                {user.full_name}
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? 'rotate-180' : '',
                                    'h-5 w-5 flex-none',
                                  )}
                                  aria-hidden="true"
                                />
                              </PopoverButton>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <PopoverPanel className="mt-2 space-y-2 bg-gray-100 rounded-lg">
                                  {['Admin'].includes(user.position) && (
                                    <NavLink
                                      to="/add-account"
                                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition duration-400 ease-in-out"
                                    >
                                      Tambah Akun
                                    </NavLink>
                                  )}
                                  <NavLink
                                    to="/tambah-berita"
                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition duration-400 ease-in-out"
                                  >
                                    Tambah Berita Terbaru
                                  </NavLink>
                                  <button
                                    onClick={logout}
                                    className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-200 transition duration-400 ease-in-out"
                                  >
                                    Logout
                                  </button>
                                </PopoverPanel>
                              </Transition>
                            </>
                          );
                        }}
                      </Popover>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openModal();
                        }}
                        className="block w-full py-2.5 text-center text-sm font-medium text-white bg-primary-secondary-800 rounded-lg hover:bg-primary-secondary-900 transition duration-400 ease-in-out"
                      >
                        Login <span aria-hidden="true"> &rarr;</span>
                      </button>
                    )}
                  </div>
                  <h2 className="-mx-3 rounded-lg mt-8 px-2 text-base font-semibold leading-7 text-gray-900 uppercase">
                    Layanan lainnya
                  </h2>
                  <div className="mb-10">
                    <NavLink
                      className="flex -mx-3 py-2 px-2 space-x-3 rounded-lg hover:bg-gray-200 transition duration-400 ease-in-out"
                      to="/bantuan"
                    >
                      <MdOutlineHelp className="flex-none h-5 text-primary-secondary-800 w-5" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-700">
                          Bantuan
                        </div>
                        <div className="text-xs pt-1 text-gray-500">
                          Bantuan terkait masalah layanan
                        </div>
                      </div>
                    </NavLink>
                    <NavLink
                      className="flex -mx-3 py-2 px-2 space-x-3 rounded-lg hover:bg-gray-200"
                      to="https://lpksentosa.com/home/daftarsiswa"
                    >
                      <PiCertificateFill className="flex-none h-5 text-primary-secondary-800 w-5" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-700">
                          Sertifikasi BNSP
                        </div>
                        <div className="text-xs text-grey-500 pt-1 text-gray-500">
                          Pembuatan sertifikasi BNSP
                        </div>
                      </div>
                    </NavLink>
                    <NavLink
                      className="flex -mx-3 py-2 px-2 space-x-3 rounded-lg hover:bg-gray-200"
                      to="https://klinikmarchsya.com/medical-check-up"
                    >
                      <MdOutlineMedicalInformation className="flex-none h-5 text-primary-secondary-800 w-5" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-700">
                          Medikal Check-up
                        </div>
                        <div className="text-xs text-grey-500 pt-1 text-gray-500">
                          Pembuatan pemeriksaan kesehatan
                        </div>
                      </div>
                    </NavLink>
                  </div>
                  <h2 className="-mx-3 rounded-lg px-2 text-base font-semibold leading-7 text-gray-900 uppercase">
                    Instansi yang terkait
                  </h2>
                  <NavLink
                    to="https://sentosaksp.com/"
                    target="_blank"
                    className="block -mx-3 rounded-lg py-2 px-2 text-base font-semibold leading-7 hover:bg-gray-200 transition duration-400 ease-in-out"
                  >
                    <img src={LogoKSP} className="h-10" />
                  </NavLink>
                  <NavLink
                    to="https://sentosa-group.com/"
                    target="_blank"
                    className="block -mx-3 rounded-lg py-2 px-2 text-base font-semibold leading-7 hover:bg-gray-200 transition duration-400 ease-in-out"
                  >
                    <img src={LogoSentosaGroup} className="h-10" />
                  </NavLink>
                  <NavLink
                    to="https://lpksentosa.com/"
                    target="_blank"
                    className="block -mx-4 rounded-lg py-2 text-base font-semibold leading-7 hover:bg-gray-200 transition duration-400 ease-in-out"
                  >
                    <img src={LogoLPKl} className="h-10" />
                  </NavLink>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

Navbar.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Navbar;