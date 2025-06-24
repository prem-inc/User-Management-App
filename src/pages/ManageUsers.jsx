import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Box, Button, DataTable, Paper, TableCell, TableContainer, TableHead, TableRow, Typography, TableBody } from '@cw/rds'
import { Trash, Pencil } from '@cw/rds/icons';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const [color,setColor] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:8080/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error)
        setError(error.message);
      })
  }, [userData])

  const deleteUser = (name, key) => {
    const confirmed = window.confirm(`Are you sure you want to delete user: ${name}?`);

    if (!confirmed) return;

    axios.delete(`http://localhost:8080/delete/${key}`)
      .then((response) => {
        toast.success("User deleted successfully!", { position: "bottom-right", autoClose: 1800, hideProgressBar: true });
      })
      .catch((error) => {
        toast.error("Error occured while deletion.", { position: "bottom-right" })
        console.log(error.message);
      })
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ marginLeft: "5px" }} variant="subtitle1">Manage Users</Typography>
        <Button onClick={() => navigate("/newuser")}>+ Add User</Button>
      </Box>
      <TableContainer component={Paper}>
        <DataTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <span style={{ cursor: "pointer"}}>
                    <Pencil size='small' onClick={(e) => navigate("/edituser", {state: {user}})}/>
                  </span>
                  <span style={{ cursor: "pointer"}}>
                    <Trash size='small' onClick={(e) => deleteUser(user.name, user.key)}/>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
      </TableContainer>
    </>
  )
}

export default ManageUsers