import React, { useEffect, useState } from "react";
import { Filter, RotateCcw, Plus, Edit2, Trash2 } from "lucide-react";
import UserModal from "./UserModal";
import { fetchAllUsers } from "../../../services/apiService";

function Users() {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newRole, setNewRole] = useState("User"); // default for Add

  // const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await fetchAllUsers();
      setUsers(result);
      console.log(result);
    };
    fetchUsers();
  }, []);

  const [users, setUsers] = useState();

  const handleAdd = (role = "User") => {
    setEditUser(null); // no initial data
    setNewRole(role); // preset role
    setShowUserModal(true);
    setShowAddMenu(false);
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
              created: new Date().toISOString().split("T")[0],
              modified: new Date().toISOString().split("T")[0],
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
        <h1 className="text-2xl font-bold mb-6">Users</h1>

        {/* Filter bar */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3 mb-6">
          {/* Left side: Filter options */}
          <div className="flex items-center divide-x divide-gray-200">
            <div className="flex items-center gap-2 px-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filter By
              </span>
            </div>

            <div className="px-4">
              <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
                <option>Location</option>
                <option>Mandaue City</option>
                <option>Lapu-lapu City</option>
              </select>
            </div>

            <div className="px-4">
              <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
                <option>Role</option>
                <option>Admin</option>
                <option>User</option>
              </select>
            </div>

            <div className="px-4">
              <input
                type="date"
                className="bg-transparent text-sm text-gray-700 focus:outline-none"
              />
            </div>

            <div className="px-4">
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium">
                <RotateCcw className="w-4 h-4" />
                Reset Filter
              </button>
            </div>
          </div>

          {/* Right side: Add User/Admin */}
          <div className="relative">
            <button
              onClick={() => setShowAddMenu((prev) => !prev)}
              className="ml-4 flex items-center justify-center w-9 h-9 rounded-full bg-[#43A866] text-white hover:bg-green-700"
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
              {users?.map((u) => (
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
                  <td className="p-3">{u.created}</td>
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

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <p>Showing 1-{users?.length} of 78</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              &lt;
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
