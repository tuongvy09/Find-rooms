import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChoThueMatBang from './Components/ChoThueMatBang';
import ChoThueNha from './Components/ChoThueNha';
import ChoThueTro from './Components/ChoThueTro';
import DangTinMoi from './Components/DangTinMoi';
import Footer from './Components/Footer';
import Header from './Components/Header';
import TinTuc from './Components/TinTuc';
import TrangChu from './Components/TrangChu';
import Handle from './Untils/Handle';

const App = () => {
  const { handleAddPost } = Handle();
  return (
      <div className="app-container">
        <div className="h1-container">
          <Button variant="text" className="tk-button">
            Quản lý tài khoản
            <ManageAccountsIcon style={{ marginLeft: '8px' }} />
          </Button>
          <Button variant="contained" className="rounded-button" onClick={handleAddPost}>
            Đăng tin mới
            <AddCircleOutline style={{ marginLeft: '8px' }} /> {/* Icon bên phải chữ */}
          </Button>
        </div>
        <Header/>
        <div className="content">
          <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/ChoThueTro" element={<ChoThueTro />} />
            <Route path="/ChoThueNha" element={<ChoThueNha />} />
            <Route path="/ChoThueMatBang" element={<ChoThueMatBang />} />
            <Route path="/TinTuc" element={<TinTuc />} />
            <Route path="/DangTinMoi" element={<DangTinMoi />} />
          </Routes>
        </div>
        <Footer />
      </div>
  );
};

export default App;