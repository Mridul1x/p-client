import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import ExportToExcelUserList from "../../component/ExportToExcelUserList";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const UserList = ({ users }) => {
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const token = useSelector((state) => state.user?.token);
  const [userList, setUserList] = useState(users); // Use state for the user list

  const handleToggleRole = async (userId, currentRole) => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/users/${userId}/role`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the role in the local state
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: response.data.role } : user
        )
      );

      // Show success toast
      toast.success(`User role updated to ${response.data.role}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const adminData = useMemo(
    () =>
      userList
        .filter((user) => user.role === "admin")
        .map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        })),
    [userList]
  );

  const userData = useMemo(
    () =>
      userList
        .filter((user) => user.role !== "admin")
        .map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        })),
    [userList]
  );

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Created At", accessor: "createdAt" },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleToggleRole(row.original.id, row.original.role)}
          >
            {row.original.role === "admin" ? "Make User" : "Make Admin"}
          </button>
        ),
      },
    ],
    [userList] // Pass userList as dependency
  );

  const adminTable = useTable({ columns, data: adminData });
  const userTable = useTable({ columns, data: userData });

  return (
    <div className="mt-10">
      <div className="mb-6">
        <div className="flex justify-between p-4">
          <h3 className="text-lg font-semibold">Admin List</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-96 md:overflow-x-visible">
          <table
            {...adminTable.getTableProps()}
            className="min-w-full bg-white divide-y divide-gray-200 table-auto"
          >
            <thead className="bg-gray-50">
              {adminTable.headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...adminTable.getTableBodyProps()}
              className="divide-y divide-gray-200 text-sm text-gray-700"
            >
              {adminTable.rows.map((row) => {
                adminTable.prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-50">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-base font-medium"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 overflow-hidden border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between p-4">
          <h3 className="text-lg font-semibold">All Users</h3>
          <ExportToExcelUserList data={userData} fileName="All Users List" />
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-96 md:overflow-x-visible">
          <table
            {...userTable.getTableProps()}
            className="min-w-full bg-white divide-y divide-gray-200 table-auto"
          >
            <thead className="bg-gray-50">
              {userTable.headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...userTable.getTableBodyProps()}
              className="divide-y divide-gray-200 text-sm text-gray-700"
            >
              {userTable.rows.map((row) => {
                userTable.prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-50">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-base font-medium"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
