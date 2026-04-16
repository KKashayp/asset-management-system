import React, { useMemo, useState } from "react";
import QuickFilters from "./QuickFilters";

function AssetTable({ assets, onRetire, onEdit, canRetire }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "AVAILABLE", "ALLOCATED", "MAINTENANCE", "RETIRED"];

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        (asset.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (asset.assetCode || "").toLowerCase().includes(search.toLowerCase()) ||
        (asset.brand || "").toLowerCase().includes(search.toLowerCase()) ||
        (asset.category || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        (asset.status || "").toUpperCase() === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [assets, search, activeFilter]);

  return (
    <div className="card">
      <div className="section-title">
        <h2>Assets</h2>
      </div>

      <div className="table-tools">
        <input
          className="table-search"
          type="text"
          placeholder="Search by asset name, code, brand, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <QuickFilters
          filters={filters}
          activeFilter={activeFilter}
          onChangeFilter={setActiveFilter}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Location</th>
              <th>Condition</th>
              {canRetire && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.assetCode}</td>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td>{asset.category}</td>
                  <td>{asset.brand}</td>
                  <td>
                    <span className={`badge ${(asset.status || "").toLowerCase()}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td>{asset.location}</td>
                  <td>{asset.assetCondition}</td>
                  {canRetire && (
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => onEdit(asset)}
                        >
                          Edit
                        </button>

                        {(asset.status || "").toUpperCase() !== "RETIRED" ? (
                          <button
                            type="button"
                            className="retire-btn"
                            onClick={() => onRetire(asset.id)}
                          >
                            Retire
                          </button>
                        ) : (
                          <span className="retired-label">Retired</span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canRetire ? "10" : "9"} className="empty-cell">
                  No matching assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssetTable;