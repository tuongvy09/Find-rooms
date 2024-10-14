import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import Handle from '../Untils/Handle';

const Header = () => {
  
  const { handleNavigate } = Handle();
  return (
    <AppBar position="static">
      
      <Toolbar sx={{ backgroundColor: '#000000' }}>
      <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontFamily: 'Times New Roman',
            fontWeight: 'bold',
            fontSize: '2rem',
            color: "#FFFFFF"
          }}
        >
          PhongTroXinh.com
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', ml: 'auto'  }}>
          <Button color="inherit" onClick={() => handleNavigate('/')}>Trang Chủ</Button>
          <Button color="inherit" onClick={() => handleNavigate('/ChoThueTro')}>Cho Thuê Trọ</Button>
          <Button color="inherit" onClick={() => handleNavigate('/ChoThueNha')}>Cho Thuê Nhà</Button>
          <Button color="inherit" onClick={() => handleNavigate('/ChoThueMatBang')}>Cho Thuê Mặt Bằng</Button>
          <Button color="inherit" onClick={() => handleNavigate('/TinTuc')}>Tin Tức</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;