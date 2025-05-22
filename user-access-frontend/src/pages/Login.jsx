import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.role, res.data.username);

      //  Role base direction
      if (res.data.role === "Admin") navigate("/create-software");
      else if (res.data.role === "Manager") navigate("/pending-requests");
      else navigate("/request-access");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="container vh-100 d-flex justify-content-center align-items-center">
  <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
    <h2 className="mb-4 text-center">Login</h2>

    <div className="mb-3">
      <input
        name="username"
        onChange={handleChange}
        placeholder="Username"
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        required
        className="form-control"
      />
    </div>

    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
  </form>
</div>

  );
};

export default Login;
