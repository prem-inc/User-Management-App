import React, { useState } from 'react'
import { Box, Grid, TextField, Typography, DatePicker, Radio, RadioGroup, Select, MenuItem, Button } from '@cw/rds'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const EditUserData = () => {
  const location = useLocation();
  const user = location.state?.user;

  if(!user){
    return(
      <>
        <div>No User selected. Please Navigate back to home page</div>
      </>
    )
  }

  const [name, setName] = useState(user.name);
  const [userId, setUserId] = useState(user.userId);
  const [email, setEmail] = useState(user.email);
  const [dob, setDOB] = useState(dayjs(user.dob));
  const [selectedValue, setSelectedValue] = useState(user.status);
  const [allRoles, setAllRoles] = useState(["Default", "Admin", "Super User", "Business User"]);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      userId,
      email,
      dob: dob.format("MM-DD-YYYY"),
      status: selectedValue,
      role: selectedRole
    };
    axios.put(`http://localhost:8080/update/${user.key}`,userData)
    .then((response) =>{
      toast.success("User updated Successfully!", {position: "bottom-center", autoClose: 1500})
      navigate('/')
    })
    .catch((error) => console.log(error.message))
  }
  const handleRadioChange = evt => {
    setSelectedValue(evt.target.value);
  };

  

  return (
    <>
      <Typography variant="h6">Edit User</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Name"
              name="name"
              value={name}
              variant='outlined'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="User ID"
              name="UserID"
              value={userId}
              variant='outlined'
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              name="email"
              value={email}
              variant='outlined'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item sx={{ marginTop: -1 }}>
            <DatePicker label='Date of Birth' value={dob} onChange={newValue => setDOB(newValue)} required />
          </Grid>
          <br /> <br />
          <Grid item sx={{ marginTop: 1 }}>
            <Typography>Status *</Typography>
            <RadioGroup value={selectedValue} onChange={handleRadioChange} sx={{ display: "flex", flexDirection: "row" }} required>
              <Radio value='active' checked={selectedValue === 'active'} label='active' />
              <Radio value='inactive' checked={selectedValue === 'inactive'} label='inactive' />
            </RadioGroup>
          </Grid>

          <Grid item>
            <Select
              label='Role'
              variant='outlined'
              placeholder='Select an option'
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}>
              {allRoles.map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2, marginRight: 6 }}>
          <Button variant='secondary1' onClick={()=>navigate('/')}>Cancel</Button>
          <Button variant='primary' type="submit">Edit</Button>
        </Box>
      </Box>
    </>
  )
}

export default EditUserData