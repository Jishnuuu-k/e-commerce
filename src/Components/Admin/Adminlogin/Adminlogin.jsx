import React, { useContext, useState } from 'react';
import Axios from "../../../../Axios/Axios"
import { AuthContext } from '../../../AppContext';
import './adminlogin.css';

function AdminLogin() {
  const {login} = useContext(AuthContext);

    const [formData, setformData] = useState({
        Username : "",
        Password : ""
    })

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formData)
            const response = await Axios.post("/admin/auth/adminlogin",formData)
            console.log(response.data)

            if(response.data.success){
                alert("Login Successfull !")
                const token = response.data
                login(token)

            }
        } catch (error) {
            console.log(error)
            alert("Error occured in login !")
        }
    }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div className="input-group">
          <label htmlFor="Username">Username</label>
          <input type="text" id="Username" name="Username" value={formData.Username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="Password">Password</label>
          <input type="Password" id="Password" name="Password" value={formData.Password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
