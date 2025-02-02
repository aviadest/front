import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.module.scss';
import DashBoard from './pages/dashboard/dashboard';
import Header from './pages/header/header';
import Home from './pages/home/home';
import Upload from './pages/upload/upload';

function App() {
  return (
    <Router>
      <Header />
      {/* <p>{JSON.stringify(import.meta.env)}</p> */}
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </Router>
  )
}

export default App
