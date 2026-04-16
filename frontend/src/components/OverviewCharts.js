import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from "recharts";

function OverviewCharts({ assets, allocations }) {
  const statusCounts = {
    AVAILABLE: 0,
    ALLOCATED: 0,
    MAINTENANCE: 0,
    RETIRED: 0
  };

  assets.forEach((asset) => {
    const key = (asset.status || "").toUpperCase();
    if (statusCounts[key] !== undefined) {
      statusCounts[key] += 1;
    }
  });

  const barData = [
    { name: "Available", value: statusCounts.AVAILABLE },
    { name: "Allocated", value: statusCounts.ALLOCATED },
    { name: "Maintenance", value: statusCounts.MAINTENANCE },
    { name: "Retired", value: statusCounts.RETIRED }
  ];

  const pieData = [
    { name: "Active", value: allocations.filter((a) => !a.returned).length },
    { name: "Returned", value: allocations.filter((a) => a.returned).length }
  ];

  return (
    <div className="charts-grid">
      <div className="card chart-card">
        <div className="section-title">
          <h2>Asset Status Overview</h2>
        </div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="#adb5bd" />
              <YAxis stroke="#adb5bd" />
              <Tooltip />
              <Bar dataKey="value" fill="#00b4d8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card chart-card">
        <div className="section-title">
          <h2>Allocation Summary</h2>
        </div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                <Cell fill="#00b4d8" />
                <Cell fill="#9ef01a" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default OverviewCharts;