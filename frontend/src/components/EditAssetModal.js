import React, { useEffect, useState } from "react";

function EditAssetModal({ asset, isOpen, onClose, onSave }) {
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

  useEffect(() => {
    if (asset) {
      setFormData({
        assetCode: asset.assetCode || "",
        name: asset.name || "",
        type: asset.type || "",
        category: asset.category || "",
        brand: asset.brand || "",
        serialNumber: asset.serialNumber || "",
        vendor: asset.vendor || "",
        location: asset.location || "",
        assetCondition: asset.assetCondition || "",
        purchaseDate: asset.purchaseDate || "",
        warrantyExpiryDate: asset.warrantyExpiryDate || "",
        status: asset.status || "AVAILABLE"
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(asset.id, formData);
  };

  if (!isOpen || !asset) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Edit Asset</h2>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ×
          </button>
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

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAssetModal;