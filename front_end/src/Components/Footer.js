import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="h6">
        CÔNG TY TNHH UTE
      </Typography>
      <Typography variant="body1">
        Tổng đài CSKH: 04564789
      </Typography>
      <Typography variant="body1">
        Copyright © 2023 - 2024 PhongTroXinh.com
      </Typography>
      <Typography variant="body1">
        Email: PhongTroXinh@gmail.com
      </Typography>
      <Typography variant="body1">
        Địa chỉ: 01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh
      </Typography>
    </Box>
  );
};

export default Footer;