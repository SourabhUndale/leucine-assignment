import React, { useState } from 'react';

import API from '../api/axios';

const RequestAccess = () => {
  const [form, setForm] = useState({
    softwareId: '',
    accessType: 'Read',
    reason: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await API.post(
        '/request-access',
        {
          softwareId: parseInt(form.softwareId),
          accessType: form.accessType,
          reason: form.reason
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert(response.data.message);
      setForm({ softwareId: '', accessType: 'Read', reason: '' });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
  <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%' }}>
    <h2 className="mb-4 text-center">Request Software Access</h2>

    <div className="mb-3">
      <label className="form-label">Software ID:</label>
      <input
        type="number"
        name="softwareId"
        value={form.softwareId}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Access Type:</label>
      <select
        name="accessType"
        value={form.accessType}
        onChange={handleChange}
        className="form-select"
      >
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Write">Admin</option>
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label">Reason:</label>
      <textarea
        name="reason"
        value={form.reason}
        onChange={handleChange}
        required
        className="form-control"
        rows={3}
      />
    </div>

    <button type="submit" className="btn btn-primary w-100">Submit Request</button>
  </form>
</div>

  );
};

export default RequestAccess;
