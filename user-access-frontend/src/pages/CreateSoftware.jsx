import { useState } from "react";
import API from "../api/axios";

const CreateSoftware = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });

  const [accessLevelInput, setAccessLevelInput] = useState("");

  const handleChange = (e) => {
    // console.log()
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAccessLevel = () => {
    if (accessLevelInput && !form.accessLevels.includes(accessLevelInput)) {
      setForm({ ...form, accessLevels: [...form.accessLevels, accessLevelInput] });
      setAccessLevelInput("");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token"); 

  try {
    await API.post("/create-software", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("")
    alert("Software created successfully");
    setForm({ name: "", description: "", accessLevels: [] });
  } catch (err) {
    alert("Failed to create software");
    console.error(err);
  }
};

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
  <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%' }}>
    <h2 className="mb-4 text-center">Create Software</h2>

    <div className="mb-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="form-control"
        rows={4}
      />
    </div>

    <div className="input-group mb-3">
      <input
        value={accessLevelInput}
        onChange={(e) => setAccessLevelInput(e.target.value)}
        placeholder="Add access level (e.g. Read)"
        className="form-control"
      />
      <button
        type="button"
        onClick={handleAddAccessLevel}
        className="btn btn-outline-secondary"
      >
        Add Access Level
      </button>
    </div>

    <ul className="list-group mb-3">
      {form.accessLevels.map((lvl, index) => (
        <li key={index} className="list-group-item">
          {lvl}
        </li>
      ))}
    </ul>

    <button type="submit" className="btn btn-primary w-100">
      Create Software
    </button>
  </form>
</div>

  );
};

export default CreateSoftware;
