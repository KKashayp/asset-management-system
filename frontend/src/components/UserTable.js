import React, { useMemo, useState } from "react";
import QuickFilters from "./QuickFilters";

function UserTable({ users }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "ADMIN", "MANAGER", "EMPLOYEE"];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        (user.role || "").toUpperCase() === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, activeFilter]);

  return (
    <div className="card">
      <div className="section-title">
        <h2>Users</h2>
      </div>

      <div className="table-tools">
        <input
          className="table-search"
          type="text"
          placeholder="Search by name or email..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-cell">
                  No matching users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;