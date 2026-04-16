import React, { useState } from "react";

function AssetForm({ onAddAsset }) {
  const [formData, setFormData] = useState({
    assetCode: "",
    name: "",
    type: "",
    category: "",
    brand: "",
    serialNumber: "",
    vendor: "",
    location: "",
    assetCondition: "",
    purchaseDate: "",
    warrantyExpiryDate: "",
    status: "AVAILABLE"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAsset(formData);
    setFormData({
      assetCode: "",
      name: "",
      type: "",
      category: "",
      brand: "",
      serialNumber: "",
      vendor: "",
      location: "",
      assetCondition: "",
      purchaseDate: "",
      warrantyExpiryDate: "",
      status: "AVAILABLE"
    });
  };

  return (
    <div className="card">
      <div className="section-title">
        <h2>Add Asset</h2>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <input name="assetCode" placeholder="Asset Code" value={formData.assetCode} onChange={handleChange} required />
        <input name="name" placeholder="Asset Name" value={formData.name} onChange={handleChange} required />
        <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
        <input name="serialNumber" placeholder="Serial Number" value={formData.serialNumber} onChange={handleChange} />
        <input name="vendor" placeholder="Vendor" value={formData.vendor} onChange={handleChange} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input name="assetCondition" placeholder="Condition" value={formData.assetCondition} onChange={handleChange} />
        <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
        <input type="date" name="warrantyExpiryDate" value={formData.warrantyExpiryDate} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="ALLOCATED">ALLOCATED</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
          <option value="RETIRED">RETIRED</option>
        </select>
        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
}

export default AssetForm;