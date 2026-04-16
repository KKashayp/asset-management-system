import React, { useState } from "react";

function AllocationForm({ assets, users, onAllocate }) {
  const [formData, setFormData] = useState({
    assetId: "",
    userId: "",
    allocatedById: "",
    dueDate: "",
    remarks: ""
  });

  const availableAssets = assets.filter(
    (asset) => (asset.status || "").toUpperCase() === "AVAILABLE"
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      assetId: Number(formData.assetId),
      userId: Number(formData.userId),
      allocatedById: formData.allocatedById ? Number(formData.allocatedById) : null,
      dueDate: formData.dueDate ? `${formData.dueDate}T10:00:00` : null,
      remarks: formData.remarks
    };

    onAllocate(payload);

    setFormData({
      assetId: "",
      userId: "",
      allocatedById: "",
      dueDate: "",
      remarks: ""
    });
  };

  return (
    <div className="card">
      <div className="section-title">
        <h2>Allocate Asset</h2>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <select
          name="assetId"
          value={formData.assetId}
          onChange={handleChange}
          required
        >
          <option value="">Select Asset</option>
          {availableAssets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.assetCode} - {asset.name}
            </option>
          ))}
        </select>

        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        >
          <option value="">Assign To User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} - {user.role}
            </option>
          ))}
        </select>

        <select
          name="allocatedById"
          value={formData.allocatedById}
          onChange={handleChange}
        >
          <option value="">Allocated By</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <input
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
        />

        <button type="submit">Allocate Asset</button>
      </form>
    </div>
  );
}

export default AllocationForm;