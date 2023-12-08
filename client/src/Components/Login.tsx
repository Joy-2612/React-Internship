import React, { useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem('userData', JSON.stringify(formData));

    navigate('/departments');
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className='form'>
        <h1>Enter Details</h1>
        <p style={{color: 'red'}}>{
          location.state && location.state.redirectMessage
        }</p>
        <TextField
          required
          id="outlined-required"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className='input'
        />
        <TextField
          required
          id="outlined-required"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className='input'
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className='input'
        />
         <Button className='button' onClick={handleSubmit}>Submit</Button>
      </div>
    </Box>
  );
};

export default Login;
