import React, { useMemo, useState } from "react";
import QuickFilters from "./QuickFilters";

function AllocationTable({ allocations, onReturn, canReturn }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "ACTIVE", "RETURNED"];

  const filteredAllocations = useMemo(() => {
    return allocations.filter((allocation) => {
      const matchesSearch =
        (allocation.assetName || "").toLowerCase().includes(search.toLowerCase()) ||
        (allocation.assetCode || "").toLowerCase().includes(search.toLowerCase()) ||
        (allocation.userName || "").toLowerCase().includes(search.toLowerCase());

      const status = allocation.returned ? "RETURNED" : "ACTIVE";
      const matchesFilter = activeFilter === "All" || status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [allocations, search, activeFilter]);

  return (
    <div className="card">
      <div className="section-title">
        <h2>Allocations</h2>
      </div>

      <div className="table-tools">
        <input
          className="table-search"
          type="text"
          placeholder="Search by asset, code, user..."
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
              <th>Asset</th>
              <th>Code</th>
              <th>User</th>
              <th>Allocated By</th>
              <th>Allocated Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Remarks</th>
              <th>Status</th>
              {canReturn && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredAllocations.length > 0 ? (
              filteredAllocations.map((allocation) => (
                <tr key={allocation.id}>
                  <td>{allocation.id}</td>
                  <td>{allocation.assetName}</td>
                  <td>{allocation.assetCode}</td>
                  <td>{allocation.userName}</td>
                  <td>{allocation.allocatedByName || "N/A"}</td>
                  <td>{allocation.allocatedDate || "N/A"}</td>
                  <td>{allocation.dueDate || "N/A"}</td>
                  <td>{allocation.returnDate || "Not Returned"}</td>
                  <td>{allocation.remarks || "-"}</td>
                  <td>
                    {allocation.returned ? (
                      <span className="returned-text">Returned</span>
                    ) : (
                      <span className="badge allocated">ACTIVE</span>
                    )}
                  </td>
                  {canReturn && (
                    <td>
                      {!allocation.returned ? (
                        <button
                          className="return-btn"
                          onClick={() => onReturn(allocation.id)}
                        >
                          Return
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canReturn ? "11" : "10"} className="empty-cell">
                  No matching allocations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllocationTable;