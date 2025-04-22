import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import GaleryPhoto from './pages/GaleryPhoto';
import GaleryVideo from './pages/GaleryVideo';
import Download from './pages/Download';
import News from './pages/News';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import NewsDetails from './pages/NewsDetails';
import PageNotFound from './pages/404';
import AddNews from './pages/AddNews';
import Bantuan from './pages/Bantuan';
import HelpTopic from './pages/HelpTopic';
import Pendaftaran from './pages/Pendaftaran';
import RecoveryAccount from './pages/RecoveryAccount';
import Logout from './pages/Logout';
import ProtectedRoute from './components/routes/ProtectedRoutes';
import AddJobs from './pages/AddJobs';
import EditJob from './pages/EditJob';
import RegistrationAccount from './pages/RegistrationAccount';
import UnauthorizedPage from './pages/Unauthorized';
import ForbiddenPage from './pages/Forbidden';
import ResetPasswordPage from './pages/ResetPassword';
import UpdatePasswordPage from './pages/UpdatePassword';
import ProtectedResetPassword from './components/routes/ProtectedResetPasswordRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/beranda" element={<Home />}></Route>
        <Route path="/tentang-kami" element={<About />}></Route>
        <Route path="/galeri-foto" element={<GaleryPhoto />}></Route>
        <Route path="/galeri-video" element={<GaleryVideo />}></Route>
        <Route path="/download" element={<Download />}></Route>
        <Route path="/job-list" element={<JobList />}></Route>
        <Route path="/job-detail/:id" element={<JobDetail />}></Route>
        <Route path="/berita" element={<News />}></Route>
        <Route path="/berita/:id" element={<NewsDetails />}></Route>
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Staff']}/>}>
          <Route path="/tambah-berita" element={<AddNews/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Staff']}/>}>
          <Route path="/job-add" element={<AddJobs/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Staff']}/>}>
          <Route path="/job-edit" element={<EditJob/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['Admin']}/>}>
          <Route path="/tambah-akun" element={<RegistrationAccount />}></Route>
        </Route>
        <Route path="/kontak" element={<Contact />}></Route>
        <Route path="/pendaftaran" element={<Pendaftaran />}></Route>
        <Route path="/registrasi" element={<Registration />}></Route>
        <Route path="/pemulihan-akun" element={<RecoveryAccount />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route element={<ProtectedResetPassword />}>
          <Route path="/update-password" element={<UpdatePasswordPage />} />
        </Route>
        <Route path="/bantuan" element={<Bantuan />}></Route>
        <Route path="/bantuan/:topicId" element={<HelpTopic />}></Route>
        <Route
          path="/bantuan/:topicId/:subtopicId"
          element={<HelpTopic />}
        ></Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />}></Route>
        <Route path="/forbidden" element={<ForbiddenPage />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
