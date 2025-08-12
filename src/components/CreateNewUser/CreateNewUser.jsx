import React, { useState } from 'react'
import { Box, Grid, TextField, Typography, DatePicker, Radio, RadioGroup, Select, MenuItem, Button } from '@cw/rds'
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateNewUser = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [allRoles, setAllRoles] = useState(["Default", "Admin", "Super User", "Business User"]);
  const [selectedRole, setSelectedRole] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    nameError: [false, ""],
    userIdError: [false, ""],
    emailError: [false, ""],
    dobError: [false, ""],
    statusError: [false, ""],
    roleError: [false, ""]
  })
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = {
      nameError: [false, ""],
      userIdError: [false, ""],
      emailError: [false, ""],
      dobError: [false, ""],
      statusError: [false, ""],
      roleError: [false, ""]
    };

    if (!name.trim()) {
      errors.nameError = [true, "Name is required"];
      isValid = false;
    }

    if (!userId.trim()) {
      errors.userIdError = [true, "User ID is required"];
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.emailError = [true, "Email is required"];
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.emailError = [true, "Invalid email format"];
      isValid = false;
    }

    if (!dob) {
      errors.dobError = [true, "Date of birth is required"];
      isValid = false;
    } else if (dayjs(dob).isAfter(dayjs())) {
      errors.dobError = [true, "Date of birth cannot be in the future"];
      isValid = false;
    }

    if (!selectedValue) {
      errors.statusError = [true, "Status is required"];
      isValid = false;
    }

    if (!selectedRole) {
      errors.roleError = [true, "Role is required"];
      isValid = false;
    }

    setErrorMessage(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!validateForm()) return;

    const userData = {
      name,
      userid: userId,
      email,
      dob: dob.format("MM-DD-YYYY"),
      status: selectedValue,
      role: selectedRole
    };
    axios.post("http://localhost:8080/api/users", userData)
      .then((response) => {
        toast.success("User Created Successfully!", { position: "bottom-center", autoClose: 1500 })
        navigate('/')
      })
      .catch((error) => console.log(error.message))
  }
  const handleRadioChange = evt => {
    setSelectedValue(evt.target.value);
    let updateErrorMessage = errorMessage;
    updateErrorMessage.statusError = [false, ""]
    setErrorMessage(updateErrorMessage);
  };
  const handleNameFieldChange = (e) => {
    setName(e.target.value);
    let updateErrorMessage = errorMessage;
    updateErrorMessage.nameError = [false, ""]
    setErrorMessage(updateErrorMessage);
  }
  const handleUserIdFieldChange = (e) => {
    setUserId(e.target.value);
    let updateErrorMessage = errorMessage;
    updateErrorMessage.userIdError = [false, ""]
    setErrorMessage(updateErrorMessage);
  }
  const handleEmailFieldChange = (e) => {
    setEmail(e.target.value);
    let updateErrorMessage = errorMessage;
    updateErrorMessage.emailError = [false, ""]
    setErrorMessage(updateErrorMessage);
  }
  const handleDobFieldChange = value => {
    setDOB(value)
    let updateErrorMessage = errorMessage;
    updateErrorMessage.dobError = [false, ""]
    setErrorMessage(updateErrorMessage);
  }
  const handleRoleFieldChange = (e) => {
    setSelectedRole(e.target.value)
    let updateErrorMessage = errorMessage;
    updateErrorMessage.roleError = [false, ""]
    setErrorMessage(updateErrorMessage);
  }
  return (
    <>
      <Typography variant="h6">Creating New User</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Name"
              name="name"
              value={name}
              variant='outlined'
              onChange={handleNameFieldChange}
              error={errorMessage.nameError[0]}
              helperText={errorMessage.nameError[1]}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="User Id"
              name="userid"
              value={userId}
              variant='outlined'
              onChange={handleUserIdFieldChange}
              error={errorMessage.userIdError[0]}
              helperText={errorMessage.userIdError[1]}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              name="email"
              value={email}
              variant='outlined'
              onChange={handleEmailFieldChange}
              required
              error={errorMessage.emailError[0]}
              helperText={errorMessage.emailError[1]}
            />
          </Grid>
          <Grid item sx={{ marginTop: -1 }}>
            <DatePicker 
            label='Date of Birth' 
            value={dob} 
            onChange={handleDobFieldChange} 
            error={errorMessage.dobError[0]}
            helperText={errorMessage.dobError[1]}
            required />
          </Grid>
          <br /> <br />
          <Grid item sx={{ marginTop: 1 }}>
            <Typography color={errorMessage.statusError[0] ? "red" : ""}>Status *</Typography>
            <RadioGroup 
            value={selectedValue} 
            onChange={handleRadioChange} 
            sx={{ display: "flex", flexDirection: "row" }} required>
              <Radio value='active' checked={selectedValue === 'active'} label='active' />
              <Radio value='inactive' checked={selectedValue === 'inactive'} label='inactive' />
            </RadioGroup>
            {errorMessage.statusError[0] ? <Typography variant="body1" color="red">{errorMessage.statusError[1]}</Typography> : null}
          </Grid>

          <Grid item>
            <Select
              label='Role'
              variant='outlined'
              placeholder='Select an option'
              value={selectedRole}
              onChange={handleRoleFieldChange}
              error={errorMessage.roleError[0]}
              helperText={errorMessage.roleError[1]}
              >
              {allRoles.map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, gap: 2, marginRight: 6 }}>
          <Button variant='secondary1' onClick={() => navigate('/')}>Cancel</Button>
          <Button variant='primary' type="submit">Add</Button>
        </Box>
      </Box>
    </>
  )
}

export default CreateNewUser