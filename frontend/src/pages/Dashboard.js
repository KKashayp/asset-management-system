import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import RolePanel from "../components/RolePanel";
import AssetForm from "../components/AssetForm";
import UserForm from "../components/UserForm";
import AllocationForm from "../components/AllocationForm";
import AssetTable from "../components/AssetTable";
import UserTable from "../components/UserTable";
import AllocationTable from "../components/AllocationTable";
import OverviewCharts from "../components/OverviewCharts";
import RecentActivityPanel from "../components/RecentActivityPanel";
import EditAssetModal from "../components/EditAssetModal";
import {
  getAssets,
  getUsers,
  getAllocations,
  getMyAllocations,
  addAsset,
  addUser,
  allocateAsset,
  retireAsset,
  returnAsset,
  updateAsset,
  resetSystem
} from "../services/api";

function Dashboard({ onLogout }) {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const role = localStorage.getItem("role") || "";
  const email = localStorage.getItem("email") || "";

  const isAdmin = role === "ADMIN";
  const isManager = role === "MANAGER";
  const isEmployee = role === "EMPLOYEE";

  const [activeTab, setActiveTab] = useState(isEmployee ? "My Assets" : "Overview");

  const loadAllData = async () => {
    try {
      setLoading(true);

      if (isEmployee) {
        const myAllocationsRes = await getMyAllocations();
        setAllocations(myAllocationsRes.data || []);
        setAssets([]);
        setUsers([]);
        return;
      }

      const requests = [getAssets(), getAllocations(), getUsers()];
      const responses = await Promise.all(requests);

      setAssets(responses[0].data || []);
      setAllocations(responses[1].data || []);
      setUsers(responses[2].data || []);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleAddAsset = async (assetData) => {
    try {
      await addAsset(assetData);
      loadAllData();
    } catch (error) {
      alert(error?.response?.data?.message || error?.response?.data || "Failed to add asset");
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await addUser(userData);
      loadAllData();
    } catch (error) {
      alert(error?.response?.data?.message || error?.response?.data || "Failed to add user");
    }
  };

  const handleAllocateAsset = async (allocationData) => {
    try {
      await allocateAsset(allocationData);
      loadAllData();
    } catch (error) {
      alert(error?.response?.data?.message || error?.response?.data || "Failed to allocate asset");
    }
  };

  const handleRetireAsset = async (id) => {
    try {
      await retireAsset(id);
      loadAllData();
    } catch (error) {
      alert(error?.response?.data?.message || error?.response?.data || "Failed to retire asset");
    }
  };

  const handleReturnAsset = async (id) => {
    try {
      await returnAsset(id);
      loadAllData();
    } catch (error) {
      alert(error?.response?.data?.message || error?.response?.data || "Failed to return asset");
    }
  };

  const handleOpenEdit = (asset) => {
    setSelectedAsset(asset);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setSelectedAsset(null);
    setIsEditOpen(false);
  };

  const handleUpdateAsset = async (id, data) => {
    try {
      await updateAsset(id, data);
      handleCloseEdit();
      loadAllData();
    } catch (error) {
      alert(error?.response?.data?.message || error?.response?.data || "Failed to update asset");
    }
  };

  const handleResetSystem = async () => {
    const confirmText = window.prompt(
      "This will delete all users except admin, all assets, and all allocations.\n\nType RESET to continue."
    );

    if (confirmText !== "RESET") {
      return;
    }

    try {
      await resetSystem();
      alert("System reset successful.");
      loadAllData();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to reset system"
      );
    }
  };

  const availableAssets = assets.filter(
    (asset) => (asset.status || "").toUpperCase() === "AVAILABLE"
  ).length;

  const allocatedAssets = assets.filter(
    (asset) => (asset.status || "").toUpperCase() === "ALLOCATED"
  ).length;

  const maintenanceAssets = assets.filter(
    (asset) => (asset.status || "").toUpperCase() === "MAINTENANCE"
  ).length;

  return (
    <div className="dashboard-layout">
      <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="dashboard-main">
        <Navbar onLogout={onLogout} role={role} email={email} activeTab={activeTab} />

        {!isEmployee && activeTab === "Overview" && (
          <>
            <div className="dashboard-intro-box">
              <h2>Welcome to the Asset Management Control Center</h2>
              <p>
                This platform provides centralized visibility over asset inventory,
                allocation records, and user access. Use the dashboard sections to
                manage day-to-day operations efficiently and securely.
              </p>
            </div>

            {isAdmin && (
              <div className="admin-action-bar">
                <button className="danger-btn" onClick={handleResetSystem}>
                  Reset System
                </button>
              </div>
            )}

            <div className="stats-grid">
              <StatCard title="Total Assets" value={assets.length} />
              <StatCard title="Available Assets" value={availableAssets} />
              <StatCard title="Allocated Assets" value={allocatedAssets} />
              <StatCard title="Maintenance Assets" value={maintenanceAssets} />
            </div>

            <RolePanel role={role} />

            <div className="overview-panels">
              <OverviewCharts assets={assets} allocations={allocations} />
              <RecentActivityPanel
                assets={assets}
                allocations={allocations}
                users={users}
              />
            </div>
          </>
        )}

        {!isEmployee && activeTab === "Assets" && (
          <>
            <div className="dashboard-intro-box">
              <h2>Asset Inventory Management</h2>
              <p>
                Register new organizational assets, review their status, and keep
                inventory records updated for smooth operational planning.
              </p>
            </div>

            <div className="forms-grid">
              <AssetForm onAddAsset={handleAddAsset} />
            </div>

            {loading ? (
              <div className="loading-box">Loading assets...</div>
            ) : (
              <div className="tables-grid">
                <AssetTable
                  assets={assets}
                  onRetire={handleRetireAsset}
                  onEdit={handleOpenEdit}
                  canRetire={isAdmin || isManager}
                />
              </div>
            )}
          </>
        )}

        {!isEmployee && activeTab === "Allocations" && (
          <>
            <div className="dashboard-intro-box">
              <h2>Allocation Management</h2>
              <p>
                Assign assets to users, monitor allocation history, and manage
                asset returns through a role-based workflow.
              </p>
            </div>

            <div className="forms-grid">
              <AllocationForm
                users={users}
                assets={assets}
                onAllocate={handleAllocateAsset}
              />
            </div>

            {loading ? (
              <div className="loading-box">Loading allocations...</div>
            ) : (
              <div className="tables-grid">
                <AllocationTable
                  allocations={allocations}
                  onReturn={handleReturnAsset}
                  canReturn={isAdmin || isManager}
                />
              </div>
            )}
          </>
        )}

        {!isEmployee && activeTab === "Users" && (
          <>
            <div className="dashboard-intro-box">
              <h2>User Access Management</h2>
              <p>
                Create user accounts, define access levels, and maintain secure
                role-based permissions for the organization.
              </p>
            </div>

            <RolePanel role={role} />

            {isAdmin && (
              <div className="forms-grid">
                <UserForm onAddUser={handleAddUser} />
              </div>
            )}

            {loading ? (
              <div className="loading-box">Loading users...</div>
            ) : (
              <div className="tables-grid">
                <UserTable users={users} />
              </div>
            )}
          </>
        )}

        {isEmployee && activeTab === "My Assets" && (
          <>
            <div className="dashboard-intro-box">
              <h2>My Asset Records</h2>
              <p>
                Review your assigned assets, allocation dates, and current asset
                usage details in one place.
              </p>
            </div>

            <RolePanel role={role} />

            <div className="info-box">
              You can view only your assigned assets and allocation history.
            </div>

            {loading ? (
              <div className="loading-box">Loading your assets...</div>
            ) : (
              <div className="tables-grid">
                <AllocationTable
                  allocations={allocations}
                  onReturn={() => {}}
                  canReturn={false}
                />
              </div>
            )}
          </>
        )}
      </div>

      <EditAssetModal
        asset={selectedAsset}
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        onSave={handleUpdateAsset}
      />
    </div>
  );
}

export default Dashboard;