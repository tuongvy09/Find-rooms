import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DescriptionIcon from '@mui/icons-material/Description';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Box, FormControl, IconButton, ImageList, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
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
      placeholder={placeholder}
      fullWidth
      InputLabelProps={{
        style: { display: 'none' },
      }}
      inputProps={{
        style: { fontSize: '14px' },
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
  const fullAddress = `${address} ${selectedWard ? selectedWard.name : ''} ${selectedDistrict ? selectedDistrict.name : ''} ${selectedProvince ? selectedProvince.name : ''}`;

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
    <Box sx={{ display: 'flex', height: '300vh' }}>
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
              placeholder="Số nhà, tên đường"
            />
          </div>
        </div>
        <Box sx={{ marginTop: 2 }}>
          <h2>Địa chỉ chính xác</h2>
          <TextField
            variant="outlined" // Sử dụng variant filled
            value={fullAddress}
            size='small'
            InputProps={{
              readOnly: true, // Đặt trường này ở chế độ chỉ đọc
              sx: { bgcolor: '#f0f0f0' }, // Thiết lập màu nền
            }}
            fullWidth
            sx={{ marginTop: 1 }} // Thêm khoảng cách trên
          />
        </Box>
        <h2>Thông tin mô tả</h2>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Loại chuyên đề</Typography>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <Select native defaultValue="" id="grouped-native-select">
            <option aria-label="None" value="" >--Chọn loại chuyên mục--</option>
            <option value={1}>Nhà trọ, phòng trọ</option>
            <option value={2}>Nhà nguyên căn</option>
            <optgroup label="Căn hộ">
              <option value={3}>Cho thuê căn hộ</option>
              <option value={4}>Cho thuê căn hộ mini</option>
              <option value={5}>Cho thuê căn hộ dịch vụ</option>
            </optgroup>
            <option value={2}>Cho thuê mặt bằng, văn phòng</option>
          </Select>
        </FormControl>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Tiêu đề</Typography>
        <TextField id="outlined-basic" variant="outlined" fullWidth />
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Nội dung miêu tả</Typography>
        <TextField id="outlined-basic" variant="outlined" fullWidth InputProps={{ style: { height: '200px' } }} />
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Thông tin liên hệ</Typography>
        <TextField
          variant="outlined" // Sử dụng variant filled
          size='small'
          InputProps={{
            readOnly: true, // Đặt trường này ở chế độ chỉ đọc
            sx: { bgcolor: '#f0f0f0', width: '300px' }, // Thiết lập màu nền
          }} // Thêm khoảng cách trên
        />
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Điện thoại</Typography>
        <TextField
          variant="outlined" // Sử dụng variant filled
          size='small'
          InputProps={{
            readOnly: true, // Đặt trường này ở chế độ chỉ đọc
            sx: { bgcolor: '#f0f0f0', width: '300px' }, // Thiết lập màu nền
          }} // Thêm khoảng cách trên
        />
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Giá cho thuê</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
          <TextField
            id="outlined-amount"
            variant="outlined"
            size='small'
            sx={{ flex: 1 }} // Tạo khoảng cách bên phải
          />
          <FormControl variant="outlined" sx={{ minWidth: '120px' }}>
            <InputLabel id="currency-label"></InputLabel>
            <Select
              labelId="currency-label"
              size='small'
              id="currency-select"
              defaultValue="dong_thang"
            >
              <MenuItem value="dong_thang">Đồng/tháng</MenuItem>
              <MenuItem value="dong_m2_thang">Đồng/m²/tháng</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Diện tích</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
          <TextField
            id="amount-field"
            variant="outlined"
            size='small'
            fullWidth
            type="number"
          />
          <TextField
            id="area-field"
            variant="outlined"
            size='small'
            value="m²"
            InputProps={{ readOnly: true }}
            sx={{ backgroundColor: '#f0f0f0' }}
          />
        </Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Đối tượng cho thuê</Typography>
        <Select
          size='small'
          id="object-select"
          defaultValue="null"
          sx={{ minWidth: '120px', width: '300px' }}
        >

          <MenuItem value="null">--Tất cả--</MenuItem>
          <MenuItem value="nam">Nam</MenuItem>
          <MenuItem value="nu">Nữ</MenuItem>
        </Select>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'Times New Roman' }}>Số lượng tối đa</Typography>
        <TextField
          id="amountpoeple-field"
          variant="outlined"
          size='small'
          sx={{ width: '300px' }}
          type="number"
        />
        <h2>Hình ảnh</h2>
        <p className='custom-fontp'>Cập nhật hình ảnh chi tiết sẽ được cho thuê nhanh hơn</p>
        <IconButton>Upload hình ảnh</IconButton>
        <Stack spacing={4}>
          <ImageList
            sx={{width: 500, height: 450}}
            columns = {3}
            rowHeight={164}>
              {

              }
          </ImageList>
        </Stack>
      </Box>
    </Box>
  );
};

export default DangTinMoi;