import React from "react";

function QuickFilters({ filters, activeFilter, onChangeFilter }) {
  return (
    <div className="quick-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
          onClick={() => onChangeFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default QuickFilters;