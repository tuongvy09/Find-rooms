import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DescriptionIcon from '@mui/icons-material/Description';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Box, FormControl, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../App.css';
import CustomizedBreadcrumbs from './CustomizedBreadcrumbs';

const SelectWithLabel = ({ label, options, value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || ''}
        onChange={(event) => {
          const selected = options.find(option => option.code === event.target.value);
          onChange(selected);
        }}
        label={label}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const TextFieldWithoutLabel = ({ value, onChange, placeholder }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      placeholder={placeholder} // Sử dụng placeholder để hiển thị hướng dẫn
      fullWidth
      InputLabelProps={{
        style: { display: 'none' }, // Ẩn nhãn nếu cần
      }}
      inputProps={{
        style: { fontSize: '14px' }, // Kích thước chữ bên trong
      }}
    />
  );
};

const DangTinMoi = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [address, setAddress] = useState('');

  const fullAddress = `${selectedProvince ? selectedProvince.name : ''}, ${selectedDistrict ? selectedDistrict.name : ''}, ${selectedWard ? selectedWard.name : ''}, ${address}`;

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=3');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);
  const handleProvinceChange = (newValue) => {
    setSelectedProvince(newValue);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts(newValue ? newValue.districts || [] : []);
    setWards([]);
  };

  const handleDistrictChange = (newValue) => {
    setSelectedDistrict(newValue);
    setSelectedWard(null);
    setWards(newValue ? newValue.wards || [] : []);
  };

  const handleWardChange = (newValue) => {
    setSelectedWard(newValue);
    console.log('Selected Ward:', newValue);
  };
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Cột bên trái */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#ffffff',
          padding: 2,
          borderRight: '1px solid #ccc',
        }}
      >
        <List
          sx={{ width: '100%', bgcolor: 'background.paper', margin: 0 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý tin đăng" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Chỉnh sửa thông tin" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Liên hệ" />
          </ListItemButton>
        </List>
      </Box>

      {/* Cột bên phải */}
      <Box
        sx={{
          flex: 4,
          bgcolor: '#ffffff',
          padding: 2,
        }}
      >
        <CustomizedBreadcrumbs />
        <h1>Đăng tin mới</h1>
        <hr className="horizontal-line" />
        <h2>Địa chỉ cho thuê</h2>
        <div style={{ display: 'flex', gap: '16px', flexGrow: 1 }}>
          <div style={{ flex: 1 }}>
            <SelectWithLabel
              label="Chọn Tỉnh/Thành phố"
              options={provinces}
              value={selectedProvince ? selectedProvince.code : null}
              onChange={handleProvinceChange}
            />
          </div>
          <div style={{ flex: 1 }}>
            <SelectWithLabel
              label="Chọn Quận/Huyện"
              options={districts}
              value={selectedDistrict ? selectedDistrict.code : null}
              onChange={handleDistrictChange}
            />
          </div>
          <div style={{ flex: 1 }}>
            <SelectWithLabel
              label="Chọn Phường/Xã"
              options={wards}
              value={selectedWard ? selectedWard.code : null}
              onChange={handleWardChange}
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextFieldWithoutLabel
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Tên đường, số nhà"
            />
          </div>
        </div>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Địa chỉ đã nhập:</Typography>
          <Typography variant="body1">{fullAddress}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DangTinMoi;