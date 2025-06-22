import { BrowserRouter, Routes, Route } from "react-router-dom"
import SideNavbar from "./components/SideNavbar/SideNavbar"
import TopNavbar from "./components/TopNavbar/TopNavbar"
import ManageUsers from "./pages/ManageUsers"
import ManageRoles from "./pages/ManageRoles"
import {Box} from '@cw/rds'
import CreateNewUser from "./components/CreateNewUser/CreateNewUser"

function App() {

  return (
    <>
      <BrowserRouter>
        <TopNavbar/>
        <Box sx={{display: "flex"}}>
          <SideNavbar/>
        <Box component="main" sx={{flexGrow: 1, p:3}}>
          <Routes>
            <Route path="/" element={<ManageUsers/>}/>
            <Route path="/roles" element={<ManageRoles/>}/>
            <Route path="/newuser" element={<CreateNewUser/>}/>  
          </Routes>
        </Box>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default App
