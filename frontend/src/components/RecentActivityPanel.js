import React from "react";

function RecentActivityPanel({ assets, allocations, users }) {
  const assetActivities = (assets || []).slice(0, 3).map((asset) => ({
    title: `Asset added: ${asset.name}`,
    subtitle: `${asset.assetCode} | ${asset.status}`,
    time: asset.createdAt || "Recently"
  }));

  const allocationActivities = (allocations || []).slice(0, 3).map((allocation) => ({
    title: `Allocation: ${allocation.assetName}`,
    subtitle: `${allocation.userName} | ${allocation.returned ? "Returned" : "Active"}`,
    time: allocation.allocatedDate || "Recently"
  }));

  const userActivities = (users || []).slice(0, 2).map((user) => ({
    title: `User onboarded: ${user.name}`,
    subtitle: `${user.email} | ${user.role}`,
    time: "Recently"
  }));

  const allActivities = [...assetActivities, ...allocationActivities, ...userActivities].slice(0, 6);

  return (
    <div className="card activity-card">
      <div className="section-title">
        <h2>Recent Activity</h2>
      </div>

      <div className="activity-list">
        {allActivities.length > 0 ? (
          allActivities.map((item, index) => (
            <div className="activity-item" key={index}>
              <div className="activity-indicator" />
              <div className="activity-content">
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
                <span>{item.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-activity">No recent activity found</div>
        )}
      </div>
    </div>
  );
}

export default RecentActivityPanel;