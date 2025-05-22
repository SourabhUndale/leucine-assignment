import { useState } from "react";

import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form, {
  withCredentials: true
});
      alert("Signup successful. Please log in.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
     <div className="container vh-100 d-flex justify-content-center align-items-center">
  <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
    <h2 className="mb-4 text-center">Signup</h2>
    
    <div className="mb-3">
      <label className="form-label">Username:</label>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>
    
    <div className="mb-3">
      <label className="form-label">Password:</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>
    
    <div className="mb-3">
      <label className="form-label">Role:</label>
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="form-select"
      >
        <option value="Employee">Employee</option>
        <option value="Admin">Admin</option>
        <option value="Manager">Manager</option>
      </select>
    </div>
    
    <button type="submit" className="btn btn-primary w-100 mt-3">Signup</button>
  </form>
</div>


  );
};

export default Signup;
