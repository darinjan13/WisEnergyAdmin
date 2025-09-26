import React, { useEffect, useState } from "react";
import { Filter, RotateCcw, Plus, Edit2, Trash2 } from "lucide-react";
import UserModal from "./UserModal";
import { fetchAllUsers } from "../../../services/apiService";

function Users() {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newRole, setNewRole] = useState("User"); // default for Add

  // User data and filtered users
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Filter states
  const [locationFilter, setLocationFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(""); // Start date filter
  const [endDateFilter, setEndDateFilter] = useState(""); // End date filter

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await fetchAllUsers();
      setUsers(result);
      setFilteredUsers(result); // Initialize filtered users with all users
    };
    fetchUsers();
  }, []);

  // Handle filtering logic
  useEffect(() => {
    let filtered = users;

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter((user) => user.location === locationFilter);
    }

    // Filter by role
    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Filter by start date and end date range
    if (startDateFilter && endDateFilter) {
      filtered = filtered.filter((user) => {
        const userCreatedDate = new Date(user.created_at?.split("T")[0]); // Convert user.created_at to Date object
        const startDate = new Date(startDateFilter); // Convert startDate to Date object
        const endDate = new Date(endDateFilter); // Convert endDate to Date object

        // Compare dates (user.created_at should be between startDate and endDate)
        return userCreatedDate >= startDate && userCreatedDate <= endDate;
      });
    }

    setFilteredUsers(filtered);
  }, [locationFilter, roleFilter, startDateFilter, endDateFilter, users]);

  const handleAdd = (role = "User") => {
    setEditUser(null); // no initial data
    setNewRole(role); // preset role
    setShowUserModal(true);
    setShowAddMenu(false);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setLocationFilter("");
    setRoleFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
  };

  return (
    <>
      {/* Modal */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={(formData) => {
          if (editUser) {
            // Update existing user
            setUsers((prev) =>
              prev.map((u) =>
                u.id === editUser.id ? { ...u, ...formData } : u
              )
            );
          } else {
            // Add new user/admin
            const newUser = {
              id: String(users.length + 1).padStart(5, "0"),
              ...formData,
              role: newRole, // comes from Add menu
              created_at: new Date().toISOString().split("T")[0], // Store only the date part
              modified: new Date().toISOString().split("T")[0], // Store only the date part
            };
            setUsers((prev) => [...prev, newUser]);
          }
          setShowUserModal(false);
        }}
        initialData={editUser}
        mode={editUser ? "edit" : "create"}
      />

      {/* Page Content */}
      <div className="p-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mt-0 mb-3">Users</h1>

        {/* Filter bar */}
        <div className="flex items-center justify-between rounded-lg py-3 mb-2">
          <div className="flex items-center gap-4 bg-white rounded-lg shadow px-4 py-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filter By
              </span>
            </div>

            {/* Location Filter - Entire Area Clickable */}
            <div
              onClick={() => document.getElementById("locationFilter").focus()} // Focus the select element
              className="px-2 cursor-pointer"
            >
              <select
                id="locationFilter"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none"
              >
                <option value="">Location</option>
                <option value="Mandaue City">Mandaue City</option>
                <option value="Lapu-Lapu City">Lapu-lapu City</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="px-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none"
              >
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Start Date Filter with Text */}
            <div className="px-2">
              <label
                htmlFor="startDate"
                className="font-semibold text-sm  text-gray-700 mr-2"
              >
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none"
              />
            </div>

            {/* End Date Filter with Text */}
            <div className="px-2">
              <label
                htmlFor="endDate"
                className="font-semibold text-sm text-gray-700 mr-2"
              >
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none"
              />
            </div>

            {/* Reset Filter */}
            <div className="px-2">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filter
              </button>
            </div>
          </div>

          {/* Right side: Plus button */}
          <div className="ml-auto">
            <button
              onClick={() => setShowAddMenu((prev) => !prev)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#43A866] text-white hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
            </button>

            {showAddMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => handleAdd("User")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Add a User
                </button>
                <button
                  onClick={() => handleAdd("Admin")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Add an Admin
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-200 text-left text-gray-700">
                <th className="p-3">ID</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Location</th>
                <th className="p-3">Role</th>
                <th className="p-3">Date Created</th>
                <th className="p-3">Date Modified</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((u) => (
                <tr
                  key={u.uid}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{u.uid}</td>
                  <td className="p-3">{u.first_name}</td>
                  <td className="p-3">{u.last_name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.location}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">{u.created_at?.split("T")[0]}</td>
                  <td className="p-3">{u.modified}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditUser(u);
                        setShowUserModal(true);
                      }}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
